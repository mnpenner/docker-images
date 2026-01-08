# podman

Minimal helper to start a Podman machine from Bun or Node.

## Install

```sh
bun add podman
npm i podman
```

## Usage

```ts
import {build, push, startMachine} from 'podman'

await startMachine()  // podman-machine-default
await startMachine('your-machine-name')

await build({
  context: '.',
  file: 'Containerfile',
  tag: 'example:latest',
})

await push({
  image: 'example:latest',
  destination: 'docker://registry.example.com/repository:tag',
  creds: 'username:password',
})
```
