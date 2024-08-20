FROM --platform=linux/amd64 node:21.3.0-alpine3.18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm", "start" ]
