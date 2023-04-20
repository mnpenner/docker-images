#!/usr/bin/env bash
set -veuo pipefail

docker run -it --gpus=all --rm -p 7860:7860 --entrypoint python \
  --mount "type=bind,src=D:/MediaDriveBackup/stable-diffusion-webui/models,dst=/srv/models,readonly" \
  --mount "type=bind,src=$(wslpath -w .)/outputs,dst=/srv/outputs" \
  mpen/stable-diffusion-rt
