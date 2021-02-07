ARG PHP_VERSION=7.4
FROM php:${PHP_VERSION}-fpm

RUN apt-get update && apt-get install -y libzip-dev unzip libfcgi-bin \
    && docker-php-ext-install -j$(nproc) pdo_mysql bcmath zip opcache \
    && curl -s https://getcomposer.org/composer-stable.phar -o /usr/local/bin/composer \
    && chmod +x /usr/local/bin/composer \
    && curl -s https://raw.githubusercontent.com/renatomefi/php-fpm-healthcheck/master/php-fpm-healthcheck -o /usr/local/bin/php-fpm-healthcheck \
    && chmod +x /usr/local/bin/php-fpm-healthcheck \
    && mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini" \
    && rm "$PHP_INI_DIR/php.ini-development" /usr/local/etc/php-fpm.conf.default \
    && perl -pi -e 's#^(?=access\.log\b)#;#' /usr/local/etc/php-fpm.d/docker.conf
