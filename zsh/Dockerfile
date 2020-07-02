FROM bitnami/minideb:latest as build
RUN install_packages curl ca-certificates git

###

FROM build as LS_COLORS
WORKDIR /tmp
RUN curl -sL https://api.github.com/repos/trapd00r/LS_COLORS/tarball/master | tar xz --strip=1 \
    && dircolors -b LS_COLORS > lscolors.sh

###

FROM build as zinit
WORKDIR /tmp
RUN git clone https://github.com/zdharma/zinit.git zinit && rm -r zinit/.github zinit/.git zinit/doc

###

FROM bitnami/minideb:latest

WORKDIR /root

RUN install_packages zsh ncurses-bin git ca-certificates && chsh -s $(which zsh) && rm .bashrc .profile

SHELL ["zsh","-c"]

COPY root .
COPY --from=LS_COLORS /tmp/lscolors.sh .zshrc.d/lscolors.zsh
COPY --from=zinit /tmp/zinit .zinit/bin

ENV TERM=xterm-256color
RUN source .zshrc

CMD ["zsh"]
