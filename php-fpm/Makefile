

build:
	docker build . --build-arg PHP_VERSION=7.1 -t mpen/php-fpm:7.1
	docker build . --build-arg PHP_VERSION=7.4 -t mpen/php-fpm:7.4
	docker build . --build-arg PHP_VERSION=8.0 -t mpen/php-fpm:8.0 -t mpen/php-fpm:latest

sh:
	docker run --rm -it mpen/php-fpm bash -il

run: build
	docker run --rm -it mpen/php-fpm

push: build
	docker push mpen/php-fpm
