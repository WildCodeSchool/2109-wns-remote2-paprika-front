FROM --platform=$BUILDPLATFORM node:lts-alpine AS build

WORKDIR /paprika-front

COPY package.json ./
COPY tsconfig.json ./

RUN npm i

COPY . .

RUN npm run build
