NAME := mpen/nodejs

test: build
	docker run --rm -it $(NAME):current

build:
	docker build . -t $(NAME):14 --build-arg VERSION=14
	docker build . -t $(NAME):16 -t $(NAME):lts --build-arg VERSION=16
	docker build . -t $(NAME):17 -t $(NAME):current --build-arg VERSION=17

push: build
	docker push $(NAME)
