NAME := mpen/python-torch

build:
	docker build . -t $(NAME):11.7 --build-arg CUDA_VERSION=11.7.1 --build-arg UBUNTU_VERSION=22.04
	docker build . -t $(NAME):12.1 --build-arg CUDA_VERSION=12.1.0 --build-arg UBUNTU_VERSION=22.04

run: build
	docker run --rm --gpus=all --entrypoint=nvidia-smi $(NAME):12.1
	docker run --rm --gpus=all $(NAME):12.1 -c 'import torch; print(".".join(map(str, torch.cuda.get_device_capability(0))))'
	docker run --rm -it --gpus=all $(NAME):12.1

push: build
	docker push $(NAME) --all-tags
