## Nginx Router

Builds the reverse proxy which proxies traffic from {IP}:80 to wherever the backend/frontend app is running. This builds a Nginx dockerimage with the nginx.conf configuration which holds all the routing

## Docker Build
1. docker build -t pachecosf/nginx-proxy .
2. docker push pachecosf/nginx-proxy
