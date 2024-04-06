ARG CUDA_VERSION=11.7.1
ARG UBUNTU_VERSION=22.04
FROM nvidia/cuda:${CUDA_VERSION}-devel-ubuntu${UBUNTU_VERSION}
ARG TORCH_PLATFORM=cu117

RUN apt update && apt install -y curl build-essential git ffmpeg libjpeg-dev libpng-dev libsm6 libxext6 python3-libnvinfer && rm -rf /var/lib/apt/lists/*
RUN curl -fsSL "https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh" -o /tmp/miniconda.sh && \
    bash /tmp/miniconda.sh -b -p /opt/conda && \
    rm /tmp/miniconda.sh
ENV PATH="/opt/conda/bin:$PATH"

ENV PIP_ROOT_USER_ACTION=ignore
RUN python -m pip install --upgrade pip

RUN pip install accelerate ninja
RUN if [ "${TORCH_PLATFORM}" = "cu117" ]; then \
        pip install torch==1.13.1+cu117 torchvision==0.14.1+cu117 torchaudio==0.13.1 --extra-index-url https://download.pytorch.org/whl/cu117; \
    else \
        pip install torch torchvision torchaudio --extra-index-url https://download.pytorch.org/whl/${TORCH_PLATFORM}; \
    fi
#RUN pip install xformers diffusers==0.15.1
# pip install numpy --pre torch torchvision torchaudio --force-reinstall --extra-index-url https://download.pytorch.org/whl/nightly/${TORCH_PLATFORM}; \

COPY entrypoint.sh /entrypoint.sh
WORKDIR /workspace

ENTRYPOINT [ "/entrypoint.sh" ]
