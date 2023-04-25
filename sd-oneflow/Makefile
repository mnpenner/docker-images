NAME := mpen/sd-oneflow

build:
	docker build . -t $(NAME)

run: build
	./run.sh

push: build
	docker push $(NAME) --all-tags
