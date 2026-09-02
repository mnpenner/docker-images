#!/usr/bin/env -S bun -i
import {parseArgs, type ParseArgsConfig} from "node:util"
import {$} from "bun"

const PARSE_CONFIG = {
    args: process.argv,
    options: {},
    strict: true,
    allowPositionals: true,
} satisfies ParseArgsConfig

async function main(values: Values, positionals: Positionals): Promise<number | void> {
    const dockerUp = await $`docker info`.nothrow().quiet()
    if(dockerUp.exitCode !== 0) {
        throw new Error('Docker is not running. Start Docker Desktop and try again.')
    }

    const mainlineVersion = '1.31.4'
    const stableVersion = '1.30.4'
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
        const tagFlags = build.tags.flatMap(tag => ['-t', tag])
        await $`docker build ${tagFlags} --build-arg NGINX_VERSION=${build.version} ${__dirname}`
        build.imageId = (await $`docker inspect --format {{.Id}} ${image}:${build.version}`.text()).trim().replace(/^sha256:/, '')

        console.log(`\nBuilt image ${build.imageId.slice(0,12)} w/ tags ${build.tags.map(t => `"${t}"`).join(", ")}`)

        console.log(`Running on port ${testPort} to verify image...`)
        const container = (await $`docker run --rm -d -p ${testPort}:80 ${image}:${build.version}`.text()).trim()

        try {
            await assertNginxHealthy(testPort)
            console.log('Nginx is healthy!')
        } finally {
            await $`docker stop ${container}`.nothrow().quiet()
        }

        console.log()
    }

    for(const tag of allTags.values()) {
        await $`docker push ${tag}`
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
