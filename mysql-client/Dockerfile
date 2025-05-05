ARG MYSQL_VERSION=8.0.35
FROM mysql:$MYSQL_VERSION

RUN microdnf install -y unzip \
    && curl -s https://rclone.org/install.sh | bash \
    && microdnf clean all
