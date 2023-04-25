FROM nvcr.io/nvidia/pytorch:23.03-py3

ENV PIP_ROOT_USER_ACTION=ignore

RUN python -m pip install --upgrade pip

RUN pip install torch transformers diffusers tqdm pillow nvidia-pyindex onnx onnx_graphsurgeon accelerate tensorrt torch_tensorrt && pip install polygraphy

# update model cache
RUN python -c 'import diffusers'

#ENV HOME /root
#COPY .pythonrc.py $HOME/
#ENV PYTHONSTARTUP="$HOME/.pythonrc.py"
#WORKDIR /srv
