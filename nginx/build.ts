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
    const stableVersion = '1.28.0'
    const image = 'mpen/nginx'

    await podman.build({
        tag: [`${image}:${stableVersion}`, `${image}:mainline`, `${image}:latest`],
        buildArg: `NGINX_VERSION=${stableVersion}`,
        context: __dirname,
    })

    await podman.build({
        tag: [`${image}:${stableVersion}`, `${image}:stable`],
        buildArg: `NGINX_VERSION=${stableVersion}`,
        context: __dirname,
    })
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
