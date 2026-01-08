# NginX

- nginx 1.29.4 (mainline) & 1.28.1 (stable)
- [ngx_headers_more](https://github.com/openresty/headers-more-nginx-module) v0.38
- [ngx_brotli](https://github.com/google/ngx_brotli)
- [nginx-mod-http-zstd](https://github.com/tokers/zstd-nginx-module)

## Compare defaults

```shell script
podman run --rm nginx cat /etc/nginx/nginx.conf /etc/nginx/conf.d/default.conf /etc/nginx/mime.types
podman run --rm bitnami/nginx cat /opt/bitnami/nginx/conf/nginx.conf /opt/bitnami/nginx/conf/mime.types
podman run --rm mpen/nginx cat /etc/nginx/nginx.conf /etc/nginx/conf.d/default.conf /etc/nginx/mime.types

podman run --rm nginx nginx -V
podman run --rm bitnami/nginx nginx -V
podman run --rm mpen/nginx nginx -V

diff -y -W "$(tput cols)" <(podman run --rm bitnami/nginx cat /opt/bitnami/nginx/conf/mime.types | sort) <(podman run --rm mpen/nginx cat /etc/nginx/mime.types | sort)
```

## Latest version

```shell script
hxcopy http://nginx.org/download/ -o . | hxnormalize -x | hxselect -s '\n' -c 'a::attr(href)' | grep '/nginx-1\.\d+\.\d+\.tar\.gz$$' | sort -Vr | head -n1
```

## Refresh mime.types

```shell
id=$(podman create nginx)
podman cp $id:/etc/nginx/mime.types mime.types.orig
podman rm -v $id
```

or

```sh
podman run --rm --entrypoint cat nginx /etc/nginx/mime.types
podman run --rm --entrypoint cat bitnami/nginx /opt/bitnami/nginx/conf/mime.types
```

## Not included

- [nginx-module-vts](https://github.com/vozlt/nginx-module-vts)
- nginx-module-geoip
- [nginx-module-substitutions-filter](https://github.com/yaoweibin/ngx_http_substitutions_filter_module)


## Run in foreground (with logs)

```sh
podman run --rm -it -p 8080:80 mpen/nginx
```

## Run in background (detached)

```sh
podman run --rm -d -p 8080:80 --name nginx mpen/nginx
```

Stop it with

```sh
podman kill nginx
```
