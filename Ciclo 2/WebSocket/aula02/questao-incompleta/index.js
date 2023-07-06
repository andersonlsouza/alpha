// server.js
const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();

app.use("/", express.static("public"));

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const username = [];
let users = [];

function broadcast(data) {
  users.forEach((client) => {
    client.send(data);
  });
}

wss.on("connection", (ws) => {
  // console.log(ws);
  ws.on("message", (mensage) => {
    broadcast({ type: "playerEntered", message: "Jogador 1 entrou" })
  });
  // ws.onmessage = () => {}
})

server.listen(3000, () => {
  console.log("Servidor ouvindo na porta 3000");
});
