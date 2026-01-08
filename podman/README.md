# podman

Minimal helper to start a Podman machine from Bun or Node.

## Install

```sh
bun add podman
npm i podman
```

## Usage

```ts
import {startMachine} from 'podman'

await startMachine()  // podman-machine-default
await startMachine('your-machine-name')
```
