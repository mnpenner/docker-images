import {spawn, type ChildProcess} from 'node:child_process'

interface SpawnOptions {
    stdin?: StreamIn
    stdout?: StreamOut
    stderr?: StreamOut
    env?: Record<string, string>
    uid?: number
    gid?: number
    cwd?: string
}

type OneOrMore<T> = [T, ...T[]];


class Process {
    private readonly _child: ChildProcess


    static spawn(cmd: OneOrMore<string>, options: SpawnOptions) {

    }

    /**
     * Send SIGKILL signal to the process.
     */
    kill(): this {
    }

    /**
     * Send SIGTERM signal to the process.
     *
     * If a timeout is provided, the process will be forcefully killed if it has not gracefully exited within the
     * timeout period.
     */
    term(timeout?: number): this {
    }

    /**
     * Wait for the process to terminate.
     *
     * If a timeout is provided, the process will be forcefully killed if it has not gracefully exited within the
     * timeout period.
     *
     * @returns Exit code of the process.
     */
    wait(timeout?: number): Promise<number> {
    }

    /**
     * Wait for the process to terminate. If it returns a non-zero exit code, reject.
     *
     * If a timeout is provided, the process will be forcefully killed if it has not gracefully exited within the
     * timeout period.
     */
    waitOrThrow(timeout?: number): Promise<void | Error> {
    }
}

export const enum StreamIn {
    /** Attach the input stream to /dev/null. The parent process cannot write to it. */
    DISCARD,
    /** Immediately close the input stream. */
    CLOSE,
    /** Attach the input stream to the parent process's stdin */
    INHERIT,
    /** Allow you to attach your own input stream */
    PIPE,

}


export const enum StreamOut {
    /** Discard output by sending it to /dev/null */
    DISCARD,
    /** Immediately close the stream. */
    CLOSE,
    /** Forward output to the parent process. */
    INHERIT,
    /** Capture output in a stream. */
    PIPE,
    /** Capture output and also forward it to the parent process. */
    TEE,

}
