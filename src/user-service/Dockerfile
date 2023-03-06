FROM node:16-alpine

RUN apk --update add postgresql-client
RUN apk add --update python3 make g++\    && rm -rf /var/cache/apk/*

WORKDIR /matteo/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

RUN chmod +x ./scripts/wait-for-postgres.sh
RUN chmod +x ./scripts/docker-entrypoint.sh

EXPOSE 8081