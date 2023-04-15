#!/usr/bin/env bash
set -xeuo pipefail

main() {
  CONTAINER=$(docker run -d --gpus=all --entrypoint sleep mpen/python-torch infinity)
  trap 'docker rm -f "$CONTAINER"' EXIT
  CUDA_ARCH=$(docker exec "$CONTAINER" python -c 'import torch; print(".".join(map(str, torch.cuda.get_device_capability(0))))')
  docker exec "$CONTAINER" bash -c $"
    cd /srv
    git clone https://github.com/oobabooga/text-generation-webui .
    mkdir /srv/repositories
    cd /srv/repositories
    git clone https://github.com/oobabooga/GPTQ-for-LLaMa.git -b cuda
    export TORCH_CUDA_ARCH_LIST==\"$CUDA_ARCH+PTX\"
    cd /srv/repositories/GPTQ-for-LLaMa
    python setup_cuda.py install
    cd /srv
    pip install -r requirements.txt
  "
  docker stop "$CONTAINER"
  docker commit "$CONTAINER" oobabooga
}


main "$@"
