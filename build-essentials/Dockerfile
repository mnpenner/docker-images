FROM bitnami/minideb:latest

#ENV PYTHON=/usr/bin/python3

RUN install_packages git ca-certificates curl software-properties-common dirmngr gnupg build-essential cmake unzip \
    && update-alternatives --install /usr/bin/python python /usr/bin/python3 1 \
    && git help --config | grep -P '^advice\.' | xargs -i% git config --global % false

WORKDIR /root
COPY .bashrc .bashrc
SHELL ["/bin/bash", "-c"]
