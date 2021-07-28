import redis from "redis";

//const redisHost = process.env.REDIS_HOST || 'localhost';
const redisHost = 'redis';
const client = redis.createClient({ host: redisHost });

const WebSocketServer = require("ws").Server;

const wss = new WebSocketServer({ path: '/webrocket', port: 4004 });

wss.on('connection', (ws: WebSocket) => {
  console.log('Someone has connected');
});

client.on('message', (channel:string, message:string) => {
  console.log(`subscriber hears message ${message}`);
  wss.clients.forEach((client: WebSocket) => {
    client.send(message);
  });
});

client.subscribe('messageAlert');
console.log('Server online');
