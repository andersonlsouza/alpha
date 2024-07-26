// server.js
const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();

app.use("/", express.static("public"));

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const users = [];
const questions = [];
let idQuestions = 0;

function broadcast(data) {
  users.forEach((client) => {
    client.ws.send(data);
  });
}

function responseObj(type, message) {
  return JSON.stringify({ type, message })
}

wss.on("connection", (ws) => {
  ws.on("message", (message) => messageHandler(ws, message));
})

function messageHandler(ws, message) {
  const msg = JSON.parse(message);
  const msgData = msg.message;

  if (msg.type === "newUser") {

    if (!users.find(element => element.name === msgData)) {
      users.push({ ws, name: msgData });
      ws.send(responseObj("newUser", questions))
    } else {
      ws.send(responseObj("newUser", false))
    }
  }

  if (msg.type === "newQuestion") {
    const newQuestion = {
      id: idQuestions++,
      author: msgData.author,
      text: msgData.text,
      yes: 0,
      no: 0
    }

    questions.push(newQuestion);
    broadcast(responseObj("createdQuestion", newQuestion));
  }

  if (msg.type === "count") {
    questions.forEach((element) => {
      if (element.id === msgData.questionId) {
        const answer = msgData.answer;
        element[answer] += 1;

        const countObj = {
          questionId: element.id,
          answer,
          count: element[answer]
        }

        broadcast(responseObj("count", countObj));
      }
    })
  }
}

server.listen(3000, () => {
  console.log("Servidor ouvindo na porta 3000");
});
