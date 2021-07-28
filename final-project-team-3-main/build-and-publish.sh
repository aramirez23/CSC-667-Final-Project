#!/bin/bash
docker build -f ./devops/shockwave.Dockerfile -t pachecosf/shockwave .
docker push pachecosf/shockwave

docker build -f ./devops/nginx-proxy.Dockerfile -t pachecosf/nginx-proxy .
docker push pachecosf/nginx-proxy

docker build -f ./devops/frontfunkyend.Dockerfile -t pachecosf/frontfunkyend .
docker push pachecosf/frontfunkyend

docker build -f ./devops/webrocket.Dockerfile -t pachecosf/webrocket .
docker push pachecosf/webrocket
