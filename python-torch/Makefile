NAME := mpen/python-torch

build:
	docker build . -t $(NAME)

run: build
	docker run --rm -it $(NAME)

push: build
	docker push $(NAME) --all-tags
