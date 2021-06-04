NAME := mpen/nginx

test: build
	docker run --rm -it $(NAME) bash -il

serve: build
	docker run --rm -p 8080:80 $(NAME)

build:
	docker build . -t $(NAME):latest -t $(NAME):1.21 --build-arg NGINX_VERSION=1.21.0

push: build
	docker push $(NAME)
