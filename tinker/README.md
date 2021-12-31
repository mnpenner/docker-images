# tinker

A fully-loaded dev environment for running the latest software.

```
Debian GNU/Linux 10 (buster)
=== Shell ===
[zsh] zsh 5.7.1 (x86_64-debian-linux-gnu)
[bash] GNU bash, version 5.0.3(1)-release (x86_64-pc-linux-gnu)
[dash] 0.5.10.2-5
=== Node ===
[node] v17.3.0
[npm] 8.3.0
[yarn] 1.22.17
[pnpm] 6.24.4
=== PHP ===
[php] PHP 8.1.1 (cli) (built: Dec 20 2021 21:33:24) (NTS)
[composer] Composer version 2.2.2 2021-12-29 14:15:27
[psysh] Psy Shell v0.11.0 (PHP 8.1.1 — cli)
=== Python ===
[python] Python 3.7.3
[pip] pip 21.3.1 from /usr/local/lib/python3.7/dist-packages/pip (python 3.7)
=== VCS ===
[git] git version 2.20.1
[hg] Mercurial Distributed SCM (version 5.9.2)
=== Sync ===
[rclone] rclone v1.57.0
[rsync] rsync version 3.1.3 protocol version 31
=== HTTP ===
[curl] curl 7.64.0 (x86_64-pc-linux-gnu) libcurl/7.64.0 OpenSSL/1.1.1d zlib/1.2.11 libidn2/2.0.5 libpsl/0.20.2 (+libidn2/2.0.5) libssh2/1.8.
0 nghttp2/1.36.0 librtmp/2.3
[wget] GNU Wget 1.20.1 built on linux-gnu.
[hxselect] Version: html-xml-utils 7.7
[speedtest] 2.1.4b1
=== File System ===
[ncdu] ncdu 1.13
[htop] htop 2.2.0 - (C) 2004-2018 Hisham Muhammad
[pydf] pydf version 12
[rg] ripgrep 13.0.0 (rev 7ec2fd51ba)
[pv] pv 1.6.6 - Copyright 2015 Andrew Wood <andrew.wood@ivarch.com>
[sponge] sponge (1) - soak up standard input and write to a file
[neofetch] Neofetch 6.0.0
=== Compression/Archives ===
[7z] p7zip Version 16.02 (locale=C,Utf16=off,HugeFiles=on,64 bits,16 CPUs 11th Gen Intel(R) Core(TM) i9-11900K @ 3.50GHz (A0671),ASM,AES-NI)
[unzip] UnZip 6.00 of 20 April 2009, by Debian. Original by Info-ZIP.
[tar] tar (GNU tar) 1.30
=== JSON/YAML ===
[jq] jq-1.6
[yq] yq (https://github.com/mikefarah/yq/) version 4.16.2
=== Database ===
[mariadb] mariadb Ver 15.1 Distrib 10.7.1-MariaDB, for debian-linux-gnu (x86_64) using readline 5.2
```

## Quiet

Run

```sh
docker run --rm -it mpen/tinker zsh -i
```

To avoid the `.zlogin` message that tells you what's installed.

# REPLs

## zsh

```sh
docker run --rm -it mpen/tinker
```

(The default command)

## PHP:

```sh
docker run --rm -it mpen/tinker psysh
```

## Node:

```sh
docker run --rm -it mpen/tinker node
```

(Ctrl+D to exit)

## MySQL/MariaDB:

```sh
docker run --rm -it mpen/tinker mysql -hhost.docker.internal -p
```

<!-- https://stackoverflow.com/questions/24319662/from-inside-of-a-docker-container-how-do-i-connect-to-the-localhost-of-the-mach -->

