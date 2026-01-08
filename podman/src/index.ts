import {execFile, spawn} from 'node:child_process'
import {promisify} from 'node:util'

const execFileAsync = promisify(execFile)

type PodmanMachine = {
    Name: string
    Default: boolean
    Created: string
    Running: boolean
    Starting: boolean
    LastUp: string
    Stream: string
    VMType: string
    CPUs: number
    Memory: string
    Swap: string
    DiskSize: string
    Port: number
    RemoteUsername: string
    IdentityPath: string
    UserModeNetworking: boolean
}

async function execPodman(args: string[]): Promise<string> {
    const {stdout} = await execFileAsync('podman', args)
    return stdout
}

async function execPodmanStreaming(args: string[]): Promise<number> {
    return new Promise((resolve, reject) => {
        const child = spawn('podman', args, {stdio: 'inherit'})
        child.on('error', reject)
        child.on('close', (code) => {
            resolve(code ?? 0)
        })
    })
}

type PodmanBuildOptions = {
    /** Build context directory. */
    context?: string
    /** Add a custom host-to-IP mapping (host:ip). */
    addHost?: string | string[]
    /** Attempt to build for all base image platforms. */
    allPlatforms?: boolean
    /** Set metadata for an image. */
    annotation?: string | string[]
    /** Set the ARCH of the image to the provided value instead of the architecture of the host. */
    arch?: string
    /** Path of the authentication file. */
    authfile?: string
    /** Argument=value to supply to the builder. */
    buildArg?: string | string[]
    /** Argfile.conf containing lines of argument=value to supply to the builder. */
    buildArgFile?: string
    /** Argument=value to supply additional build context to the builder. */
    buildContext?: string | string[]
    /** Remote repository list to utilise as potential cache source. */
    cacheFrom?: string | string[]
    /** Remote repository list to utilise as potential cache destination. */
    cacheTo?: string | string[]
    /** Only consider cache images under specified duration. */
    cacheTtl?: string
    /** Add the specified capability when running. */
    capAdd?: string | string[]
    /** Drop the specified capability when running. */
    capDrop?: string | string[]
    /** Use certificates at the specified path to access the registry. */
    certDir?: string
    /** Optional parent cgroup for the container. */
    cgroupParent?: string
    /** 'private', or 'host'. */
    cgroupns?: string
    /** Preserve the contents of VOLUMEs during RUN instructions. */
    compatVolumes?: boolean
    /** Set additional flag to pass to C preprocessor (cpp). */
    cppFlag?: string | string[]
    /** Limit the CPU CFS (Completely Fair Scheduler) period. */
    cpuPeriod?: number
    /** Limit the CPU CFS (Completely Fair Scheduler) quota. */
    cpuQuota?: number
    /** CPU shares (relative weight). */
    cpuShares?: number
    /** CPUs in which to allow execution (0-3, 0,1). */
    cpusetCpus?: string
    /** Memory nodes (MEMs) in which to allow execution (0-3, 0,1). Only effective on NUMA systems. */
    cpusetMems?: string
    /** Set an "org.opencontainers.image.created" annotation in the image. */
    createdAnnotation?: boolean
    /** Use username[:password] for accessing the registry. */
    creds?: string
    /** Key needed to decrypt the image. */
    decryptionKey?: string | string[]
    /** Additional devices to provide. */
    device?: string | string[]
    /** Do not compress layers by default. */
    disableCompression?: boolean
    /** Set custom DNS servers or disable it completely by setting it to 'none'. */
    dns?: string
    /** Set custom DNS options. */
    dnsOption?: string | string[]
    /** Set custom DNS search domains. */
    dnsSearch?: string | string[]
    /** Set environment variable for the image. */
    env?: string | string[]
    /** Pathname or URL of a Dockerfile. */
    file?: string
    /** Always remove intermediate containers after a build, even if the build is unsuccessful. */
    forceRm?: boolean
    /** Format of the built image's manifest and metadata. */
    format?: string
    /** Image name used to replace the value in the first FROM instruction in the Containerfile. */
    from?: string
    /** Add additional groups to the primary container process. */
    groupAdd?: string | string[]
    /** Set the OCI hooks directory path (may be set multiple times). */
    hooksDir?: string | string[]
    /** Pass through HTTP Proxy environment variables. */
    httpProxy?: boolean
    /** Add default identity label. */
    identityLabel?: boolean
    /** Path to an alternate .dockerignore file. */
    ignorefile?: string
    /** File to write the image ID to. */
    iidfile?: string
    /** Inherit the annotations from the base image or base stages. */
    inheritAnnotations?: boolean
    /** Inherit the labels from the base image or base stages. */
    inheritLabels?: boolean
    /** 'private', path of IPC namespace to join, or 'host'. */
    ipc?: string
    /** Type of process isolation to use. */
    isolation?: string
    /** How many stages to run in parallel. */
    jobs?: number
    /** Set metadata for an image. */
    label?: string | string[]
    /** Set metadata for an intermediate image. */
    layerLabel?: string | string[]
    /** Use intermediate layers during build. */
    layers?: boolean
    /** Log to file instead of stdout/stderr. */
    logfile?: string
    /** Add the image to the specified manifest list. */
    manifest?: string
    /** Memory limit (format: <number><unit>, where unit = b, k, m or g). */
    memory?: string
    /** Swap limit equal to memory plus swap: '-1' to enable unlimited swap. */
    memorySwap?: string
    /** 'private', 'none', 'ns:path' of network namespace to join, or 'host'. */
    network?: string
    /** Do not use existing cached images for the container build. */
    noCache?: boolean
    /** Do not create new /etc/hostname file for RUN instructions, use the one from the base image. */
    noHostname?: boolean
    /** Do not create new /etc/hosts file for RUN instructions, use the one from the base image. */
    noHosts?: boolean
    /** Omit build history information from built image. */
    omitHistory?: boolean
    /** Set the OS to the provided value instead of the current operating system of the host. */
    os?: string
    /** Set required OS feature for the target image in addition to values from the base image. */
    osFeature?: string
    /** Set required OS version for the target image instead of the value from the base image. */
    osVersion?: string
    /** Private, path of PID namespace to join, or 'host'. */
    pid?: string
    /** Set the OS/ARCH[/VARIANT] of the image to the provided value instead of the current OS/ARCH. */
    platform?: string
    /** Pull image policy ("always"|"missing"|"never"|"newer"). */
    pull?: string
    /** Refrain from announcing build instructions and image read/write progress. */
    quiet?: boolean
    /** Number of times to retry in case of failure when performing push/pull. */
    retry?: number
    /** Delay between retries in case of push/pull failures. */
    retryDelay?: string
    /** Set timestamps in layers to no later than the value for --source-date-epoch. */
    rewriteTimestamp?: boolean
    /** Remove intermediate containers after a successful build. */
    rm?: boolean
    /** Add global flags for the container runtime. */
    runtimeFlag?: string | string[]
    /** Scan working container using preset configuration. */
    sbom?: string
    /** Add scan results to image as path. */
    sbomImageOutput?: string
    /** Add scan results to image as path. */
    sbomImagePurlOutput?: string
    /** Merge scan results using strategy. */
    sbomMergeStrategy?: string
    /** Save scan results to file. */
    sbomOutput?: string
    /** Save scan results to file. */
    sbomPurlOutput?: string
    /** Scan working container using command in scanner image. */
    sbomScannerCommand?: string
    /** Scan working container using scanner command from image. */
    sbomScannerImage?: string
    /** Secret file to expose to the build. */
    secret?: string | string[]
    /** Security options. */
    securityOpt?: string | string[]
    /** Size of '/dev/shm'. The format is <number><unit>. */
    shmSize?: string
    /** Skips stages in multi-stage builds which do not affect the final target. */
    skipUnusedStages?: boolean
    /** Set new timestamps in image info to seconds after the epoch. */
    sourceDateEpoch?: number
    /** Squash all image layers into a single layer. */
    squash?: boolean
    /** Squash all layers into a single layer. */
    squashAll?: boolean
    /** SSH agent socket or keys to expose to the build. */
    ssh?: string | string[]
    /** Pass stdin into containers. */
    stdin?: boolean
    /** Tagged name to apply to the built image. */
    tag?: string | string[]
    /** Set the target build stage to build. */
    target?: string
    /** Set new timestamps in image info and layer to seconds after the epoch. */
    timestamp?: number
    /** Ulimit options. */
    ulimit?: string | string[]
    /** Unset annotation when inheriting annotations from base image. */
    unsetannotation?: string | string[]
    /** Unset environment variable from final image. */
    unsetenv?: string | string[]
    /** Unset label when inheriting labels from base image. */
    unsetlabel?: string | string[]
    /** 'container', path of user namespace to join, or 'host'. */
    userns?: string
    /** ContainerGID:hostGID:length GID mapping to use in user namespace. */
    usernsGidMap?: string
    /** Name of entries from /etc/subgid to use to set user namespace GID mapping. */
    usernsGidMapGroup?: string
    /** ContainerUID:hostUID:length UID mapping to use in user namespace. */
    usernsUidMap?: string
    /** Name of entries from /etc/subuid to use to set user namespace UID mapping. */
    usernsUidMapUser?: string
    /** Private, :path of UTS namespace to join, or 'host'. */
    uts?: string
    /** Override the variant of the specified image. */
    variant?: string
    /** Bind mount a volume into the container. */
    volume?: string | string[]
}

