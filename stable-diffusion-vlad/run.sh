#!/usr/bin/env bash
set -veuo pipefail

docker run -it --gpus=all --rm -p 7860:7860 \
  --mount "type=bind,src=D:/MediaDriveBackup/stable-diffusion-webui/models,dst=/srv/models" \
  --mount "type=bind,src=$(wslpath -w .)/outputs,dst=/srv/outputs" \
  mpen/stable-diffusion-vlad \
  --noupdate --skip-requirements --skip-extensions --skip-git --listen
