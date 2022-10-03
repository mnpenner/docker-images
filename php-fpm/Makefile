NAME := mpen/php-fpm

build:
	docker build . --build-arg PHP_VERSION=7.1 -t $(NAME):7.1 -t $(NAME):7.1.33
	docker build . --build-arg PHP_VERSION=7.4 -t $(NAME):7.4
	docker build . --build-arg PHP_VERSION=8.0 -t $(NAME):8.0
	docker build . --build-arg PHP_VERSION=8.1 -t $(NAME):8.1 -t $(NAME):latest

sh:
	docker run --rm -it $(NAME) bash -il

run: build
	docker run --rm -it $(NAME)

push: build
	docker push $(NAME)
