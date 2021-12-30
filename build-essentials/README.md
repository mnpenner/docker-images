# build-essentials

Includes:

- `build-essential`
- `ca-certificates` (fixes "server certificate verification failed. CAfile: none")
- `curl` 
- `dirmngr`
- `git` 
- `gnupg` (fixes "gnupg, gnupg2 and gnupg1 do not seem to be installed, but one of them is required for this operation")
- `pip`
- `python3`
- `python3-dev`
- `python3-distutils`
- `software-properties-common` (adds `add-apt-repository`)
- `unzip`

## Compare

```sh
docker run --rm bitnami/minideb cat /root/.bashrc
```
