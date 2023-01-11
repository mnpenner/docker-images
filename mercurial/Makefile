NAME := mpen/mercurial

test: build
	docker run --rm -it $(NAME) bash -il

	#docker build . -t $(NAME):5 -t $(NAME):5.9 --build-arg VERSION=5.9.3
build:
	docker build . -t $(NAME):6 -t $(NAME):6.3 -t $(NAME):latest --build-arg VERSION=6.3.2

push: build
	docker push $(NAME)
