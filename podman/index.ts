import {execFile} from 'node:child_process'
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
