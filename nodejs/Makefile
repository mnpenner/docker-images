NAME := mpen/nodejs

test: build
	docker run --rm -it $(NAME):current

build:
	docker build . -t $(NAME):18 -t $(NAME):lts --build-arg VERSION=18
	docker build . -t $(NAME):20 -t $(NAME):current -t $(NAME):latest --build-arg VERSION=20

run: build
	docker run --rm -it $(NAME)

push: build
	docker push $(NAME)
