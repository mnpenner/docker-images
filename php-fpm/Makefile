NAME := mpen/php-fpm

php71:
	#curl https://getcomposer.org/download/latest-2.2.x/composer.phar -o composer-2.2.phar
	docker build . --build-arg PHP_VERSION=7.1.33 --build-arg COMPOSER_PHAR="https://getcomposer.org/download/latest-2.2.x/composer.phar" -t $(NAME):7.1 -t $(NAME):7.1.33

php72:
	docker build . --build-arg PHP_VERSION=7.2.34 --build-arg COMPOSER_PHAR="https://getcomposer.org/download/latest-2.2.x/composer.phar" -t $(NAME):7.2 -t $(NAME):7.2.34

php74:
	docker build . --build-arg PHP_VERSION=7.4.33 --build-arg COMPOSER_PHAR="https://getcomposer.org/download/latest-2.2.x/composer.phar" -t $(NAME):7.4 -t $(NAME):7.4.33

php80:
	docker build . --build-arg PHP_VERSION=8.0.28 --build-arg COMPOSER_PHAR="https://getcomposer.org/download/latest-stable/composer.phar" -t $(NAME):8.0 -t $(NAME):8.0.28

mod72: php72
	docker run --rm -it $(NAME):7.2.34 php -m

sh72: php72
	docker run --rm -it $(NAME):7.2.34 sh -il

php81:
	#curl https://getcomposer.org/download/latest-stable/composer.phar -o composer-stable.phar
	docker build . --build-arg PHP_VERSION=8.1.11 --build-arg COMPOSER_PHAR="https://getcomposer.org/download/latest-stable/composer.phar" -t $(NAME):8.1 -t $(NAME):8.1.11 -t $(NAME):latest

build: php74 php80 # php71 php81

#docker build . --build-arg PHP_VERSION=7.1.33 -t $(NAME):7.1 -t $(NAME):7.1.33
#docker build . --build-arg PHP_VERSION=7.4 -t $(NAME):7.4
#docker build . --build-arg PHP_VERSION=8.0 -t $(NAME):8.0
#docker build . --build-arg PHP_VERSION=8.1.11 -t $(NAME):8.1 -t $(NAME):8.1.11 -t $(NAME):latest

sh: php81
	docker run --rm -it $(NAME):latest bash -il

sh71: php71  ## build php 7.1 and enter a shell
	docker run --rm -it $(NAME):7.1.33 bash -il

test: php71
	docker run --rm -it $(NAME):7.1.33 sh -c 'php --version && php -m; composer --version; grep -Prn --color "status_path" "$$PHP_FPM_DIR"; php-fpm-healthcheck --verbose'

run: build
	docker run --rm -it $(NAME)

push: build
	docker push $(NAME) --all-tags

help: ## show this help
	@sed -ne "s/^##\(.*\)/\1/p" $(MAKEFILE_LIST)
	@printf "────────────────────────`tput bold``tput setaf 2` Make Commands `tput sgr0`────────────────────────────────\n"
	@sed -ne "/@sed/!s/\(^[^#?=]*:\).*##\(.*\)/`tput setaf 2``tput bold`\1`tput sgr0`\2/p" $(MAKEFILE_LIST)
	@printf "────────────────────────`tput bold``tput setaf 4` Make Variables `tput sgr0`───────────────────────────────\n"
	@sed -ne "/@sed/!s/\(.*\)?=\(.*\)##\(.*\)/`tput setaf 4``tput bold`\1:`tput setaf 5`\2`tput sgr0`\3/p" $(MAKEFILE_LIST)
	@printf "───────────────────────────────────────────────────────────────────────\n"

.DEFAULT_GOAL := help
