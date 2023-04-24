#!/usr/bin/env bash
set -veuo pipefail

exec /entrypoint.sh --noupdate --skip-requirements --skip-extensions --skip-git --listen