type PodmanPushOptions = {
    /** Source image to push. */
    image: string
    /** Destination to push the image to. */
    destination?: string
    /** Path of the authentication file. */
    authfile?: string
    /** Compression format to use. */
    compressionFormat?: string
    /** Compression level to use. */
    compressionLevel?: number
    /** Credentials (USERNAME:PASSWORD) to use for authenticating to a registry. */
    creds?: string
    /** Write the digest of the pushed image to the specified file. */
    digestfile?: string
    /** This is a Docker specific option and is a NOOP. */
    disableContentTrust?: boolean
    /** Use the specified compression algorithm even if the destination contains a differently-compressed variant already. */
    forceCompression?: boolean
    /** Manifest type (oci, v2s2, or v2s1) to use in the destination. */
    format?: string
    /** Discard any pre-existing signatures in the image. */
    removeSignatures?: boolean
    /** Number of times to retry in case of failure when performing push. */
    retry?: number
    /** Delay between retries in case of push failures. */
    retryDelay?: string
    /** Require HTTPS and verify certificates when contacting registries. */
    tlsVerify?: boolean
}

/**
 * Ensures the Podman machine is running.
 *
 * @param machineName Name of the Podman machine to start.
 * @returns True when a machine start was triggered, false if it's already running.
 */
export async function startMachine(machineName = 'podman-machine-default'): Promise<boolean> {
    const out = await execPodman(['machine', 'list', '--format', 'json'])
    const machines = JSON.parse(out || '[]') as PodmanMachine[]
    const m = machines.find((x) => x.Name === machineName)
    if(!m) {
        throw new Error(`Podman machine "${machineName}" not found in list:\n${machines.map((x) => `- ${x.Name}`).join('\n')}`)
    }
    if(m.Running) {
        return false
    }
    await execPodman(['machine', 'start', machineName])
    return true
}

