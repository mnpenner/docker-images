NAME := mpen/nginx
# Check http://nginx.org/en/download.html for latest version.
NGINX_VERSION := 1.26.2

test: build
	docker run --rm -it $(NAME) bash -il

serve: build
	docker run --rm -it -p 3000:80 $(NAME)

build:
	DOCKER_BUILDKIT=1 docker build . -t $(NAME):latest -t $(NAME):$(NGINX_VERSION) --build-arg NGINX_VERSION=$(NGINX_VERSION)

push: build
	docker push $(NAME) --all-tags
