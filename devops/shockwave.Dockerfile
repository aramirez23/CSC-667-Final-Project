FROM node:10-alpine

WORKDIR /main
COPY ./server/backend /main
COPY ./package.json /main
COPY ./package-lock.json /main
COPY ./tsconfig.json /main
COPY ./package-lock.json /main


RUN npm install
RUN npm update && \
  npm i -g typescript ts-node

EXPOSE 8080

CMD ["ts-node", "BackendServer.ts"]
