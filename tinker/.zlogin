. /etc/os-release && echo "$PRETTY_NAME"
echo '=== Shell ==='
echo '[zsh]' $(zsh --version | head -n1)
echo '[bash]' $(bash --version | head -n1)
echo '[dash]' $(dpkg -s dash | \grep -oP '^Version: \K.*')
echo '=== Node ==='
echo '[node]' $(node --version | head -n1)
echo '[npm]' $(npm --version | head -n1)
echo '[yarn]' $(yarn --version | head -n1)
echo '[pnpm]' $(pnpm --version | head -n1)
echo '=== PHP ==='
echo '[php]' $(php --version | head -n1)
echo '[composer]' $(composer --version | head -n1)
echo '[psysh]' $(psysh --version | head -n1)
echo '=== Python ==='
echo '[python]' $(python --version | head -n1)
echo '[pip]' $(pip --version | head -n1)
echo '=== VCS ==='
echo '[git]' $(git --version | head -n1)
echo '[hg]' $(hg --version | head -n1)
echo '=== Sync ==='
echo '[rclone]' $(2>/dev/null rclone --version | head -n1)
echo '[rsync]' $(rsync --version | head -n1)
echo '=== Other ==='
echo '[mariadb]' $(mariadb --version | head -n1)
echo '[htop]' $(htop --version | head -n1)
echo '[jq]' $(jq --version | head -n1)
echo '[yq]' $(yq --version | head -n1)
echo '[speedtest]' $(\grep -oPm1 $'^__version__\\s*=\\s*\'\\K([^\']+)' "$(command -v speedtest)")
echo '[ncdu]' $(ncdu -v | head -n1)
echo '[pydf]' $(pydf --version | head -n1)
echo '[pv]' $(pv --version | head -n1)
echo '[hxselect]' $(hxselect -v | head -n1)
echo '[rg]' $(rg --version | head -n1)
echo '[sponge]' $(man -f sponge | head -n1)
