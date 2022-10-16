ARG PHP_VERSION=7.4
FROM php:${PHP_VERSION}-fpm
ARG COMPOSER_PHAR="https://getcomposer.org/download/latest-2.2.x/composer.phar"

ENV PHP_FPM_DIR=/usr/local/etc/php-fpm.d
ENV FCGI_STATUS_PATH=/php-fpm-status

RUN apt-get update && apt-get install -y --no-install-recommends libzip-dev libpng-dev unzip libfcgi-bin libmagickwand-dev libfreetype6-dev libjpeg62-turbo-dev libpng-dev

RUN pecl install imagick \
    && docker-php-ext-install -j$(nproc) pdo_mysql bcmath zip opcache gd \
    && docker-php-ext-enable imagick

RUN curl -s "${COMPOSER_PHAR}" -o /usr/local/bin/composer \
    && chmod +x /usr/local/bin/composer

RUN curl -s https://raw.githubusercontent.com/renatomefi/php-fpm-healthcheck/master/php-fpm-healthcheck -o /usr/local/bin/php-fpm-healthcheck \
    && chmod +x /usr/local/bin/php-fpm-healthcheck

RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini" \
    && rm "$PHP_INI_DIR/php.ini-development" "$PHP_FPM_DIR/www.conf.default" \
    && echo "pm.status_path = $FCGI_STATUS_PATH" >> /usr/local/etc/php-fpm.d/zz-docker.conf \

# perl -pi -e 's#^;(?=(pm\.status_path|ping\.path)\b)##' "$PHP_FPM_DIR/www.conf"
# perl -pi -e 's#^(?=access\.log\b)#;#' "$PHP_FPM_DIR/docker.conf"
# https://hub.docker.com/_/php
