NAME := mpen/oobabooga

build:
	CONTAINER=$$(docker run --gpus=all -d mpen/python-torch) \
	&& docker exec "$$CONTAINER" python -c 'import torch; print(".".join(map(str, torch.cuda.get_device_capability(0))))' \
	&& docker rm "$$CONTAINER"

run: build
	docker run --rm -it $(NAME)

push: build
	docker push $(NAME) --all-tags
