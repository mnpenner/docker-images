FROM mpen/build-essentials

WORKDIR /work
RUN install_packages gettext \
    && curl -sL 'https://www.mercurial-scm.org/release/mercurial-5.4.2.tar.gz' | tar xz --strip=1 \
    && pip install docutils \
    && make build && make doc && make PREFIX=/usr install
