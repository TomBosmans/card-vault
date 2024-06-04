FROM node:22-alpine
WORKDIR /backend
EXPOSE 3100

RUN npm install -g npm@latest
RUN apk add --no-cache postgresql-client

CMD ["npm", "run", "start:dev"]
