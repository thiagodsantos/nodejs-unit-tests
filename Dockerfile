FROM node:lts-slim

WORKDIR /app

RUN npm install -g typescript
RUN npm install -g ts-node

EXPOSE 4200