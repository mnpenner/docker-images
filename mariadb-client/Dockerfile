FROM mpen/build-essentials
ARG MARIADB_VERSION=10.5

# alt: curl -LsS https://r.mariadb.com/downloads/mariadb_repo_setup | bash
RUN . /etc/os-release \
    && apt-key adv --fetch-keys 'https://mariadb.org/mariadb_release_signing_key.asc' \
    && add-apt-repository "deb [arch=amd64] http://sfo1.mirrors.digitalocean.com/mariadb/repo/$MARIADB_VERSION/$ID $VERSION_CODENAME main" \
    && install_packages mariadb-client \
    && curl -s https://rclone.org/install.sh | bash

CMD ["mariadb"]
