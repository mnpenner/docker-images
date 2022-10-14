NAME := mpen/php-fpm

php71:
	docker build . --build-arg PHP_VERSION=7.1.33 --build-arg COMPOSER_PHAR="https://getcomposer.org/download/latest-2.2.x/composer.phar" -t $(NAME):7.1 -t $(NAME):7.1.33

php81:
	docker build . --build-arg PHP_VERSION=8.1.11 --build-arg COMPOSER_PHAR="https://getcomposer.org/download/latest-stable/composer.phar" -t $(NAME):8.1 -t $(NAME):8.1.11 -t $(NAME):latest

build: php71 php81

#docker build . --build-arg PHP_VERSION=7.1.33 -t $(NAME):7.1 -t $(NAME):7.1.33
#docker build . --build-arg PHP_VERSION=7.4 -t $(NAME):7.4
#docker build . --build-arg PHP_VERSION=8.0 -t $(NAME):8.0
#docker build . --build-arg PHP_VERSION=8.1.11 -t $(NAME):8.1 -t $(NAME):8.1.11 -t $(NAME):latest

sh: php81
	docker run --rm -it $(NAME):latest bash -il

sh71: php71
	docker run --rm -it $(NAME):7.1.33 bash -il

test: php71
	docker run --rm -it $(NAME):7.1.33 sh -c 'php --version && php -m; composer --version; grep -Prn --color "status_path|ping\\.path" "$$PHP_FPM_DIR"; php-fpm-healthcheck --verbose'

run: build
	docker run --rm -it $(NAME)

push: build
	docker push $(NAME) --all-tags
