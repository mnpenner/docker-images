

. /etc/os-release && echo "$PRETTY_NAME"
echo '[zsh]' $(zsh --version | head -n1)
echo '[node]' $(node --version | head -n1)
echo '[npm]' $(npm --version | head -n1)
echo '[yarn]' $(yarn --version | head -n1)
echo '[php]' $(php --version | head -n1)
echo '[composer]' $(composer --version | head -n1)
echo '[psysh]' $(psysh --version | head -n1)
echo '[rclone]' $(rclone --version | head -n1)
echo '[mariadb]' $(mariadb --version | head -n1)
echo '[git]' $(git --version | head -n1)
echo '[hg]' $(hg --version | head -n1)
echo '[python]' $(python --version | head -n1)
echo '[pip]' $(pip --version | head -n1)
echo '[htop]' $(htop --version | head -n1)
echo '[jq]' $(jq --version | head -n1)
echo '[rsync]' $(rsync --version | head -n1)
echo '[speedtest]' $(speedtest --version | head -n1)
echo '[ncdu]' $(ncdu -v | head -n1)
echo '[pydf]' $(pydf --version | head -n1)
echo '[pv]' $(pv --version | head -n1)
echo '[hxselect]' $(hxselect -v | head -n1)
echo '[rg]' $(rg --version | head -n1)
