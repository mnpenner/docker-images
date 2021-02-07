FROM php:7.4-fpm

RUN apt-get update && apt-get install -y libzip-dev unzip libfcgi-bin && docker-php-ext-install -j$(nproc) pdo_mysql bcmath zip opcache \
    && curl -s https://getcomposer.org/composer-stable.phar -o /usr/local/bin/composer && chmod +x /usr/local/bin/composer \
    && curl -s https://raw.githubusercontent.com/renatomefi/php-fpm-healthcheck/master/php-fpm-healthcheck -o /usr/local/bin/php-fpm-healthcheck && chmod +x /usr/local/bin/php-fpm-healthcheck
