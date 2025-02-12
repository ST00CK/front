FROM node:20.16.0-slim

WORKDIR /frontend

COPY package.json package-lock.json ./

RUN npm ci --only=production

RUN mkdir -p /frontend/.expo && chmod -R 777 /frontend/.expo

USER node

CMD ["npm","start"]
