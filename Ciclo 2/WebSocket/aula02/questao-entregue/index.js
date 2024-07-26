const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();

app.use("/", express.static("public"));

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const clients = [];
const questions = [];
let questionIdGeneral = 0;

function broadcastMessage(message) {
  clients.forEach((client) => {
    client.send(message);
  });
}

wss.on("connection", (ws) => {
  clients.push(ws);

  ws.on("message", (message) => {
    try {
      const parsedMessage = JSON.parse(message);

      if (parsedMessage.type === 'enter') {
        const { username } = parsedMessage;

        if (clients.find(client => client.username === username)) {
          ws.send(JSON.stringify({
            type: 'enter_error',
            error: 'O username já está sendo usado por outro cliente.'
          }));
        } else {
          ws.username = username;
          ws.send(JSON.stringify({
            type: 'enter_success',
            questions: questions
          }));
          ws.send(JSON.stringify({
            type: 'question_list',
            questions: questions
          }));
        }
      } else if (parsedMessage.type === 'create_question') {
        questionIdGeneral++;

        const questionObj = {
          questionId: questionIdGeneral,
          username: ws.username,
          question: parsedMessage.question,
          yesNum: 0,
          noNum: 0
        };

        questions.push(questionObj);

        broadcastMessage(JSON.stringify({
          type: 'question_created',
          question: questionObj
        }));
      } else if (parsedMessage.type === 'vote_question') {
        const updateQuestion = questions.find((question) => question.questionId === parsedMessage.questionId);
        if (updateQuestion) {
          if (parsedMessage.answer == 'yes') {
            updateQuestion.yesNum++;
            updateQuestion.answer = 'yes'
          } else if (parsedMessage.answer == 'no') {
            updateQuestion.noNum++;
            updateQuestion.answer = 'no'
          }

          broadcastMessage(JSON.stringify({
            type: 'question_voted',
            question: updateQuestion
          }));
        }
      }
    } catch (error) {
      console.error("Erro ao processar a mensagem:", error);
    }
  })
  ws.on("close", () => {
    const index = clients.indexOf(ws);
    if (index !== -1) {
      clients.splice(index, 1);
    }

    delete ws.username;
  });
});

server.listen(3000, () => {
  console.log("Servidor ouvindo na porta 3000");
})
