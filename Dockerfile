FROM node:lts-alpine

RUN mkdir /paprika-front
WORKDIR /paprika-front

COPY package.json ./

RUN npm install

COPY src src
COPY ./public ./public

ENV WDS_SOCKET_PORT=0
ENV CHOKIDAR_USEPOLLING=true

CMD npm start
