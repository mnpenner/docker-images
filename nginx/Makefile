NAME := mpen/nginx

build:
	bun run build.ts

push: build

serve:
	docker run --rm -it -p 3001:80 $(NAME):latest
