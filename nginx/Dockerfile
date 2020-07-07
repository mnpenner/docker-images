FROM mpen/build-essentials as build

RUN install_packages libpcre3 libpcre3-dev zlib1g zlib1g-dev libssl-dev \
    && cd $(mktemp -dt build.XXX) \
    && curl -sL http://nginx.org/download/nginx-1.19.0.tar.gz | tar xz --strip=1 --one-top-level=nginx  \
    && curl -sL https://github.com/openresty/headers-more-nginx-module/archive/v0.33.tar.gz | tar xz --strip=1 --one-top-level=headers-more \
    && git clone https://github.com/google/ngx_brotli.git brotli && cd brotli && git submodule update --init && cd .. \
    && cd nginx && ./configure --prefix=/opt/nginx --add-module=../headers-more --add-module=../brotli && make install && cd .. \
    && rm -r "$PWD" \
    && ln -sf /dev/stdout /opt/nginx/logs/access.log \
    && ln -sf /dev/stderr /opt/nginx/logs/error.log


#EXPOSE 80

#STOPSIGNAL SIGTERM

# TODO: add to path...?
CMD ["/opt/nginx/sbin/nginx", "-g", "daemon off;"]
#RUN git clone https://github.com/google/ngx_brotli.git . \
#    && ./configure \
#    && make modules
#
#FROM bitnami/nginx
#
#USER 0
#RUN install_packages nginx-plus-module-brotli
#USER 1001

#COPY brotli.conf /opt/bitnami/nginx/conf/server_blocks/brotli.conf
