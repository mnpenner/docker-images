#!/usr/bin/env bash
set -xeuo pipefail

OUTPUT_IMAGE=mpen/stable-diffusion-vlad
BASE_IMAGE=mpen/python-torch:12.1
INSTALL_FILE=/tmp/install.sh

main() {
  CONTAINER=$(docker run -d --gpus=all -v "$(wslpath -w ./install.sh):$INSTALL_FILE" --entrypoint sleep $BASE_IMAGE 14400)
#  trap 'docker rm -f "$CONTAINER"' EXIT
  docker exec "$CONTAINER" $INSTALL_FILE
  docker stop "$CONTAINER"
  docker commit --change='WORKDIR /srv' --change='ENTRYPOINT ["accelerate", "launch", "--num_cpu_threads_per_process=6", "launch.py"]' --change='CMD ["--noupdate", "--skip-requirements", "--skip-extensions", "--skip-git", "--no-download-sd-model", "--listen"]' "$CONTAINER" $OUTPUT_IMAGE
}

main "$@"
