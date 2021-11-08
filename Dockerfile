FROM node:current-slim

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm cache clean --force

CMD ["npm", "run", "dev"]