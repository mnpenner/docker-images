
test: build
	docker run --rm -it -p 8080:80 mpen/nginx bash -il

serve: build
	docker run --rm -p 8080:80 mpen/nginx

build:
	docker build . -t mpen/nginx

push: build
	docker push mpen/nginx
