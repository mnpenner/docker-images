FROM mpen/build-essentials as build
ARG NGINX_VERSION=1.19.10
ARG HEADERS_MORE_VERSION=0.33
ARG UID=101
ARG GID=101

EXPOSE 80
STOPSIGNAL SIGTERM

RUN install_packages libpcre3 libpcre3-dev zlib1g zlib1g-dev libssl-dev \
    && BUILD_DIR=$(mktemp -dt build.XXX) && cd $BUILD_DIR \
    && curl -sL http://nginx.org/download/nginx-$NGINX_VERSION.tar.gz | tar xz --strip=1 --one-top-level=nginx  \
    && curl -sL https://github.com/openresty/headers-more-nginx-module/archive/v$HEADERS_MORE_VERSION.tar.gz | tar xz --strip=1 --one-top-level=headers-more \
    && git clone https://github.com/google/ngx_brotli.git brotli && cd brotli && git submodule update --init \
    && groupadd --system --gid $GID nginx \
    && useradd --system --shell /usr/sbin/nologin --comment "nginx user" --no-user-group --no-create-home --gid $GID --uid $UID nginx \
    && install -d -o $UID -g $GID -m 0775 /var/spool/nginx /usr/lib/nginx/modules \
    && cd $BUILD_DIR/nginx && ./configure \
        --prefix=/etc/nginx \
        --sbin-path=/usr/sbin/nginx \
        --modules-path=/usr/lib/nginx/modules \
        --conf-path=/etc/nginx/nginx.conf \
        --error-log-path=/dev/stderr \
        --http-log-path=/dev/stdout \
        --pid-path=/var/run/nginx.pid \
        --lock-path=/var/run/nginx.lock \
        --user=nginx \
        --group=nginx \
        --with-compat \
        --with-file-aio \
        --with-threads \
        --http-client-body-temp-path=/var/spool/nginx/client_body \
        --http-proxy-temp-path=/var/spool/nginx/proxy \
        --http-fastcgi-temp-path=/var/spool/nginx/fastcgi \
        --http-uwsgi-temp-path=/var/spool/nginx/uwsgi \
        --http-scgi-temp-path=/var/spool/nginx/scgi \
        --with-http_addition_module \
        --with-http_auth_request_module \
        --with-http_dav_module \
        --with-http_flv_module \
        --with-http_gunzip_module \
        --with-http_gzip_static_module \
        --with-http_mp4_module \
        --with-http_random_index_module \
        --with-http_realip_module \
        --with-http_secure_link_module \
        --with-http_slice_module \
        --with-http_ssl_module \
        --with-http_stub_status_module \
        --with-http_sub_module \
        --with-http_v2_module \
        --with-mail \
        --with-mail_ssl_module \
        --with-stream \
        --with-stream_realip_module \
        --with-stream_ssl_module \
        --with-stream_ssl_preread_module \
        --add-module=$BUILD_DIR/headers-more \
        --add-module=$BUILD_DIR/brotli \
    && make && make install \
    && rm -r "$BUILD_DIR" /etc/nginx/html /etc/nginx/*.default /etc/nginx/koi-* /etc/nginx/win-utf


COPY nginx.conf mime.types /etc/nginx/
COPY conf.d /etc/nginx/conf.d
COPY www /srv/www

RUN chown -R nginx:nginx /etc/nginx /srv/www \
    && chmod -R a-x,u-s,ug=rX,g+s,o= /etc/nginx /srv/www

WORKDIR /etc/nginx
CMD ["nginx", "-g", "daemon off;"]

