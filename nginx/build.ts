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
        const imageId = await podman.build({
            tag: build.tags,
            buildArg: `NGINX_VERSION=${build.version}`,
            context: __dirname,
        })
        build.imageId = imageId
    }

    for(const tag of allTags.values()) {
        await podman.push({image: tag})
    }

    console.log()
    for(const build of builds) {
        console.log(`Built & pushed image ${build.imageId.slice(0,12)} w/ tags ${build.tags.map(t => `"${t}"`).join(", ")}`)
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
