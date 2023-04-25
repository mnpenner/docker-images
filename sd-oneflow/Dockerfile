FROM oneflowinc/onediff:cu117

ENV PIP_ROOT_USER_ACTION=ignore
RUN python -m pip install --upgrade pip
RUN pip install accelerate

WORKDIR /srv
COPY src/ ./
