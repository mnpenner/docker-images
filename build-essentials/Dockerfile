FROM bitnami/minideb:latest

ENV PYTHON=/usr/bin/python3
RUN install_packages git ca-certificates curl software-properties-common dirmngr gnupg build-essential python3 python3-distutils python3-dev unzip \
    && update-alternatives --install /usr/bin/python python /usr/bin/python3 1 \
    && curl -s https://bootstrap.pypa.io/get-pip.py | python
COPY .bashrc /root/.bashrc
WORKDIR /root
SHELL ["/bin/bash", "-c"]
