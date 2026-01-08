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

    const mainlineVersion = '1.28.0'
    const stableVersion = '1.28.0'
    const image = 'mpen/nginx'

    const builds = [
        {
            version: mainlineVersion,
            tags: [`${image}:mainline`, `${image}:latest`],
            alpineVersion: 'edge',
        },
        {
            version: stableVersion,
            tags: [`${image}:stable`],
            alpineVersion: 'latest',
        },
    ]

    const allTags: string[] = []
    for(const build of builds) {
        allTags.push(`${image}:${build.version}`, ...build.tags)
        await podman.build({
            tag: build.tags,
            buildArg: [
                `ALPINE_VERSION=${build.alpineVersion}`,
                `NGINX_VERSION=${build.version}`,
            ],
            context: __dirname,
        })
    }

    for(const tag of allTags) {
        await podman.push({image: tag})
    }
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
