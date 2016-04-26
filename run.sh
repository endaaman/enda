#!/bin/bash

running_container_id=`echo $(docker ps -qa --no-trunc -f 'ancestor=enda' -f 'status=running') | sed -e "s/[\r\n]\+/ /g"`

docker build -t enda .
docker run -d \
  -e VIRTUAL_HOST=enda.local,endaaman.me \
  enda

if [ -n "$running_container_id" ]; then
  echo 'Stopping/removing old container...'
  docker stop $running_container_id
  docker rm $running_container_id
  echo 'Done!'
fi
