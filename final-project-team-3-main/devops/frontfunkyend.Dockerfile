FROM node:13.12.0-alpine

WORKDIR /app
COPY ./public /app/public
COPY ./src /app/src
COPY ./package.json /main
COPY ./package-lock.json /main
# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent

# add app
COPY ./src ./main/src
RUN npm install

EXPOSE 3000
# start app
CMD ["npm", "start"]
