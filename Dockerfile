FROM justinribeiro/chrome-headless

ARG url
ENV URL=${URL:-$app}

ARG id
ENV ID=${ID:-$app}

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install

COPY . /usr/src/app

EXPOSE 4711

CMD [ "npm", "start" ]