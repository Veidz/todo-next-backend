FROM node:alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN tsc

CMD ["npm", "start"]
