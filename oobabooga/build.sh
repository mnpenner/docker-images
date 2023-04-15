#!/usr/bin/env bash
set -xeuo pipefail

main() {
  CONTAINER=$(docker run -d --gpus=all --entrypoint sleep mpen/python-torch infinity)
  trap 'docker rm -f "$CONTAINER"' EXIT
  docker exec "$CONTAINER" bash -c $"
    set -xeuo pipefail
    CUDA_DEVICE_CAP=\$(python -c 'import torch; print(\".\".join(map(str, torch.cuda.get_device_capability(0))))')
    export TORCH_CUDA_ARCH_LIST=\"\$CUDA_DEVICE_CAP+PTX\"
    cd /srv
    git clone https://github.com/oobabooga/text-generation-webui .
    mkdir /srv/repositories
    cd /srv/repositories
    git clone https://github.com/oobabooga/GPTQ-for-LLaMa.git -b cuda
    cd /srv/repositories/GPTQ-for-LLaMa
    python setup_cuda.py install
  "
  # Start a new bash otherwise it would load the env created by setup_cuda and the install will fail.
  docker exec "$CONTAINER" bash -c $"
    set -xeuo pipefail
    cd /srv
    pip install -r requirements.txt
  "
  docker stop "$CONTAINER"

  # TODO: add --gpu-memory arg based on
  # torch.cuda.get_device_properties(0).total_memory/(1024**2)
  docker commit --change='WORKDIR /srv' --change='ENTRYPOINT ["python", "server.py"]' --change='CMD ["--auto-devices", "--chat", "--wbits=4", "--groupsize=128", "--listen", "--xformers"]' "$CONTAINER" oobabooga

  # docker run -it --gpus=all --rm -p 7860:7860 --mount "type=bind,src=D:/oobabooga/text-generation-webui/models,dst=/srv/models,readonly" oobabooga
}


main "$@"
