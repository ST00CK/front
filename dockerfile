FROM node:20.16.0

WORKDIR /frontend

COPY . .

RUN npm cache clean --force

RUN npm run postinstall

RUN npm install

CMD ["npm","run","dev"]