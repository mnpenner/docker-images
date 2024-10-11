ARG PHP_VERSION=7.4
FROM php:${PHP_VERSION}-fpm-alpine
ARG COMPOSER_PHAR="https://getcomposer.org/download/latest-2.2.x/composer.phar"

ENV PHP_FPM_DIR=/usr/local/etc/php-fpm.d
ENV FCGI_STATUS_PATH=/php-fpm-status

RUN apk add --no-cache --virtual .build-deps \
    $PHPIZE_DEPS \
    freetype-dev \
    imagemagick-dev \
    libjpeg-turbo-dev \
    libpng-dev \
    libwebp-dev \
    libzip-dev \
    zlib-dev \
    && pecl install imagick \
    && docker-php-ext-enable imagick \
    && docker-php-ext-install -j$(nproc) pdo_mysql bcmath zip opcache gd \
    && apk del .build-deps

# Install runtime dependencies
RUN apk add --no-cache \
    fcgi \
    freetype \
    imagemagick \
    libgomp \
    libjpeg-turbo \
    libpng \
    unzip \
    zlib

RUN curl -s "${COMPOSER_PHAR}" -o /usr/local/bin/composer \
    && chmod +x /usr/local/bin/composer

RUN curl -s https://raw.githubusercontent.com/renatomefi/php-fpm-healthcheck/master/php-fpm-healthcheck -o /usr/local/bin/php-fpm-healthcheck \
    && chmod +x /usr/local/bin/php-fpm-healthcheck

RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini" \
    && rm "$PHP_INI_DIR/php.ini-development" "$PHP_FPM_DIR/www.conf.default" \
    && echo "pm.status_path = $FCGI_STATUS_PATH" >> /usr/local/etc/php-fpm.d/zz-docker.conf
