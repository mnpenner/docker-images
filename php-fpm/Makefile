


test: build
	docker run --rm -it mpen/php-fpm

build:
	docker build . -t mpen/php-fpm -t mpen/php-fpm:7.4
	docker push mpen/php-fpm
