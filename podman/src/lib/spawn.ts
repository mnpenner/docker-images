import {promisify} from 'node:util'
import {execFile, spawn} from 'node:child_process'
import {createInterface} from 'node:readline'

const execFileAsync = promisify(execFile)

export async function execPodman(args: string[]): Promise<string> {
    const {stdout} = await execFileAsync('podman', args)
    return stdout
}

export async function execPodmanStreaming(args: string[]): Promise<void> {
    return new Promise((resolve, reject) => {
        const child = spawn('podman', args, {stdio: 'inherit'})
        child.on('error', reject)
        child.on('close', (code) => {
            if(code && code !== 0) {
                reject(new Error(`podman ${args[0]} exited with code ${code}`))
                return
            }
            resolve()
        })
    })
}

export async function execPodmanStreamingWithStdoutLines(
    args: string[],
    onLine: (line: string) => void,
): Promise<void> {
    return new Promise((resolve, reject) => {
        const child = spawn('podman', args, {stdio: ['ignore', 'pipe', 'pipe']})
        const stdout = child.stdout
        const stderr = child.stderr

        stdout.on('data', (chunk) => {
            process.stdout.write(chunk)
        })
        stderr.on('data', (chunk) => {
            process.stderr.write(chunk)
        })

        const rl = createInterface({input: stdout, crlfDelay: Infinity})
        rl.on('line', onLine)

        child.on('error', reject)
        child.on('close', (code) => {
            rl.close()
            if(code && code !== 0) {
                reject(new Error(`podman ${args[0]} exited with code ${code}`))
                return
            }
            resolve()
        })
    })
}

