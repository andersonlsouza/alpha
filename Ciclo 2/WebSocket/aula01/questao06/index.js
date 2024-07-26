const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');

const app = express();

app.use("/", express.static("public"));

const httpServer = http.createServer(app);

const wss = new WebSocket.Server({ server: httpServer }); // wss = web socket server

let clients = [];

const randomName = {
  dictionaries: [adjectives, colors, animals],
  style: 'lowerCase'
};

wss.on("connection", (ws) => {

  ws.username = uniqueNamesGenerator(randomName);

  console.log(`Cliente ${ws.username} conectado`);
  clients.push(ws);

  clients.forEach(client => {
    if (client !== ws && client.readyState === WebSocket.OPEN) {
      client.send(`${ws.username} entrou`);
    }
  });

  ws.on("message", (message) => {
    clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(`${ws.username}: ${message}`);
      }
    });
  });

  ws.on("close", () => {
    clients = clients.filter(client => client !== ws);
    clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(`${ws.username} saiu`);
      }
    });
  });
});

httpServer.listen(3000, () => {
  console.log("Servidor ouvindo na porta 3000");
});
