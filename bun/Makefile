NAME := mpen/bun

test: build
	docker run --rm -it $(NAME)

build:
	BUILDKIT_PROGRESS=plain docker build . -t $(NAME)

help: build
	docker run --rm -it $(NAME) --help

bash: build
	docker run --rm -it -p3000:3000 $(NAME) bash

dev: build
	docker run --rm -it -p3000:3000 $(NAME) dev

push: build
	docker push $(NAME)
