FROM node:22-alpine
WORKDIR /docs
EXPOSE 3000/tcp

RUN npm install -g docsify-cli@latest

CMD ["docsify", "serve", "."]
