FROM node:21-alpine3.18

WORKDIR /backend

COPY . .

RUN npm install

CMD ["node","index.js"]

EXPOSE 8000