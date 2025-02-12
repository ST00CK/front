FROM node:20.16.0-slim

USER root

WORKDIR /frontend

COPY . .

RUN npm cache clean --force

RUN npm install

CMD ["npm","start"]
