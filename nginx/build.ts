#!/usr/bin/env -S bun -i
import {parseArgs, type ParseArgsConfig} from "node:util"
import {DockmanConnection} from "dockman"

const PARSE_CONFIG = {
    args: process.argv,
    options: {},
    strict: true,
    allowPositionals: true,
} satisfies ParseArgsConfig

async function main(values: Values, positionals: Positionals): Promise<number | void> {
    const connection = await DockmanConnection.create({preference: ['docker']})

    const mainlineVersion = '1.31.9'
    const stableVersion = '1.30.7'
    const image = 'mpen/nginx'
    const testPort = 3001

    const builds = [
        {
            version: mainlineVersion,
            aliases: ['mainline', 'latest'],
        },
        {
            version: stableVersion,
            aliases: ['stable'],
        },
    ]

    const allTags: string[] = []
    for(const {version, aliases} of builds) {
        const versionTag = `${image}:${version}`
        const tags = [versionTag, ...aliases.map(alias => `${image}:${alias}`)]
        const imageId = await connection.build({
            context: __dirname,
            tags,
            buildArgs: {NGINX_VERSION: version},
            noCache: true,
            pull: true,
        })
        allTags.push(...tags)

        console.log(`\nBuilt image ${imageId.replace(/^sha256:/, '').slice(0,12)} w/ tags ${tags.map(t => `"${t}"`).join(", ")}`)

        console.log(`Running on port ${testPort} to verify image...`)
        const container = await connection.run(versionTag, {
            detach: true,
            remove: true,
            publish: [`${testPort}:80`],
        })

        try {
            await assertNginxHealthy(testPort)
            console.log('Nginx is healthy!')
        } finally {
            await connection.stop(container).catch(() => {})
        }

        console.log()
    }

    for(const tag of allTags) {
        await connection.push(tag)
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
