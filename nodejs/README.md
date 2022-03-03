# Node.js

```sh
docker run --rm -it mpen/nodejs:current
docker run --rm -it mpen/nodejs:lts

docker run --rm -it mpen/nodejs:14
docker run --rm -it mpen/nodejs:16  # lts
docker run --rm -it mpen/nodejs:17  # current

docker run --rm -it --entrypoint npm mpen/nodejs:current -v
```
