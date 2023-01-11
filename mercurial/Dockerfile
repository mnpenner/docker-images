FROM mpen/build-essentials as build
# see https://www.mercurial-scm.org/release/?C=M;O=D
ARG VERSION=6.3.2

# see also rhg: https://fossies.org/linux/mercurial/rust/rhg/README.md
WORKDIR /work
ENV RUSTUP_HOME=/opt/rust
ENV CARGO_HOME=/opt/rust

RUN install_packages gettext
RUN pip install docutils
RUN curl https://sh.rustup.rs -sSf | sh -s -- -y --no-modify-path
RUN ln -s /opt/rust/bin/* /usr/local/bin/
RUN curl -sL "https://www.mercurial-scm.org/release/mercurial-$VERSION.tar.gz" | tar xz --strip=1
RUN make build && make build-rhg && make doc


FROM mpen/build-essentials as final
COPY --from=build /work /opt/hg
RUN cd /opt/hg && make PREFIX=/usr install && install -m 755 rust/target/release/rhg /usr/bin/
COPY hgrc /root/.hgrc
