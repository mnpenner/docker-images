import {spawn, type ChildProcess} from 'node:child_process'
import type {TypedEventEmitter} from './typed-event-emitter.ts'
import { EventEmitter } from "node:events";
import {Readable,Writable} from 'node:stream'

interface ProcessSpawnOptions {
    stdin?: StreamIn
    stdout?: StreamOut
    stderr?: StreamOut
    env?: Record<string, string>
    uid?: number
    gid?: number
    cwd?: string
}

type OneOrMore<T> = [T, ...T[]];

type Events = {
    /**
     * Data from either stdout or stderr.
     */
    data: (chunk: Buffer, fd: 1|2) => void,
}

const DEV_NULL = new Writable({
    write(_c, _e, cb) { cb(); },
});


class Process extends (EventEmitter as new () => TypedEventEmitter<Events>) {
    private readonly _child: ChildProcess
    public readonly stdin: Writable
    public readonly stdout: Readable
    public readonly stderr: Readable

    private constructor(proc: ChildProcess) {
        super()
        this._child = proc
        this.stdout = proc.stdout ?? Readable.from([]);
        this.stderr = proc.stderr ?? Readable.from([]);
        this.stdin = proc.stdin ?? DEV_NULL
    }


    static spawn(cmd: OneOrMore<string>, options: ProcessSpawnOptions) {
        const [command, ...args] = cmd

        // TODO: convert options to node options
        return new Process(spawn(command, args, {/*TODO*/}))

    }

    /**
     * Send SIGKILL signal to the process.
     */
    kill(): this {
        // TODO
    }

    /**
     * Send SIGTERM signal to the process.
     *
     * If a timeout is provided, the process will be forcefully killed if it has not gracefully exited within the
     * timeout period.
     */
    term(timeout?: number): this {
        // TODO
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
        // TODO
    }

    /**
     * Wait for the process to terminate. If it returns a non-zero exit code, reject.
     *
     * If a timeout is provided, the process will be forcefully killed if it has not gracefully exited within the
     * timeout period.
     */
    waitOrThrow(timeout?: number): Promise<void> {
        // TODO
    }
}

export const enum StreamIn {
    /**
     * Provide empty input (child sees EOF immediately).
     * Writes to stdin will be silently discarded.
     */
    EMPTY,
    /**
     * Close the child's stdin immediately (fd closed).
     * Writes to stdin will be silently discarded.
     */
    CLOSE,
    /**
     * Child reads from the parent process's stdin.
     * Writes to stdin will be silently discarded.
     */
    INHERIT,
    /**
     * Expose a writable so the parent can write to the child's stdin.
     */
    PIPE,
}

export const enum StreamOut {
    /** Drain and discard all output. */
    DISCARD,
    /** Close the child's stdout/stderr immediately (child writes may fail). */
    CLOSE,
    /** Child writes to the parent process's stdout/stderr. */
    INHERIT,
    /** Expose a readable so the parent can consume the child's output. */
    PIPE,
    /** Forward to parent and also expose a readable copy. */
    TEE,
}
