FROM mpen/build-essentials
ARG VERSION=1.1.2

RUN ZIP="$(mktemp -t bun.XXXXX.zip)" \
    && curl -fsSL "https://github.com/oven-sh/bun/releases/download/bun-v${VERSION}/bun-linux-x64-baseline.zip" -o "$ZIP" \
    && unzip -j "$ZIP" bun-linux-x64-baseline/bun -d /usr/bin \
    && rm "$ZIP" \
    && SHELL=bash bun completions > /usr/share/bash-completion/completions/bun

COPY entrypoint.sh /entrypoint.sh
WORKDIR /workspace

ENTRYPOINT [ "/entrypoint.sh" ]
CMD [ "repl" ]
