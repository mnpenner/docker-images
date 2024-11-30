NAME := mpen/got-ocr2

build:
	docker build . -t $(NAME) --progress=plain

push: build
	docker push $(NAME) --all-tags

test: # build
	#docker run --rm -it --gpus=all $(NAME)
	docker run --rm -it --gpus=all -v "C:\Users\Mark\PhpstormProjects\docker-images\got-ocr2:/mnt/data"  $(NAME) --model-name /mnt/data/GOT-OCR2_0 --type format --image-file /mnt/data/lettering-hello-world-vector-24929175.jpg

