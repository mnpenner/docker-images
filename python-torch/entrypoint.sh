#!/usr/bin/bash

# This image can either be a wrapper around arbitrary command lines,
# or it will simply exec Python if no arguments were given
if [[ $# -eq 0 ]]; then
  exec /opt/conda/bin/python
else
  exec "$@"
fi
