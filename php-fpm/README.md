# php-fpm

php-fpm with `composer` and [`php-fpm-healthcheck`](https://github.com/renatomefi/php-fpm-healthcheck).

Uses production configuration by default. `access.log` is disabled to prevent double logging when used with nginx. Runs as `www-data:www-data`.

Comes with the following extensions enabled:

* `zip`
* `bcmath`
* `pdo_mysql`
* `opcache`
* `sodium`

Find settings to override:

```sh
\grep -r -n --color --perl-regexp '^[\w.]+' "$PHP_INI_DIR" "$PHP_FPM_DIR"
```
