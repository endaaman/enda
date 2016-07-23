FROM ubuntu:16.04

RUN apt-get update
RUN apt-get install -y \
  nginx \
  curl git \
  supervisor

ENV NODE_ENV production

RUN curl -kL git.io/nodebrew | perl - setup
ENV PATH /root/.nodebrew/current/bin:$PATH
RUN nodebrew install-binary v6.3.0
RUN nodebrew use v6.3.0

RUN \
  chown -R www-data:www-data /var/lib/nginx && \
  echo "\ndaemon off;" >> /etc/nginx/nginx.conf && \
  rm /etc/nginx/sites-enabled/default

ADD package.json /tmp/package.json
RUN cd /tmp && NODE_ENV=development npm install

ADD nginx/enda.conf /etc/nginx/sites-enabled
ADD supervisor.conf /etc/supervisor/conf.d/

RUN mkdir -p /var/www/enda
RUN cp -a /tmp/node_modules /var/www/enda/

ADD . /var/www/enda
WORKDIR /var/www/enda
RUN npm run build

CMD ["/usr/bin/supervisord"]

EXPOSE 80 443
