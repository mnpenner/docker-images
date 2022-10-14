# php-fpm

php-fpm with `composer` and [`php-fpm-healthcheck`](https://github.com/renatomefi/php-fpm-healthcheck).

Uses production configuration and runs as `www-data:www-data` by default.

Comes with the following extensions enabled:

* `bcmath`
* `gd`
* `imagick`
* `opcache`
* `pdo_mysql`
* `sodium`
* `zip`

Find settings to override:

```sh
\grep -r -n --color --perl-regexp '^[\w.]+' "$PHP_INI_DIR" "$PHP_FPM_DIR"
```
