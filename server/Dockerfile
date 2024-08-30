FROM node:22-alpine

WORKDIR /App

COPY package.json ./
RUN npm install

COPY . .

CMD ["node","main.js"]

EXPOSE 5000
