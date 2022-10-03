NAME := mpen/nginx
# Check http://nginx.org/en/download.html for latest version.
MINOR_VERSION := 1.23
PATCH_VERSION := 1.23.1
HEADERS_MORE_VERSION := 0.34

test: build
	docker run --rm -it $(NAME) bash -il

serve: build
	docker run --rm -it -p 8080:80 $(NAME)

build:
	docker build . -t $(NAME):latest -t $(NAME):$(MINOR_VERSION) -t $(NAME):$(PATCH_VERSION) --build-arg NGINX_VERSION=$(PATCH_VERSION) --build-arg HEADERS_MORE_VERSION=$(HEADERS_MORE_VERSION)

push: build
	docker push $(NAME)
