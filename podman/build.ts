#!/usr/bin/env bun
import { rmSync } from 'node:fs'

const outdir = './dist'

rmSync(outdir, { recursive: true, force: true })

await Bun.build({
  entrypoints: ['./src/index.ts'],
  outdir: outdir,
  target: 'bun',
  format: 'esm',
  minify: false,
  sourcemap: 'none',
})
