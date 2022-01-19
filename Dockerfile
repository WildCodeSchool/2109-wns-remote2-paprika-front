FROM node:lts-alpine

RUN mkdir /paprika-front
WORKDIR /paprika-front

COPY package.json ./

RUN npm install

COPY src src
COPY ./public ./public

RUN npm run build

CMD npm start
