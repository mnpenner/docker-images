ARG PHP_VERSION=7.4
FROM php:${PHP_VERSION}-fpm

ENV PHP_FPM_DIR /usr/local/etc/php-fpm.d

RUN apt-get update && apt-get install -y --no-install-recommends libzip-dev libpng-dev unzip libfcgi-bin libmagickwand-dev \
    && pecl install imagick \
    && docker-php-ext-install -j$(nproc) pdo_mysql bcmath zip opcache gd \
    && docker-php-ext-enable imagick \
    && curl -s https://getcomposer.org/composer-stable.phar -o /usr/local/bin/composer \
    && chmod +x /usr/local/bin/composer \
    && curl -s https://raw.githubusercontent.com/renatomefi/php-fpm-healthcheck/master/php-fpm-healthcheck -o /usr/local/bin/php-fpm-healthcheck \
    && chmod +x /usr/local/bin/php-fpm-healthcheck \
    && mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini" \
    && rm "$PHP_INI_DIR/php.ini-development" "$PHP_FPM_DIR/www.conf.default"

# perl -pi -e 's#^(?=access\.log\b)#;#' "$PHP_FPM_DIR/docker.conf"
# https://hub.docker.com/_/php
