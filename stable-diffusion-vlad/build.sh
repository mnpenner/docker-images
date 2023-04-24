#!/usr/bin/env bash
set -xeuo pipefail

BASE_IMAGE=mpen/python-torch:12.1
OUTPUT_IMAGE=mpen/stable-diffusion-vlad

main() {
  CONTAINER=$(docker run -d --gpus=all --entrypoint sleep $BASE_IMAGE 14400)
#  trap 'docker rm -f "$CONTAINER"' EXIT
  docker cp ./install.sh "$CONTAINER":/tmp/install.sh
  docker exec "$CONTAINER" /tmp/install.sh

  docker cp ./entrypoint.sh "$CONTAINER":/entrypoint.sh
  docker cp ./launch.sh "$CONTAINER":/launch.sh
  docker exec "$CONTAINER" chmod +x /entrypoint.sh

  docker stop "$CONTAINER"
  docker commit --change='WORKDIR /srv' --change='ENTRYPOINT ["/entrypoint.sh"]' --change='CMD ["--noupdate", "--skip-requirements", "--skip-extensions", "--skip-git", "--listen"]' "$CONTAINER" $OUTPUT_IMAGE
}

main "$@"
