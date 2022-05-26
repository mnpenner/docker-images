# NginX

- nginx 1.21.6
- [ngx_headers_more](https://github.com/openresty/headers-more-nginx-module) v0.33
- [ngx_brotli](https://github.com/google/ngx_brotli)


## Compare defaults

```shell script
docker run --rm nginx cat /etc/nginx/nginx.conf /etc/nginx/conf.d/default.conf /etc/nginx/mime.types
docker run --rm bitnami/nginx cat /opt/bitnami/nginx/conf/nginx.conf /opt/bitnami/nginx/conf/mime.types
docker run --rm mpen/nginx cat /etc/nginx/nginx.conf /etc/nginx/conf.d/default.conf /etc/nginx/mime.types

docker run --rm nginx nginx -V
docker run --rm bitnami/nginx nginx -V
docker run --rm mpen/nginx nginx -V

diff -y -W "$(tput cols)" <(docker run --rm bitnami/nginx cat /opt/bitnami/nginx/conf/mime.types) <(docker run --rm mpen/nginx cat /etc/nginx/mime.types)
```

## Latest version

```shell script
hxcopy http://nginx.org/download/ -o . | hxnormalize -x | hxselect -s '\n' -c 'a::attr(href)' | grep '/nginx-1\.\d+\.\d+\.tar\.gz$$' | sort -Vr | head -n1
```

## Refresh mime.types

```shell
id=$(docker create nginx)
docker cp $id:/etc/nginx/mime.types mime.types.orig
docker rm -v $id
```

or

```sh
docker run --rm --entrypoint cat nginx /etc/nginx/mime.types
docker run --rm --entrypoint cat bitnami/nginx /opt/bitnami/nginx/conf/mime.types
```

## Not included

- [nginx-module-vts](https://github.com/vozlt/nginx-module-vts)
- nginx-module-geoip
- [nginx-module-substitutions-filter](https://github.com/yaoweibin/ngx_http_substitutions_filter_module)


## Run in foreground (with logs)

```sh
docker run --rm -it -p 8080:80 mpen/nginx
```

## Run in background (detached)

```sh
docker run --rm -d -p 8080:80 --name nginx mpen/nginx
```

Stop it with

```sh
docker kill nginx
```
