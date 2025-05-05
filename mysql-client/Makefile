NAME := mpen/mysql-client
VERSION := 8.0.35

test: build
	docker run --rm -it $(NAME) bash -il

build:
	docker build . -t $(NAME):$(VERSION) -t $(NAME):latest --build-arg MYSQL_VERSION=$(VERSION)

push: build
	docker push $(NAME) --all-tags

version:
	docker run --rm -it $(NAME) mysql --version
