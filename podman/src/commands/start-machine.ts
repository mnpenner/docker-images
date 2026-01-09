import {execPodman} from '../lib/spawn.ts'

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

/**
 * Ensures the Podman machine is running.
 *
 * @param machineName Name of the Podman machine to start.
 * @returns Resolves to true when a machine start was triggered, or false if it is already running.
 *
 * @example
 * ```ts
 * import {startMachine} from 'podman'
 *
 * const started = await startMachine()
 * if (started) {
 *     console.log('Podman machine booted.')
 * }
 * ```
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
