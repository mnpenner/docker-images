FROM mpen/build-essentials as build
ARG NGINX_VERSION=1.21.0
ARG HEADERS_MORE_VERSION=0.33



# TODO: add http/3 aka quic: https://www.nginx.com/blog/our-roadmap-quic-http-3-support-nginx/
# https://codefaq.org/server/how-to-install-http-3-quic-on-nginx-server-for-ubuntu/

WORKDIR /build

RUN install_packages libpcre3 libpcre3-dev zlib1g zlib1g-dev libssl-dev cmake
RUN curl -sL http://nginx.org/download/nginx-$NGINX_VERSION.tar.gz | tar xz --strip=1 --one-top-level=nginx
RUN git clone --depth 1 --branch "v$HEADERS_MORE_VERSION" https://github.com/openresty/headers-more-nginx-module.git


RUN git clone --recurse-submodules -j8 https://github.com/google/ngx_brotli

RUN mkdir ngx_brotli/deps/brotli/out

RUN cd ngx_brotli/deps/brotli/out && cmake -DCMAKE_BUILD_TYPE=Release -DBUILD_SHARED_LIBS=OFF -DCMAKE_C_FLAGS="-Ofast -m64 -march=native -mtune=native -flto -funroll-loops -ffunction-sections -fdata-sections -Wl,--gc-sections" -DCMAKE_CXX_FLAGS="-Ofast -m64 -march=native -mtune=native -flto -funroll-loops -ffunction-sections -fdata-sections -Wl,--gc-sections" -DCMAKE_INSTALL_PREFIX=./installed ..

RUN cd ngx_brotli/deps/brotli/out && cmake --build . --config Release --target brotlienc


ENV CFLAGS="-m64 -march=native -mtune=native -Ofast -flto -funroll-loops -ffunction-sections -fdata-sections -Wl,--gc-sections"
ENV LDFLAGS="-m64 -Wl,-s -Wl,-Bsymbolic -Wl,--gc-sections"

RUN cd nginx && ./configure \
        --prefix=/etc/nginx \
        --sbin-path=/etc/nginx/bin/nginx \
        --modules-path=/etc/nginx/modules \
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
        --add-module=/build/headers-more-nginx-module \
        --add-module=/build/ngx_brotli

RUN cd nginx && make && make install && rm -r /etc/nginx/html /etc/nginx/*.default /etc/nginx/koi-* /etc/nginx/win-utf


FROM bitnami/minideb:latest
ARG UID=101
ARG GID=101

EXPOSE 80
STOPSIGNAL SIGTERM

RUN install_packages libpcre3 zlib1g libssl-dev

COPY --from=build /etc/nginx /etc/nginx
COPY nginx.conf mime.types /etc/nginx/
COPY conf.d /etc/nginx/conf.d
COPY www /srv/www


RUN groupadd --system --gid $GID nginx
RUN useradd --system --shell /usr/sbin/nologin --comment "nginx user" --no-user-group --no-create-home --gid $GID --uid $UID nginx
RUN install -d -o $UID -g $GID -m 0775 /var/spool/nginx /etc/nginx/modules
RUN chown -R nginx:nginx /etc/nginx /srv/www
RUN chmod -R a-x,u-s,ug=rX,g+s,o= /etc/nginx /srv/www
RUN chmod -R +x /etc/nginx/bin/*
RUN ln -sfn /etc/nginx/bin/nginx /usr/sbin/nginx

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

