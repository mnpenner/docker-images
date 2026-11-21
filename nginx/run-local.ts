import {spawn} from "node:child_process"
import {createHash, X509Certificate} from "node:crypto"
import {mkdir, mkdtemp, rename, rm} from "node:fs/promises"
import {tmpdir} from "node:os"
import {join} from "node:path"

const port = 8080
const origin = `localhost:${port}`
const url = `https://${origin}/`
const image = "mpen/nginx:local"
const mkcertVersion = "v1.4.4"

function run(command: string[], env = process.env): void {
    const result = Bun.spawnSync(command, {env, stdin: "inherit", stdout: "inherit", stderr: "inherit"})
    if(result.exitCode !== 0) {
        throw new Error(`${command[0]} ${command[1]} exited with status ${result.exitCode}`)
    }
}

async function getMkcert(cacheDir: string): Promise<string> {
    const installed = Bun.which("mkcert")
    if(installed) return installed

    const release = process.arch === "arm64"
        ? {arch: "arm64", sha256: "793747256c562622d40127c8080df26add2fb44c50906ce9db63b42a5280582e"}
        : {arch: "amd64", sha256: "d2660b50a9ed59eada480750561c96abc2ed4c9a38c6a24d93e30e0977631398"}
    const filename = `mkcert-${mkcertVersion}-windows-${release.arch}.exe`
    const executable = join(cacheDir, filename)
    if(await Bun.file(executable).exists()) {
        const cached = await Bun.file(executable).arrayBuffer()
        if(Bun.SHA256.hash(cached, "hex") === release.sha256) return executable
    }

    const response = await fetch(`https://github.com/FiloSottile/mkcert/releases/download/${mkcertVersion}/${filename}`, {
        signal: AbortSignal.timeout(30_000),
    })
    if(!response.ok) throw new Error(`mkcert download returned HTTP ${response.status}`)
    const binary = await response.arrayBuffer()
    if(Bun.SHA256.hash(binary, "hex") !== release.sha256) throw new Error("mkcert checksum mismatch")

    const downloadDir = await mkdtemp(join(cacheDir, "download-"))
    try {
        const download = join(downloadDir, filename)
        await Bun.write(download, binary)
        await rename(download, executable)
    } finally {
        await rm(downloadDir, {recursive: true, force: true})
    }
    return executable
}

async function findBrowser(): Promise<string> {
    const applications = ["Vivaldi/Application/vivaldi.exe", "Google/Chrome/Application/chrome.exe", "Microsoft/Edge/Application/msedge.exe"]
    const roots = [process.env.LOCALAPPDATA, process.env.ProgramFiles, process.env["ProgramFiles(x86)"]]
    for(const application of applications) {
        for(const root of roots) {
            if(!root) continue
            const path = join(root, application)
            if(await Bun.file(path).exists()) return path
        }
    }
    throw new Error("Could not find Vivaldi, Chrome, or Edge for --browser")
}

async function openWhenReady(browser: string, cacheDir: string, container: Bun.Subprocess, ca: string, publicKeyHash: string): Promise<void> {
    const deadline = Date.now() + 10_000
    while(container.exitCode === null && Date.now() < deadline) {
        const response = await fetch(`https://127.0.0.1:${port}/`, {
            tls: {ca}, signal: AbortSignal.timeout(1000),
        }).catch(() => undefined)
        if(response?.ok) {
            await response.body?.cancel()
            const profile = await mkdtemp(join(cacheDir, "browser-"))
            const instance = spawn(browser, [
                `--user-data-dir=${profile}`,
                "--no-first-run",
                "--enable-quic",
                "--no-proxy-server",
                `--origin-to-force-quic-on=${origin}`,
                `--ignore-certificate-errors-spki-list=${publicKeyHash}`,
                "--host-resolver-rules=MAP localhost 127.0.0.1",
                url,
            ], {detached: true, stdio: "ignore"})
            instance.on("error", (error) => console.error(`Could not open the browser: ${error.message}`))
            instance.once("close", () => void rm(profile, {recursive: true, force: true}).catch(() => {}))
            instance.unref()
            return
        }
        await Bun.sleep(250)
    }
    if(container.exitCode === null) console.error(`NGINX did not become ready at ${url}`)
}

if(process.platform !== "win32" || !process.env.LOCALAPPDATA) {
    throw new Error("Run this launcher with Windows Bun to use the Windows certificate store")
}

const args = Bun.argv.slice(2)
if(args.length > 1 || (args.length === 1 && args[0] !== "--browser" && args[0] !== "--trust")) {
    throw new Error("Usage: bun run-local.ts [--browser | --trust]")
}

const cacheDir = join(process.env.LOCALAPPDATA, "mpen-nginx-local")
const browser = args.includes("--trust") ? undefined : await findBrowser()
await mkdir(cacheDir, {recursive: true})
run(["docker", "build", "--quiet", "--tag", image, import.meta.dir])

const mkcert = await getMkcert(cacheDir)
const sessionDir = await mkdtemp(join(tmpdir(), "mpen-nginx-tls-"))
const tlsDir = join(sessionDir, "tls")
const certFile = join(tlsDir, "fullchain.pem")
const tlsEnv = browser
    ? {...process.env, CAROOT: join(sessionDir, "ca"), TRUST_STORES: "none"}
    : {...process.env, TRUST_STORES: "system"}
try {
    await mkdir(tlsDir)
    if(!browser) run([mkcert, "-install"], tlsEnv)
    run([
        mkcert, "-cert-file", certFile, "-key-file", join(tlsDir, "privkey.pem"),
        "localhost", "127.0.0.1", "::1",
    ], tlsEnv)
    const containerName = `mpen-nginx-local-${crypto.randomUUID()}`
    const container = Bun.spawn([
        "docker", "run", "--rm", "--name", containerName,
        "--publish", `127.0.0.1:${port}:443/tcp`,
        "--publish", `127.0.0.1:${port}:443/udp`,
        "--mount", `type=bind,source=${tlsDir},target=/etc/nginx/tls,readonly`,
        image, "sh", "-ec",
        `sed -i 's/:443/:${port}/' /etc/nginx/http.d/default.conf && exec /usr/local/bin/start-nginx -g 'daemon off;'`,
    ], {stdin: "inherit", stdout: "inherit", stderr: "inherit"})

    const stop = () => {
        Bun.spawn(["docker", "stop", "--time", "2", containerName], {stdout: "ignore", stderr: "ignore"})
    }
    process.once("SIGINT", stop)
    process.once("SIGTERM", stop)
    try {
        console.log(`Starting NGINX at ${url}`)
        if(browser) {
            const ca = await Bun.file(join(sessionDir, "ca", "rootCA.pem")).text()
            const cert = new X509Certificate(await Bun.file(certFile).text())
            const spki = cert.publicKey.export({type: "spki", format: "der"})
            const publicKeyHash = createHash("sha256").update(spki).digest("base64")
            await openWhenReady(browser, cacheDir, container, ca, publicKeyHash)
        }
        process.exitCode = await container.exited
    } finally {
        process.off("SIGINT", stop)
        process.off("SIGTERM", stop)
    }
} finally {
    await rm(sessionDir, {recursive: true, force: true})
}
