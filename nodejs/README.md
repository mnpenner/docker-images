# Node.js

```sh
docker run --rm -it mpen/nodejs:current
docker run --rm -it mpen/nodejs:lts

docker run --rm -it mpen/nodejs:18  
docker run --rm -it mpen/nodejs:20  

docker run --rm --entrypoint npm mpen/nodejs:current -v  # 9.6.4
docker run --rm --entrypoint yarn mpen/nodejs:current -v  # 1.22.19
docker run --rm --entrypoint pnpm mpen/nodejs:current -v  # 8.3.1

docker run --rm --entrypoint cat node /usr/local/bin/docker-entrypoint.sh
```
