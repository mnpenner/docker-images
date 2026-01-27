import {describe, expect, test} from 'bun:test'
import {Process, StreamIn, StreamOut} from './process.ts'
import {Readable} from 'node:stream'

const decoder = new TextDecoder()

const SHELL = process.env.SHELL ?? '/bin/sh'

async function readStream(stream: Readable): Promise<string> {
    const chunks: Buffer[] = []
    return await new Promise((resolve, reject) => {
        stream.on('data', (chunk) => {
            chunks.push(Buffer.from(chunk as Buffer))
        })
        stream.on('error', reject)
        stream.on('end', () => {
            resolve(decoder.decode(Buffer.concat(chunks)))
        })
    })
}

describe('Process', () => {
    test('spawns and captures stdout/stderr with data events', async () => {
        const proc = Process.spawn([SHELL, '-c', 'echo out; echo err 1>&2'], {
            stdout: StreamOut.PIPE,
            stderr: StreamOut.PIPE,
            stdin: StreamIn.CLOSE,
        })

        let stdout = ''
        let stderr = ''
        proc.on('data', (chunk, fd) => {
            const text = decoder.decode(chunk)
            if(fd === 1) {
                stdout += text
            } else {
                stderr += text
            }
        })

        const code = await proc.wait()
        expect(code).toBe(0)
        expect(stdout).toBe('out\n')
        expect(stderr).toBe('err\n')
    })

    test('stdin pipe writes through to the child process', async () => {
        const proc = Process.spawn([SHELL, '-c', 'read -r line; printf "%s" "$line"'], {
            stdin: StreamIn.PIPE,
            stdout: StreamOut.PIPE,
            stderr: StreamOut.PIPE,
        })

        proc.stdin.write('hello')
        proc.stdin.end('\n')

        const output = await readStream(proc.stdout)
        const code = await proc.wait()

        expect(code).toBe(0)
        expect(output).toBe('hello')
    })

    test('env replaces process.env', async () => {
        const previous = process.env.PROC_TEST_PARENT
        process.env.PROC_TEST_PARENT = 'present'
        try {
            const proc = Process.spawn([
                SHELL,
                '-c',
                'printf "%s|%s" "$FOO" "$PROC_TEST_PARENT"',
            ], {
                stdin: StreamIn.CLOSE,
                stdout: StreamOut.PIPE,
                env: {FOO: 'bar'},
            })

            const output = await readStream(proc.stdout)
            const code = await proc.wait()

            expect(code).toBe(0)
            expect(output).toBe('bar|')
        } finally {
            if(previous === undefined) {
                delete process.env.PROC_TEST_PARENT
            } else {
                process.env.PROC_TEST_PARENT = previous
            }
        }
    })

    test('waitOrThrow resolves with void on success', async () => {
        const proc = Process.spawn([SHELL, '-c', 'exit 0'], {
            stdin: StreamIn.CLOSE,
        })

        const result = await proc.waitOrThrow()
        expect(result).toBeUndefined()
    })

    test('waitOrThrow rejects on non-zero exit codes', async () => {
        const proc = Process.spawn([SHELL, '-c', 'exit 3'], {
            stdin: StreamIn.CLOSE,
        })

        expect(proc.waitOrThrow()).rejects.toThrow('process exited with code 3')
    })

    test('wait timeout kills the process', async () => {
        const proc = Process.spawn([SHELL, '-c', 'sleep 5'], {
            stdin: StreamIn.CLOSE,
        })

        const code = await proc.wait(50)
        expect(code).not.toBe(0)
    })

    test('StreamOut.DISCARD produces no data', async () => {
        const proc = Process.spawn([SHELL, '-c', 'echo discard'], {
            stdin: StreamIn.CLOSE,
            stdout: StreamOut.DISCARD,
        })

        let sawData = false
        proc.on('data', () => {
            sawData = true
        })

        const code = await proc.wait()
        expect(code).toBe(0)
        expect(sawData).toBe(false)
    })
})
