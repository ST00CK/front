FROM node:20.16.0-slim

WORKDIR /frontend

COPY . .

RUN mkdir -p /frontend/.expo && chmod -R 777 /frontend

RUN rm -rf node_modules && \
    npm cache clean --force && \
    npm install

ENV EXPO_HOME=/frontend/.expo
ENV HOME=/frontend

CMD ["npm","start"]