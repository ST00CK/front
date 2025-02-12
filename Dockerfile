FROM node:20.16.0-slim

WORKDIR /frontend

COPY package.json package-lock.json ./

RUN npm ci --only=production

COPY . .

RUN mkdir -p /frontend/.expo

CMD ["npm","start"]