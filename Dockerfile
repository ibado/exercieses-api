FROM node:15.5.0-alpine3.10

WORKDIR app/

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]
