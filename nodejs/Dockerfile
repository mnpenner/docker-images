FROM mpen/build-essentials
ARG VERSION=18

WORKDIR /work
RUN curl -sL "https://deb.nodesource.com/setup_${VERSION}.x" | bash - && install_packages nodejs \
    && npm install --global npm yarn pnpm
RUN npm config set fund false

COPY entrypoint.sh /entrypoint.sh
WORKDIR /workspace

ENTRYPOINT [ "/entrypoint.sh" ]
