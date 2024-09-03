FROM node:22-alpine

WORKDIR /App

COPY package*.json ./
RUN npm i
RUN npm i redis

COPY . .

CMD ["node","main.js"]
