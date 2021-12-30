NAME := mpen/mercurial

test: build
	docker run --rm -it $(NAME) bash -il

build:
	docker build . -t $(NAME):5 -t $(NAME):5.9 -t $(NAME):latest --build-arg VERSION=5.9.2
	docker build . -t $(NAME):6 -t $(NAME):6.0 --build-arg VERSION=6.0

push: build
	docker push $(NAME)
