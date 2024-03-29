FROM mpen/zsh
ARG RIPGREP_VER=13.0.0
ARG MARIADB_VER=10.10
ARG PHP_VER=8.2
ARG NODE_VER=18.x
ARG JQ_VER=1.6
ARG YQ_VER=4.30.6

RUN . /etc/os-release \
    && install_packages xz-utils nano less zip unzip htop rsync ncdu pydf pv html-xml-utils moreutils wget neofetch p7zip-full \
    && curl -sL "https://deb.nodesource.com/setup_$NODE_VER" | bash - \
    && apt-key adv --fetch-keys \
        'https://dl.yarnpkg.com/debian/pubkey.gpg' \
        'https://packages.sury.org/php/apt.gpg' \
        'https://mariadb.org/mariadb_release_signing_key.asc' \
    && add-apt-repository "deb https://dl.yarnpkg.com/debian/ stable main" \
    && add-apt-repository "deb https://packages.sury.org/php/ $VERSION_CODENAME main" \
    && add-apt-repository "deb [arch=amd64] http://sgp1.mirrors.digitalocean.com/mariadb/repo/$MARIADB_VER/$ID $VERSION_CODENAME main" \
    && install_packages nodejs yarn \
        mariadb-client \
        php${PHP_VER}-cli php${PHP_VER}-mbstring php${PHP_VER}-curl php${PHP_VER}-gd php${PHP_VER}-zip php${PHP_VER}-xml php${PHP_VER}-apcu php${PHP_VER}-bcmath \
    && update-alternatives --install /usr/bin/python python /usr/bin/python3 1 \
    && curl -sL 'https://getcomposer.org/composer-stable.phar' -o /usr/local/bin/composer \
    && curl -sL 'https://psysh.org/psysh' -o /usr/local/bin/psysh \
    && curl -sL https://rclone.org/install.sh | bash \
    && curl -sL https://pnpm.js.org/pnpm.js | node - add --global pnpm \
    && curl -sL https://github.com/stedolan/jq/releases/download/jq-$JQ_VER/jq-linux64 -o /usr/local/bin/jq \
    && TMP_DIR="$(mktemp -d)" && cd "$TMP_DIR" && curl -sL https://github.com/mikefarah/yq/releases/download/v$YQ_VER/yq_linux_386.tar.gz | tar xz && mv yq_linux_386 /usr/local/bin/yq && ./install-man-page.sh && rm -r "$TMP_DIR" \
    && curl -sL https://raw.githubusercontent.com/sivel/speedtest-cli/master/speedtest.py -o /usr/local/bin/speedtest \
    && chmod +x /usr/local/bin/composer /usr/local/bin/psysh /usr/local/bin/jq /usr/local/bin/speedtest \
    && RG_DEB="$(mktemp -t rg.XXXXX.deb)" && curl -L "https://github.com/BurntSushi/ripgrep/releases/download/$RIPGREP_VER/ripgrep_${RIPGREP_VER}_amd64.deb" -o "$RG_DEB" && dpkg -i "$RG_DEB" && rm "$RG_DEB"

COPY --from=mpen/mercurial /opt/hg /opt/hg
RUN cd /opt/hg && make PREFIX=/usr install && install -m 755 rust/target/release/rhg /usr/bin/

COPY .hgrc /root/.hgrc
COPY .zlogin /root/.zlogin
