.PHONY: build

all:
	npm run serve

build:
	docker build . -t endaaman/endaaman.me

push:
	docker push endaaman/endaaman.me

start: build
	docker-compose up -d --build

stop:
	docker-compose stop

