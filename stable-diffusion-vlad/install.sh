#!/usr/bin/env bash
set -xeuo pipefail

main() {
  cd /srv
  git clone https://github.com/vladmandic/automatic .
  python setup.py
  pip install tensorrt
}

main "$@"
