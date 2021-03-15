# NginX

- nginx 1.19.7
- ngx_headers_more v0.33
- ngx_brotli


## Compare defaults

```shell script
docker run --rm nginx cat /etc/nginx/nginx.conf /etc/nginx/conf.d/default.conf
docker run --rm bitnami/nginx cat /opt/bitnami/nginx/conf/nginx.conf
docker run --rm mpen/nginx cat /etc/nginx/nginx.conf /etc/nginx/conf.d/default.conf

docker run --rm nginx nginx -V
docker run --rm bitnami/nginx nginx -V
docker run --rm mpen/nginx nginx -V
```

## Latest version

```shell script
hxcopy http://nginx.org/download/ -o . | hxnormalize -x | hxselect -s '\n' -c 'a::attr(href)' | grep '/nginx-1\.\d+\.\d+\.tar\.gz$$' | sort -Vr | head -n1
```

## Refresh mime.types

```shell
id=$(docker create mpen/nginx)
docker cp $id:/etc/nginx/mime.types mime.types
docker rm -v $id
```
