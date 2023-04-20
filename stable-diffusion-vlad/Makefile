NAME := mpen/stable-diffusion-valid

build:
	./build.sh

run: build
	./run.sh

push: build
	docker push $(NAME) --all-tags
