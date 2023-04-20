NAME := mpen/stable-diffusion-rt

build:
	docker build . -t $(NAME) --progress=plain

run: build
	docker run --rm -it $(NAME)

push: build
	docker push $(NAME) --all-tags
