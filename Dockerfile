FROM node:8-slim

RUN apt-get update --fix-missing && apt-get -y upgrade

RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-unstable --no-install-recommends \
    && rm -rf /var/lib/apt/lists/* \
    && rm -rf /src/*.deb

ADD https://github.com/Yelp/dumb-init/releases/download/v1.2.0/dumb-init_1.2.0_amd64 /usr/local/bin/dumb-init
RUN chmod +x /usr/local/bin/dumb-init

ARG CACHEBUST=1
RUN npm i lighthouse -g

RUN mkdir -p /usr/src/monitor
WORKDIR /usr/src/monitor


COPY package.json package-lock.json ./
RUN npm install --production

COPY . ./
RUN chmod +x index.js

COPY entrypoint.sh ./
RUN chmod +x entrypoint.sh

RUN groupadd -r chrome && useradd -r -m -g chrome -G audio,video chrome && \
    mkdir -p /home/chrome/reports && \
    chown -R chrome:chrome /home/chrome

USER chrome

ENV CI=true

EXPOSE 4711

ENTRYPOINT ["dumb-init", "--", "/entrypoint.sh"]