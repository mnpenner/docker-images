FROM alpine:latest
ARG NGINX_VERSION

RUN apk add brotli nginx~=$NGINX_VERSION nginx-mod-http-brotli nginx-mod-http-headers-more nginx-mod-http-zstd
# This will create group `nginx:x:101:nginx` automatically

EXPOSE 80
STOPSIGNAL SIGTERM

COPY nginx.conf mime.types /etc/nginx/
COPY http.d /etc/nginx/http.d
COPY www /srv/www


RUN chown -R nginx:nginx /etc/nginx /srv/www
RUN chmod -R a-x,u-s,ug=rX,g+s,o= /etc/nginx /srv/www

WORKDIR /etc/nginx
CMD ["nginx", "-g", "daemon off;"]

