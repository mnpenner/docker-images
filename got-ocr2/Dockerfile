FROM alpine/git:v2.45.2 as git

RUN git clone --depth=1 https://github.com/Ucas-HaoranWei/GOT-OCR2.0.git /git/got && rm -rf /git/got/.git



FROM pytorch/pytorch:2.4.1-cuda11.8-cudnn9-devel as got

WORKDIR /got
COPY --from=git /git/got/GOT-OCR-2.0-master .

RUN conda create -n got python=3.10 -y
SHELL ["conda", "run", "--no-capture-output", "-n", "got", "/usr/bin/bash", "-c"]

#WORKDIR /got/GOT-OCR-2.0-master
#RUN conda activate got
ENV PIP_ROOT_USER_ACTION=ignore

RUN pip install -e .
RUN pip install ninja


RUN apt update && apt install -y git libgl1 libglib2.0-0
#RUN pip install flash-attn --no-build-isolation
#
#COPY entrypoint.sh /entrypoint.sh
#
#ENTRYPOINT [ "/entrypoint.sh" ]
ENTRYPOINT ["conda", "run", "--no-capture-output", "-n", "got", "python3", "GOT/demo/run_ocr_2.0.py"]