/**
 * Builds a container image using podman build.
 *
 * @param options Build options for podman build.
 * @returns The podman build exit code.
 */
export async function build(options: PodmanBuildOptions = {}): Promise<number> {
    const args: string[] = ['build']

    const addValue = (flag: string, value?: string | number) => {
        if(value === undefined) return
        args.push(flag, String(value))
    }
    const addBool = (flag: string, value?: boolean) => {
        if(value === undefined) return
        if(value) {
            args.push(flag)
            return
        }
        args.push(`${flag}=false`)
    }
    const addValues = (flag: string, values?: string | string[]) => {
        if(!values) return
        const list = Array.isArray(values) ? values : [values]
        if(!list.length) return
        for(const value of list) {
            args.push(flag, value)
        }
    }

    addValues('--add-host', options.addHost)
    addBool('--all-platforms', options.allPlatforms)
    addValues('--annotation', options.annotation)
    addValue('--arch', options.arch)
    addValue('--authfile', options.authfile)
    addValues('--build-arg', options.buildArg)
    addValue('--build-arg-file', options.buildArgFile)
    addValues('--build-context', options.buildContext)
    addValues('--cache-from', options.cacheFrom)
    addValues('--cache-to', options.cacheTo)
    addValue('--cache-ttl', options.cacheTtl)
    addValues('--cap-add', options.capAdd)
    addValues('--cap-drop', options.capDrop)
    addValue('--cert-dir', options.certDir)
    addValue('--cgroup-parent', options.cgroupParent)
    addValue('--cgroupns', options.cgroupns)
    addBool('--compat-volumes', options.compatVolumes)
    addValues('--cpp-flag', options.cppFlag)
    addValue('--cpu-period', options.cpuPeriod)
    addValue('--cpu-quota', options.cpuQuota)
    addValue('--cpu-shares', options.cpuShares)
    addValue('--cpuset-cpus', options.cpusetCpus)
    addValue('--cpuset-mems', options.cpusetMems)
    addBool('--created-annotation', options.createdAnnotation)
    addValue('--creds', options.creds)
    addValues('--decryption-key', options.decryptionKey)
    addValues('--device', options.device)
    addBool('--disable-compression', options.disableCompression)
    addValue('--dns', options.dns)
    addValues('--dns-option', options.dnsOption)
    addValues('--dns-search', options.dnsSearch)
    addValues('--env', options.env)
    addValue('--file', options.file)
    addBool('--force-rm', options.forceRm)
    addValue('--format', options.format)
    addValue('--from', options.from)
    addValues('--group-add', options.groupAdd)
    addValues('--hooks-dir', options.hooksDir)
    addBool('--http-proxy', options.httpProxy)
    addBool('--identity-label', options.identityLabel)
    addValue('--ignorefile', options.ignorefile)
    addValue('--iidfile', options.iidfile)
    addBool('--inherit-annotations', options.inheritAnnotations)
    addBool('--inherit-labels', options.inheritLabels)
    addValue('--ipc', options.ipc)
    addValue('--isolation', options.isolation)
    addValue('--jobs', options.jobs)
    addValues('--label', options.label)
    addValues('--layer-label', options.layerLabel)
    addBool('--layers', options.layers)
    addValue('--logfile', options.logfile)
    addValue('--manifest', options.manifest)
    addValue('--memory', options.memory)
    addValue('--memory-swap', options.memorySwap)
    addValue('--network', options.network)
    addBool('--no-cache', options.noCache)
    addBool('--no-hostname', options.noHostname)
    addBool('--no-hosts', options.noHosts)
    addBool('--omit-history', options.omitHistory)
    addValue('--os', options.os)
    addValue('--os-feature', options.osFeature)
    addValue('--os-version', options.osVersion)
    addValue('--pid', options.pid)
    addValue('--platform', options.platform)
    addValue('--pull', options.pull)
    addBool('--quiet', options.quiet)
    addValue('--retry', options.retry)
    addValue('--retry-delay', options.retryDelay)
    addBool('--rewrite-timestamp', options.rewriteTimestamp)
    addBool('--rm', options.rm)
    addValues('--runtime-flag', options.runtimeFlag)
    addValue('--sbom', options.sbom)
    addValue('--sbom-image-output', options.sbomImageOutput)
    addValue('--sbom-image-purl-output', options.sbomImagePurlOutput)
    addValue('--sbom-merge-strategy', options.sbomMergeStrategy)
    addValue('--sbom-output', options.sbomOutput)
    addValue('--sbom-purl-output', options.sbomPurlOutput)
    addValue('--sbom-scanner-command', options.sbomScannerCommand)
    addValue('--sbom-scanner-image', options.sbomScannerImage)
    addValues('--secret', options.secret)
    addValues('--security-opt', options.securityOpt)
    addValue('--shm-size', options.shmSize)
    addBool('--skip-unused-stages', options.skipUnusedStages)
    addValue('--source-date-epoch', options.sourceDateEpoch)
    addBool('--squash', options.squash)
    addBool('--squash-all', options.squashAll)
    addValues('--ssh', options.ssh)
    addBool('--stdin', options.stdin)
    addValues('--tag', options.tag)
    addValue('--target', options.target)
    addValue('--timestamp', options.timestamp)
    addValues('--ulimit', options.ulimit)
    addValues('--unsetannotation', options.unsetannotation)
    addValues('--unsetenv', options.unsetenv)
    addValues('--unsetlabel', options.unsetlabel)
    addValue('--userns', options.userns)
    addValue('--userns-gid-map', options.usernsGidMap)
    addValue('--userns-gid-map-group', options.usernsGidMapGroup)
    addValue('--userns-uid-map', options.usernsUidMap)
    addValue('--userns-uid-map-user', options.usernsUidMapUser)
    addValue('--uts', options.uts)
    addValue('--variant', options.variant)
    addValues('--volume', options.volume)

    args.push(options.context ?? '.')

    return execPodmanStreaming(args)
}

/**
 * Pushes a container image to a specified destination.
 *
 * @param options Push options for podman push.
 * @returns The podman push exit code.
 */
export async function push(options: PodmanPushOptions): Promise<number> {
    const args: string[] = ['push']

    const addValue = (flag: string, value?: string | number) => {
        if(value === undefined) return
        args.push(flag, String(value))
    }
    const addBool = (flag: string, value?: boolean) => {
        if(value === undefined) return
        if(value) {
            args.push(flag)
            return
        }
        args.push(`${flag}=false`)
    }

    addValue('--authfile', options.authfile)
    addValue('--compression-format', options.compressionFormat)
    addValue('--compression-level', options.compressionLevel)
    addValue('--creds', options.creds)
    addValue('--digestfile', options.digestfile)
    addBool('--disable-content-trust', options.disableContentTrust)
    addBool('--force-compression', options.forceCompression)
    addValue('--format', options.format)
    addBool('--remove-signatures', options.removeSignatures)
    addValue('--retry', options.retry)
    addValue('--retry-delay', options.retryDelay)
    addBool('--tls-verify', options.tlsVerify)

    args.push(options.image)
    if(options.destination) {
        args.push(options.destination)
    }

    return execPodmanStreaming(args)
}
