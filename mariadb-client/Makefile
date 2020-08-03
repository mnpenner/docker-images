

test: build
	docker run --rm -it mpen/mariadb-client bash -il

build:
	docker build . -t mpen/mariadb-client:10.4 --build-arg MARIADB_VERSION=10.4
	docker build . -t mpen/mariadb-client:latest -t mpen/mariadb-client:10.5 --build-arg MARIADB_VERSION=10.5

version:
	docker run --rm -it mpen/mariadb-client mariadb --version
	docker run --rm -it mpen/mariadb-client:10.4 mariadb --version
