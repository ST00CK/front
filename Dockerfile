FROM node:20.16.0-slim

WORKDIR /frontend

COPY . .

RUN mkdir -p /frontend/.expo && chmod -R 777 /frontend

ENV EXPO_HOME=/frontend/.expo
ENV HOME=/frontend

RUN npm ci

CMD ["npm","start"]