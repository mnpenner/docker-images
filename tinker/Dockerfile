FROM mpen/build-essentials as hg

WORKDIR /work
RUN curl -sL 'https://www.mercurial-scm.org/release/mercurial-5.4.2.tar.gz' | tar xz --strip=1 && make build

###

FROM mpen/zsh

RUN . /etc/os-release \
    && install_packages xz-utils nano less zip unzip htop rsync ncdu pydf pv \
    && curl -sL 'https://deb.nodesource.com/setup_14.x' | bash - \
    && apt-key adv --fetch-keys \
        'https://dl.yarnpkg.com/debian/pubkey.gpg' \
        'https://packages.sury.org/php/apt.gpg' \
        'https://mariadb.org/mariadb_release_signing_key.asc' \
    && add-apt-repository "deb https://dl.yarnpkg.com/debian/ stable main" \
    && add-apt-repository "deb https://packages.sury.org/php/ $(lsb_release -sc) main" \
    && add-apt-repository "deb [arch=amd64] http://sgp1.mirrors.digitalocean.com/mariadb/repo/10.4/$ID $VERSION_CODENAME main" \
    && install_packages nodejs yarn \
        mariadb-client \
        php7.4-cli php7.4-mbstring php7.4-curl php7.4-gd php7.4-zip php7.4-xml php7.4-apcu php7.4-bcmath \
    && update-alternatives --install /usr/bin/python python /usr/bin/python3 1 \
    && curl -sL 'https://getcomposer.org/composer-stable.phar' -o /usr/local/bin/composer \
    && curl -sL 'https://psysh.org/psysh' -o /usr/local/bin/psysh \
    && curl -s https://rclone.org/install.sh | bash \
    && curl -s https://bootstrap.pypa.io/get-pip.py | python \
    && curl -sL https://github.com/stedolan/jq/releases/download/jq-1.6/jq-linux64 -o /usr/local/bin/jq \
    && curl -sL https://raw.githubusercontent.com/sivel/speedtest-cli/master/speedtest.py -o /usr/local/bin/speedtest \
    && chmod +x /usr/local/bin/composer /usr/local/bin/psysh /usr/local/bin/jq /usr/local/bin/speedtest

COPY --from=mpen/mercurial /work /tmp/hg
RUN cd /tmp/hg && make PREFIX=/usr install && rm -r /tmp/hg

COPY .zlogin /root/.zlogin
#RUN . /etc/os-release && echo "$PRETTY_NAME" \
#    && echo '[zsh]' $(zsh --version | head -n1) \
#    && echo '[node]' $(node --version | head -n1) \
#    && echo '[npm]' $(npm --version | head -n1) \
#    && echo '[yarn]' $(yarn --version | head -n1) \
#    && echo '[php]' $(php --version | head -n1) \
#    && echo '[composer]' $(composer --version | head -n1) \
#    && echo '[psysh]' $(psysh --version | head -n1) \
#    && echo '[rclone]' $(rclone --version | head -n1) \
#    && echo '[mariadb]' $(mariadb --version | head -n1) \
#    && echo '[git]' $(git --version | head -n1) \
#    && echo '[hg]' $(hg --version | head -n1) \
#    && echo '[python]' $(python --version | head -n1) \
#    && echo '[pip]' $(pip --version | head -n1) \
#    && echo '[htop]' $(htop --version | head -n1) \
#    && echo '[jq]' $(jq --version | head -n1) \
#    && echo '[rsync]' $(rsync --version | head -n1) \
#    && echo '[speedtest]' $(speedtest --version | head -n1) \
#    && echo '[ncdu]' $(ncdu -v | head -n1) \
#    && echo '[pydf]' $(pydf --version | head -n1)
