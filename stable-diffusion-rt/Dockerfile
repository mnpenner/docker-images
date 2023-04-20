FROM mpen/python-torch:12.1

RUN pip install torch transformers diffusers tqdm pillow nvidia-pyindex onnx onnx_graphsurgeon accelerate tensorrt && pip install polygraphy

# update model cache
RUN python -c 'import diffusers'

ENV HOME /root
COPY .pythonrc.py $HOME/
ENV PYTHONSTARTUP="$HOME/.pythonrc.py"
#WORKDIR /srv
