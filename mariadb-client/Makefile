NAME := mpen/mariadb-client

test: build
	docker run --rm -it $(NAME) bash -il

build:
	docker build . -t $(NAME):10.4 --build-arg MARIADB_VERSION=10.4
	docker build . -t $(NAME):latest -t $(NAME):10.5 --build-arg MARIADB_VERSION=10.5
	docker push $(NAME)

push: build
	docker push $(NAME)

version:
	docker run --rm -it $(NAME) mariadb --version
	docker run --rm -it $(NAME):10.4 mariadb --version
