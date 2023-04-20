ARG CUDA_VERSION
ARG UBUNTU_VERSION
FROM nvidia/cuda:${CUDA_VERSION}-devel-ubuntu${UBUNTU_VERSION}

RUN apt update && apt install -y curl build-essential git && rm -rf /var/lib/apt/lists/*
RUN curl -sL "https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh" > /tmp/miniconda.sh
RUN bash /tmp/miniconda.sh -b -p /opt/miniconda
ENV PATH="/opt/miniconda/bin:$PATH"
RUN pip install torch torchvision torchaudio xformers ninja

ENTRYPOINT [ "python" ]
