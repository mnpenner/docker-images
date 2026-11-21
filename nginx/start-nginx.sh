#!/bin/sh
set -eu

tls_dir=/etc/nginx/tls
if [ ! -e "$tls_dir" ]; then
    echo "Generating a self-signed TLS certificate for localhost" >&2
    (
        umask 077
        temp_dir=$(mktemp -d /etc/nginx/.tls.XXXXXX)
        trap 'rm -rf "$temp_dir"' EXIT
        openssl req -x509 -newkey ec -pkeyopt ec_paramgen_curve:prime256v1 \
            -noenc -days 365 -subj /CN=localhost \
            -addext 'subjectAltName=DNS:localhost,IP:127.0.0.1,IP:::1' \
            -keyout "$temp_dir/privkey.pem" -out "$temp_dir/fullchain.pem"
        mv "$temp_dir" "$tls_dir"
        trap - EXIT
    )
fi

exec /usr/sbin/nginx "$@"
