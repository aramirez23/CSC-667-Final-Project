FROM node:10-alpine

WORKDIR /main
COPY ./server/webrocket /main
COPY ./package.json /main
COPY ./package-lock.json /main
COPY ./tsconfig.json /main
COPY ./package-lock.json /main


RUN npm install
RUN npm update && \
  npm i -g typescript ts-node

EXPOSE 4004

CMD ["ts-node", "webrocket.ts"]
