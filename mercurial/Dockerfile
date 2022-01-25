FROM mpen/build-essentials
ARG VERSION=5.9.3

# see also rhg: https://fossies.org/linux/mercurial/rust/rhg/README.md
WORKDIR /work
RUN install_packages gettext \
    && curl -sL "https://www.mercurial-scm.org/release/mercurial-$VERSION.tar.gz" | tar xz --strip=1 \
    && pip install docutils \
    && make build && make doc && make PREFIX=/usr install
