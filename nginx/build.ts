#!/usr/bin/env -S bun -i
import {parseArgs, type ParseArgsConfig} from "node:util"
import * as podman from '../podman'

const PARSE_CONFIG = {
    args: process.argv,
    options: {},
    strict: true,
    allowPositionals: true,
} satisfies ParseArgsConfig

async function main(values: Values, positionals: Positionals): Promise<number | void> {
    await podman.startMachine()

    const mainlineVersion = '1.29.4'
    const stableVersion = '1.28.1'
    const image = 'mpen/nginx'
    const testPort = 3001

    const builds = [
        {
            version: mainlineVersion,
            tags: [`${image}:mainline`, `${image}:latest`],
            imageId: '',
        },
        {
            version: stableVersion,
            tags: [`${image}:stable`],
            imageId: '',
        },
    ]

    const allTags = new Set<string>()
    for(const build of builds) {
        build.tags.unshift(`${image}:${build.version}`)
        for(const tag of build.tags) {
            allTags.add(tag)
        }
        build.imageId = await podman.build({
            tag: build.tags,
            buildArg: `NGINX_VERSION=${build.version}`,
            context: __dirname,
        })

        console.log(`\nBuilt image ${build.imageId.slice(0,12)} w/ tags ${build.tags.map(t => `"${t}"`).join(", ")}`)

        console.log(`Running on port ${testPort} to verify image...`)
        const handle = podman.run({
            rm: true,
            image: build.imageId,
            interactive: true,
            tty: true,
            publish: `${testPort}:80`,
        })

        try {
            await assertNginxHealthy(testPort)
            console.log('Nginx is healthy!')
        } finally {
            handle.term()
            await handle.wait()
        }

        console.log()
    }

    for(const tag of allTags.values()) {
        await podman.push({image: tag})
        console.log(`\nPushed image ${tag}\n`)
    }
}

async function assertNginxHealthy(port: number): Promise<void> {
    const url = `http://127.0.0.1:${port}/`
    const maxAttempts = 8
    const delayMs = 250

    let lastError: Error | null = null

    for(let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            const response = await fetch(url)
            const body = await response.text()
            if(response.status !== 200) {
                throw new Error(`Expected status 200, received ${response.status}`)
            }
            if(!body.includes('Welcome to NginX')) {
                throw new Error('Expected response to include "Welcome to NginX"')
            }
            return
        } catch (err) {
            lastError = err instanceof Error ? err : new Error(String(err))
            if(attempt < maxAttempts) {
                await new Promise((resolve) => setTimeout(resolve, delayMs))
            }
        }
    }

    throw lastError ?? new Error('Failed to verify nginx response')
}


type Parsed = ReturnType<typeof parseArgs<typeof PARSE_CONFIG>>
type Values = Parsed["values"]
type Positionals = Parsed["positionals"]

if(import.meta.main) {
    const {values, positionals} = parseArgs(PARSE_CONFIG)

    main(values, positionals).then(
        (exitCode) => {
            if(typeof exitCode === "number") {
                process.exitCode = exitCode
            }
        },
        (err) => {
            console.error(err ?? "An unknown error occurred")
            process.exitCode = 1
        },
    )
}
