#!/usr/bin/env bash
set -xeuo pipefail

main() {
#  install -d -m 755 /opt/stable-diffusion-webui
#  cd /opt/stable-diffusion-webui
  cd /srv
  git clone --depth=1 https://github.com/vladmandic/automatic .
  # https://github.com/vladmandic/automatic/issues/291
  pip install rich wrapt gast opt_einsum
  python setup.py
#  pip install tensorrt
}

main "$@"
