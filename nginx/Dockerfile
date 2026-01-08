FROM mpen/build-essentials as build
ARG NGINX_VERSION=1.29.4
ARG HEADERS_MORE_VERSION=0.38
ARG ZSTD_MODULE_REF=master

RUN install_packages libpcre2-dev zlib1g-dev libssl-dev libzstd-dev

WORKDIR /build
RUN curl -fsSL "http://nginx.org/download/nginx-${NGINX_VERSION}.tar.gz" \
    | tar xz --one-top-level=nginx --strip-components=1
RUN git clone --depth 1 --branch "v${HEADERS_MORE_VERSION}" \
    https://github.com/openresty/headers-more-nginx-module.git
RUN git clone --recurse-submodules --shallow-submodules --depth 1 \
    https://github.com/google/ngx_brotli
RUN git clone --depth 1 --branch "${ZSTD_MODULE_REF}" \
    https://github.com/tokers/zstd-nginx-module.git

RUN mkdir -p /build/ngx_brotli/deps/brotli/out \
    && cd /build/ngx_brotli/deps/brotli/out \
    && cmake -DCMAKE_BUILD_TYPE=Release -DBUILD_SHARED_LIBS=OFF .. \
    && cmake --build . --config Release

RUN cd nginx && ./configure \
        --prefix=/etc/nginx \
        --sbin-path=/usr/sbin/nginx \
        --modules-path=/etc/nginx/modules \
        --conf-path=/etc/nginx/nginx.conf \
        --error-log-path=/dev/stderr \
        --http-log-path=/dev/stdout \
        --pid-path=/var/run/nginx.pid \
        --lock-path=/var/run/nginx.lock \
        --user=nginx \
        --group=nginx \
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
        --add-module=/build/ngx_brotli \
        --add-module=/build/zstd-nginx-module

RUN cd nginx && make -j"$(nproc)" && make install \
    && rm -rf /etc/nginx/html /etc/nginx/*.default /etc/nginx/koi-* /etc/nginx/win-utf

FROM build as runtime-prep
ARG UID=101
ARG GID=101

RUN if ! getent group "${GID}" >/dev/null; then groupadd --system --gid "${GID}" nginx; fi \
    && if ! getent passwd "${UID}" >/dev/null; then \
        useradd --system --shell /usr/sbin/nologin --comment "nginx user" \
            --no-user-group --no-create-home --gid "${GID}" --uid "${UID}" nginx; \
    fi \
    && if ! getent group nginx >/dev/null; then echo "nginx:x:${GID}:" >> /etc/group; fi \
    && if ! getent passwd nginx >/dev/null; then echo "nginx:x:${UID}:${GID}:nginx:/nonexistent:/usr/sbin/nologin" >> /etc/passwd; fi \
    && install -d -o "${UID}" -g "${GID}" -m 0775 /var/spool/nginx /etc/nginx/modules /var/run /srv/www

COPY nginx.conf mime.types /etc/nginx/
COPY http.d /etc/nginx/http.d
COPY www /srv/www

RUN chown -R "${UID}:${GID}" /etc/nginx /srv/www \
    && chmod -R a-x,u-s,ug=rX,g+s,o= /etc/nginx /srv/www

RUN mkdir -p /dist/etc /dist/usr/sbin /dist/srv /dist/var/spool /dist/var \
    && cp -a /etc/nginx /dist/etc/ \
    && cp -a /usr/sbin/nginx /dist/usr/sbin/ \
    && cp -a /srv/www /dist/srv/ \
    && cp -a /var/spool/nginx /dist/var/spool/ \
    && cp -a /var/run /dist/var/ \
    && cp -a /etc/passwd /etc/group /dist/etc/ \
    && if [ -e /lib/x86_64-linux-gnu/libcrypt.so.1 ]; then cp --parents /lib/x86_64-linux-gnu/libcrypt.so.1 /dist; fi \
    && if [ -e /lib/x86_64-linux-gnu/libpcre2-8.so.0 ]; then cp --parents /lib/x86_64-linux-gnu/libpcre2-8.so.0 /dist; fi \
    && if [ -e /usr/lib/x86_64-linux-gnu/libpcre2-8.so.0 ]; then cp --parents /usr/lib/x86_64-linux-gnu/libpcre2-8.so.0 /dist; fi \
    && if [ -e /lib/x86_64-linux-gnu/libz.so.1 ]; then cp --parents /lib/x86_64-linux-gnu/libz.so.1 /dist; fi \
    && if [ -e /usr/lib/x86_64-linux-gnu/libz.so.1 ]; then cp --parents /usr/lib/x86_64-linux-gnu/libz.so.1 /dist; fi \
    && ldd /usr/sbin/nginx \
        | awk '$3 ~ /^\\// { print $3 }' \
        | xargs -I '{}' cp --parents '{}' /dist

FROM gcr.io/distroless/cc-debian12
COPY --from=runtime-prep /dist/ /

EXPOSE 80
# Use SIGQUIT intead of SIGTERM to give chance for graceful shutdown
# https://github.com/nginx/docker-nginx/issues/377
# https://medium.com/codecademy-engineering/kubernetes-nginx-and-zero-downtime-in-production-2c910c6a5ed8
# https://github.com/kubernetes/kubernetes/issues/30051
STOPSIGNAL SIGQUIT

WORKDIR /etc/nginx
CMD ["/usr/sbin/nginx", "-g", "daemon off;"]
