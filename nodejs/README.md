# Node.js

```sh
docker run --rm -it mpen/nodejs:current
docker run --rm -it mpen/nodejs:lts

docker run --rm -it mpen/nodejs:14
docker run --rm -it mpen/nodejs:16  # lts
docker run --rm -it mpen/nodejs:17  # current

docker run --rm -it --entrypoint npm mpen/nodejs:current -v  # 8.5.1
docker run --rm -it --entrypoint yarn mpen/nodejs:current -v  # 1.22.17
docker run --rm -it --entrypoint pnpm mpen/nodejs:current -v  # 6.32.2
```
