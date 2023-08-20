FROM mpen/build-essentials as LS_COLORS
WORKDIR /work
RUN curl -sL https://api.github.com/repos/trapd00r/LS_COLORS/tarball/master | tar xz --strip=1 \
    && dircolors -b LS_COLORS > lscolors.sh


FROM mpen/build-essentials as zinit
WORKDIR /work
RUN git clone --depth=1 https://github.com/zdharma-continuum/zinit.git zinit && rm -r zinit/{.git*,.dockerignore}


FROM mpen/build-essentials

WORKDIR /root

RUN install_packages zsh ncurses-bin man \
  && chsh -s $(which zsh)  \
  && rm .bashrc .profile

SHELL ["zsh", "-c"]

COPY root .
COPY --from=LS_COLORS /work/lscolors.sh .zshrc.d/lscolors.zsh
COPY --from=zinit /work/zinit .zinit/bin

ENV TERM=xterm-256color
RUN source .zshrc

CMD ["zsh", "-il"]
