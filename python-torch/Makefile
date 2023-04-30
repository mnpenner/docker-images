NAME := mpen/python-torch

build:
	docker build . -t $(NAME):11.7 --build-arg CUDA_VERSION=11.7.1 --build-arg UBUNTU_VERSION=22.04 --build-arg TORCH_PLATFORM=cu117 --progress=tty
	docker build . -t $(NAME):11.8 --build-arg CUDA_VERSION=11.8.0 --build-arg UBUNTU_VERSION=22.04 --build-arg TORCH_PLATFORM=cu118 --progress=tty

run: build
	docker run --rm --gpus=all $(NAME):11.8 nvidia-smi
	docker run --rm --gpus=all $(NAME):11.8 -c 'import torch; print(".".join(map(str, torch.cuda.get_device_capability(0))))'
	docker run --rm -it --gpus=all $(NAME):11.8

push: build
	docker push $(NAME) --all-tags
