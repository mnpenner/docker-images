ARG CUDA_VERSION
ARG UBUNTU_VERSION
FROM nvidia/cuda:${CUDA_VERSION}-devel-ubuntu${UBUNTU_VERSION}

RUN apt update && apt install -y curl build-essential git ffmpeg libjpeg-dev libpng-dev libsm6 libxext6 python3-libnvinfer && rm -rf /var/lib/apt/lists/*
RUN curl -sL "https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh" -o /tmp/miniconda.sh && \
    bash /tmp/miniconda.sh -b -p /opt/conda && \
    rm /tmp/miniconda.sh
ENV PATH="/opt/conda/bin:$PATH"
ENV PIP_ROOT_USER_ACTION=ignore
RUN python -m pip install --upgrade pip
RUN pip install accelerate ninja
RUN pip install torch torchvision torchaudio xformers
RUN pip install git+https://github.com/huggingface/diffusers

COPY entrypoint.sh /entrypoint.sh
WORKDIR /workspace

ENTRYPOINT [ "/entrypoint.sh" ]
