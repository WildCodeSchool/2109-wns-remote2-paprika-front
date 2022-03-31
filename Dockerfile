FROM --platform=$BUILDPLATFORM node:lts-alpine AS build

WORKDIR /paprika-front

COPY package.json ./
COPY tsconfig.json ./

RUN npm i

COPY src src
COPY ./public ./public

RUN npm run build
CMD npm start
