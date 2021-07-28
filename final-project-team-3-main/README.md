# docker swarm app

We'll deal with docker swarm later ^

# How to Guides
## Guide For Windows Frontend and Backend development
1. Go to ./just-datastores-docker-compose 
2. docker-compose up (this just starts mongo and redis)
3. Got to ./server/backend/service/DbAccess.ts
4. Edit the comments to use the windows urls
5. Go to ./server/backend/
6. ts-node ./BackendServer.ts
7. new terminal 
8. npm start

## How to work on the frontend
1. Get the backend up and running
2. cd to devops
3. docker-compose pull
4. docker-compose up
5. cd to root project folder
6. npm start, when it asks you if you want to use a different port say yes 
7. you can now edit any source files and it the requests will route to the backend

## How to work on the backend
1. Edit the docker-compose.yml file
2. Comment out the service shockwave
3. docker-compose pull
4. docker-compose up
5. Make sure you have ts-node installed
6. cd to server/backend and `ts-node BackendServer.ts`

## Nginx routing
* I've configured the project to use an nginx proxy instead of the express gateway
* To view the nginx configurations go to ./nginx/nginx.conf
* What it does: I use it for port configuration. For example anything routed to localhost:80/backend will route to localhost:8080/backend
* Note port 80 is the http port, this will allow us to have multiple microservices running on different ports and be able to proxy to them correctly on an AWS box
* To add a configuration, we need to build a new nginx image

## Backend Login Register work I've done
* So far I've made a simple express server in server/backend
* I've dockerized it and pushed it to pachecosf/shockwave
* I've configured the docker-compose yaml so you should be able to
1. cd into ./devops
2. docker-compose pull
3. docker-compose up
4. Verify backend is working by running either ./TestRequests/testLoginCurl.sh or ./TestRequests/testRegisterCurl.sh 
