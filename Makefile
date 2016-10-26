.PHONY: build

build:
	docker build . -t endaaman/endaaman.me

push:
	docker push endaaman/endaaman.me

