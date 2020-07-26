# Mercurial

## Latest version

```shell script
hxnormalize -x https://www.mercurial-scm.org/release/ | hxselect -s '\n' -c 'a' | grep '^mercurial-5\.\d+\.\d+\.tar\.gz$' | sort -V
```
