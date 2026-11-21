# NginX

- nginx 1.31.9 (mainline) & 1.30.7 (stable), including the [November 18, 2026 security fixes](https://nginx.org/2026.html)
- [ngx_headers_more](https://github.com/openresty/headers-more-nginx-module) v0.41
- [ngx_brotli](https://github.com/google/ngx_brotli) with Brotli 1.2.1 (fixes [CVE-2026-111497](https://github.com/google/brotli/releases/tag/v1.2.1))
- [nginx-mod-http-zstd](https://github.com/tokers/zstd-nginx-module)

## Compare defaults

```shell script
docker run --rm nginx cat /etc/nginx/nginx.conf /etc/nginx/conf.d/default.conf /etc/nginx/mime.types
docker run --rm bitnami/nginx cat /opt/bitnami/nginx/conf/nginx.conf /opt/bitnami/nginx/conf/mime.types
docker run --rm mpen/nginx cat /etc/nginx/nginx.conf /etc/nginx/conf.d/default.conf /etc/nginx/mime.types

docker run --rm nginx nginx -V
docker run --rm bitnami/nginx nginx -V
docker run --rm mpen/nginx nginx -V

diff -y -W "$(tput cols)" <(docker run --rm bitnami/nginx cat /opt/bitnami/nginx/conf/mime.types | sort) <(docker run --rm mpen/nginx cat /etc/nginx/mime.types | sort)
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

The image starts nginx with `-g 'daemon off;'` by default, keeping nginx in
the foreground. Docker stays attached and shows access logs from stdout and
error logs from stderr.

```sh
docker run --rm -it -p 8080:80 mpen/nginx
```

## HTTPS and HTTP/3

The default site listens on TCP 443 for HTTPS and UDP 443 for HTTP/3.
Publish both ports to let clients discover HTTP/3 over HTTPS via the
`Alt-Svc` header. Plain HTTP on port 80 remains available.

```sh
docker run --rm -p 8080:80 -p 443:443/tcp -p 443:443/udp mpen/nginx
```

The container generates a self-signed certificate for localhost on first
startup. With an HTTP/3-capable curl, test it locally with
`curl --http3-only --insecure https://localhost/`.

For a trusted certificate, mount a directory containing `fullchain.pem`
and `privkey.pem` at `/etc/nginx/tls`.

```sh
docker run --rm -p 443:443/tcp -p 443:443/udp -v /path/to/tls:/etc/nginx/tls:ro mpen/nginx
```

## Trusted localhost HTTPS and HTTP/3 on Windows

From the repository root, run this with Windows Bun in Termulator or zsh.

```sh
bun nginx/run-local.ts
```

The launcher builds a local image and serves [https://localhost:8080](https://localhost:8080)
on TCP and UDP loopback. It uses mkcert to generate a localhost certificate and
opens Vivaldi, Chrome, or Edge in a separate profile that accepts only the
generated certificate's key as an exception. In that window, show the
**Protocol** column in DevTools **Network** to verify `h3`. Stop NGINX with
Ctrl+C. If port 8080 is already in use, stop the previous local container first.

Use `bun nginx/run-local.ts --trust` to install the mkcert development CA in the
Windows user trust store and use your regular browser for HTTPS. Windows may
prompt the first time. Chromium's HTTP/3 check still needs the separate
profile opened by the default command.

## Run in background (detached)

```sh
docker run --rm -d -p 8080:80 --name nginx mpen/nginx
```

Stop it with

```sh
docker kill nginx
```
