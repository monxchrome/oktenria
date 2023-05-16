FROM node:18-alpine

MAINTAINER Oktenria Dev

RUN mkdir /app

COPY backend/package.json /app

WORKDIR /app

RUN npm install --production