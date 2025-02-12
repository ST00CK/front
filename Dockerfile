FROM node:20.16.0-slim

WORKDIR /frontend

COPY . .

RUN mkdir -p /frontend/.expo && chmod -R 777 /frontend

ENV EXPO_HOME=/frontend/.expo
ENV HOME=/frontend

RUN rm -rf node_modules package-lock.json && \
    npm cache clean --force && \
    npm ci

CMD ["npm","start"]