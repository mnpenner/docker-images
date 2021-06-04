NAME := mpen/build-essentials

test: build
	docker run --rm -it $(NAME) /bin/bash -il

build:
	docker build . -t $(NAME)

push: build
	docker push $(NAME)
