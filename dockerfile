FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install
COPY ./src ./src
COPY tsconfig.json .
COPY .env .

RUN npm run build

CMD ["npm", "run", "start"]