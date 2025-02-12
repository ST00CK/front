FROM node:20.16.0-slim

WORKDIR /frontend

COPY package.json package-lock.json ./

RUN npm ci --only=production

RUN mkdir -p /frontend/.expo && chmood -R 777 /frontend/.expo

CMD ["npm","start"]
