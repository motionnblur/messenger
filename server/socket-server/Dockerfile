FROM node:22-alpine

WORKDIR /App

COPY package*.json ./
RUN npm i
RUN npm i redis
RUN npm i express

COPY . .

CMD ["node","main.js"]
