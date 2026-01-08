# php-fpm

php-fpm with `composer` and [`php-fpm-healthcheck`](https://github.com/renatomefi/php-fpm-healthcheck).

Available PHP versions:
- 7.1.33
- 7.2.34
- 7.4.33
- 8.0.28
- 8.1.11

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
