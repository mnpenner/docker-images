FROM mpen/build-essentials
ARG VERSION=16

WORKDIR /work
RUN curl -sL "https://deb.nodesource.com/setup_${VERSION}.x" | bash - && install_packages nodejs
ENTRYPOINT [ "node" ]
