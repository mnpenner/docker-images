FROM nvidia/cuda:11.7.1-devel-ubuntu22.04

RUN apt update && apt install -y curl build-essential git
RUN curl -sL "https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh" > /tmp/miniconda.sh
RUN bash /tmp/miniconda.sh -b -p /opt/miniconda
ENV PATH="/opt/miniconda/bin:$PATH"
RUN pip install torch torchvision torchaudio xformers ninja

ENTRYPOINT [ "python" ]
