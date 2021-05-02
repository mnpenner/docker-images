

test: build
	docker run --rm -it mpen/mercurial bash -il

build:
	docker build . -t mpen/mercurial

push: build
	docker push mpen/mercurial
