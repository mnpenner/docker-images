FROM oneflowinc/onediff:cu117

ENV PIP_ROOT_USER_ACTION=ignore
RUN python -m pip install --upgrade pip
RUN pip install accelerate safetensors omegaconf
RUN pip install oneflow diffusers

RUN python -c 'import diffusers'

WORKDIR /srv
COPY src/ ./
