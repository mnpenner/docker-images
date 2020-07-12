FROM mpen/build-essentials
ARG MARIADB_VERSION=10.4

RUN apt-key adv --fetch-keys 'https://mariadb.org/mariadb_release_signing_key.asc' \
    && . /etc/os-release \
    && add-apt-repository "deb [arch=amd64] http://sfo1.mirrors.digitalocean.com/mariadb/repo/$MARIADB_VERSION/$ID $VERSION_CODENAME main" \
    && install_packages mariadb-client

CMD ["mariadb"]
