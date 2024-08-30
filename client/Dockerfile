FROM node:22-alpine

WORKDIR /App

COPY package*.json ./
RUN npm i

COPY . .

CMD ["npm","run","dev"]
