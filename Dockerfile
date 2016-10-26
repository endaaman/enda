FROM ubuntu:16.04

RUN apt-get update
RUN apt-get install -y \
  nginx \
  curl git \
  supervisor

ENV NODE_ENV production

RUN curl -kL git.io/nodebrew | perl - setup
ENV PATH /root/.nodebrew/current/bin:$PATH
RUN nodebrew install-binary v6.9.1
RUN nodebrew use v6.9.1
RUN ln -s /root/.nodebrew/current/bin/node /usr/bin/node # for node-sass

RUN \
  chown -R www-data:www-data /var/lib/nginx && \
  echo "\ndaemon off;" >> /etc/nginx/nginx.conf && \
  rm /etc/nginx/sites-enabled/default

RUN mkdir -p /var/www/endaaman.me
WORKDIR /var/www/endaaman.me
ADD package.json /var/www/endaaman.me/
RUN cd /var/www/endaaman.me && NODE_ENV=development npm install --no-optional

ADD nginx/enda.conf /etc/nginx/sites-enabled/
ADD supervisor.conf /etc/supervisor/conf.d/

ADD . /var/www/endaaman.me
RUN npm run build

EXPOSE 80 443
CMD ["/usr/bin/supervisord"]
