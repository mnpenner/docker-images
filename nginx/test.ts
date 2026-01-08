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
    // await $`podman run --rm -it -p 3001:80 mpen/nginx:mainline`

    const handle = podman.run({
        rm: true,
        image: 'mpen/nginx:stable',
        interactive: true,
        tty: true,
        publish: '3001:80',
    })


    const exitCode = await handle.waitThrow()

    console.log(`Exited with code ${exitCode}`)
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
