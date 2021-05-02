NAME := mpen/tinker

test: build
	docker run --rm -it $(NAME)

build:
	docker build . -t $(NAME)

push: build
	docker push $(NAME)
