#!/usr/bin/env bash
set -veuo pipefail

exec accelerate launch --num_cpu_threads_per_process=6 /srv/launch.py "$@"
