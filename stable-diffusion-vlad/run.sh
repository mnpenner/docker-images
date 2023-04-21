#!/usr/bin/env bash
set -veuo pipefail

docker start -ia vlad || docker run -it --gpus=all --name vlad -p 7860:7860 \
  --mount "type=bind,src=D:/MediaDriveBackup/stable-diffusion-webui/models,dst=/srv/models" \
  --mount "type=bind,src=D:/controlnet-models,dst=/srv/extensions-builtin/sd-webui-controlnet/models" \
  --mount "type=bind,src=$(wslpath -w .)/outputs,dst=/srv/outputs" \
  --mount "type=bind,src=$(wslpath -w .)/config/config.json,dst=/srv/config.json" \
  --mount "type=bind,src=$(wslpath -w .)/config/ui-config.json,dst=/srv/ui-config.json" \
  --mount "type=bind,src=$(wslpath -w .)/config/styles.csv,dst=/srv/styles.csv" \
  mpen/stable-diffusion-vlad \
  --noupdate --skip-requirements --skip-extensions --skip-git --listen \
  --ckpt /srv/models/Stable-diffusion/deliberate_v2.safetensors --vae /srv/models/VAE/vae-ft-mse-840000-ema-pruned.ckpt
