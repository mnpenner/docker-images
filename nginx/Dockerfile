FROM alpine:latest
ARG UID=101
ARG GID=101
ARG NGINX_VERSION

RUN apk add brotli nginx nginx-mod-http-brotli nginx-mod-http-headers-more
# This will create group `nginx:x:101:nginx` automatically

EXPOSE 80
STOPSIGNAL SIGTERM

#RUN install_packages libpcre3 zlib1g libssl-dev

#COPY --from=build /etc/nginx /etc/nginx
COPY nginx.conf mime.types /etc/nginx/
COPY http.d /etc/nginx/http.d
COPY www /srv/www


#RUN addgroup -S -g $GID nginx
#RUN useradd --system --shell /usr/sbin/nologin --comment "nginx user" --no-user-group --no-create-home --gid $GID --uid $UID nginx
#RUN install -d -o $UID -g $GID -m 0775 /var/spool/nginx /etc/nginx/modules
RUN chown -R nginx:nginx /etc/nginx /srv/www
RUN chmod -R a-x,u-s,ug=rX,g+s,o= /etc/nginx /srv/www
#RUN chmod -R +x /etc/nginx/bin/*
#RUN ln -sfn /etc/nginx/bin/nginx /usr/sbin/nginx

#RUN <<-EOF
#set -eux
#groupadd --system --gid $GID nginx
#useradd --system --shell /usr/sbin/nologin --comment "nginx user" --no-user-group --no-create-home --gid $GID --uid $UID nginx
#install -d -o $UID -g $GID -m 0775 /var/spool/nginx /etc/nginx/modules
#
#ln -sfn /etc/nginx/bin/nginx /usr/sbin/nginx
#
#chown -R nginx:nginx /etc/nginx /srv/www
#chmod -R a-x,u-s,ug=rX,g+s,o= /etc/nginx /srv/www
#EOF

WORKDIR /etc/nginx
CMD ["nginx", "-g", "daemon off;"]

