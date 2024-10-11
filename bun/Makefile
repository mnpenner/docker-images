NAME := mpen/bun
VERSION := 1.1.24

test: build
	docker run --rm -it $(NAME)

build:
	docker build . --progress=plain -t $(NAME):$(VERSION) -t $(NAME):latest --build-arg VERSION=$(VERSION)

help: build
	docker run --rm -it $(NAME) --help

bash: build
	docker run --rm -it -p3000:3000 $(NAME) bash

dev: build
	docker run --rm -it -p3000:3000 $(NAME) dev

push: build
	docker push $(NAME)
