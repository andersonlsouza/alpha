const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();

app.use("/", express.static("public"));

const httpServer = http.createServer(app);

const wss = new WebSocket.Server({ server: httpServer }); // wss = web socket server

/**
 * @type {Array<WebSocket>}
 *
 * Haverá 2 elementos, que serão o socket de cada jogador
 */
let players = [];

/**
 * @type {Array<WebSocket>}
 *
 * Poderá haver 0 ou mais elementos, um para cada cliente que entrar após o segundo
 * jogador (será considerado "espectador" automaticamente)
 */
let spectators = [];

/**
 * @type {Array<{numberBet: number, parityBet: "even" | "odd"} | null>}
 *
 * `null` quer dizer que o jogador não palpitou ainda. Caso contrário,
 * será {numberBet, parityBet} indicando o número e a paridade palpitadas
 */
let playerBets = [null, null];

// manda a mesma mensagem para todos os sockets da lista `players` e `spectators`
function broadcast(data) {
  const clients = [...players, ...spectators];
  clients.forEach((client) => client.send(JSON.stringify(data)));
}

// verifica se o socket está na lista `players`
function isPlayer(ws) {
  return players.includes(ws);
}

// verifica se o socket está na lista `spectators`
function isSpectator(ws) {
  return spectators.includes(ws);
}

// verifica o índice (0 ou 1) do socket na lista `players`
function getPlayerIndex(ws) {
  if (!isPlayer(ws)) {
    throw new Error("socket is not a player");
  }

  return players.indexOf(ws);
}

// fecha todas as conexões websocket e limpa as listas de sockets e palpites
function resetGame() {
  players.forEach((socket) => socket.close());
  spectators.forEach((socket) => socket.close());
  players = [];
  spectators = [];
  playerBets = [null, null];
}

wss.on("connection", (ws) => {
  // ainda não havia jogadores suficientes
  if (players.length === 0) {
    players.push(ws);
    broadcast({ type: "playerEntered", message: "Jogador 1 entrou" });
  }
  // já havia 1 jogador
  else if (players.length === 1) {
    players.push(ws);
    broadcast({ type: "playerEntered", message: "Jogador 2 entrou" });
    broadcast({ type: "gameStarted", message: "Jogo começou" });
  }
  // já havia todos os 2 jogadores
  else {
    spectators.push(ws);
    broadcast({ type: "spectatorEntered", message: "Um espectador entrou" });

    // informar ao espectador qual o estado atual do jogo (quais jogadores já palpitaram)
    if (playerBets[0] === null && playerBets[1] === null) {
      ws.send(
        JSON.stringify({
          type: "situation",
          message: "Esperando palpites dos 2 jogadores",
        })
      );
    } else if (playerBets[0] === null && playerBets[1] !== null) {
      ws.send(
        JSON.stringify({
          type: "situation",
          message: "Esperando palpite do jogador 1",
        })
      );
    } else if (playerBets[0] !== null && playerBets[1] === null) {
      ws.send(
        JSON.stringify({
          type: "situation",
          message: "Esperando palpite do jogador 2",
        })
      );
    }
    // else { }
    // impossível que ambos os jogadores tenham já palpitado, porque aí o jogo já teria terminado
    // e não haveria 2 jogadores no array `players` (pois o servidor limpa as listas de socket
    // quando o jogo termina)
  }

  // configurar duas funções para lidar com mensagem e fechamento de conexão
  ws.on("message", (message) => messageHandler(ws, message));
  ws.on("close", () => closeHandler(ws));
});

/**
 * @param {WebSocket} ws
 * @param {any} message
 */
function messageHandler(ws, message) {
  const msg = JSON.parse(message);

  // espectadores não podem enviar mensagens
  if (isSpectator(ws)) {
    return;
  }

  // mensagem não reconhecida
  if (
    msg.type !== "bet" ||
    typeof msg.numberBet !== "number" ||
    (msg.parityBet !== "even" && msg.parityBet !== "odd")
  ) {
    ws.send(
      JSON.stringify({
        type: "badMessage",
        message: `Mensagem não reconhecida, a mensagem foi: ${JSON.stringify(
          msg
        )}`,
      })
    );
    return;
  }

  // jogo ainda não começou
  if (players.length < 2) {
    ws.send(
      JSON.stringify({
        type: "gameNotStarted",
        message: `Jogo ainda não iniciou, palpite não aceito`,
      })
    );
    return;
  }

  // processar o palpite do jogador

  // 0 ou 1
  const playerIndex = getPlayerIndex(ws);

  const playerBet = playerBets[playerIndex];

  // já deu palpite, ignorar porque não pode palpitar de novo
  if (playerBet !== null) {
    ws.send(
      JSON.stringify({
        type: "duplicateBet",
        message: "Tentou palpitar de novo, ignorado",
      })
    );
    return;
  }

  // não palpitou antes, computar palpite e avisar a todos
  playerBets[playerIndex] = {
    numberBet: msg.numberBet,
    parityBet: msg.parityBet,
  };
  broadcast({
    type: "newBet",
    // 1 ou 2
    message: `Jogador ${playerIndex + 1} palpitou`,
  });

  // se o jogo ainda não acabou, não precisa de mais nada
  if (playerBets[0] === null || playerBets[1] === null) {
    return;
  }

  // o jogo acabou (jogador foi o último a palpitar).
  // Computar vencedores e avisar a todos
  const number1 = playerBets[0].numberBet;
  const number2 = playerBets[1].numberBet;
  const total = number1 + number2;
  const parity = total % 2 === 0 ? "even" : "odd";

  const player1IsRight = playerBets[0].parityBet === parity;
  const player2IsRight = playerBets[1].parityBet === parity;

  if (player1IsRight && player2IsRight) {
    broadcast({
      type: "gameEnded",
      message: `Os números foram ${number1} e ${number2}. Os dois jogadores acertaram a paridade`,
    });
  } else if (player1IsRight && !player2IsRight) {
    broadcast({
      type: "gameEnded",
      message: `Os números foram ${number1} e ${number2}. Somente o jogador 1 acertou a paridade`,
    });
  } else if (!player1IsRight && player2IsRight) {
    broadcast({
      type: "gameEnded",
      message: `Os números foram ${number1} e ${number2}. Somente o jogador 2 acertou a paridade`,
    });
  } else {
    // ambos erraram
    broadcast({
      type: "gameEnded",
      message: `Os números foram ${number1} e ${number2}. Os dois jogadores erraram a paridade`,
    });
  }

  resetGame();
}

/**
 * @param {WebSocket} ws
 */
function closeHandler(ws) {
  // jogador saiu, perde automaticamente
  if (isPlayer(ws)) {
    const playerIndex = getPlayerIndex(ws);
    broadcast({
      type: "gameEnded",
      message: `Jogador ${playerIndex} saiu, o jogo acabou.`,
    });
    resetGame();
  }
  // espectador saiu
  else if (isSpectator(ws)) {
    broadcast({
      type: "spectatorExit",
      message: "Um espectador saiu",
    });
  }
  // se não está em nenhum array (players ou spectators), deve ser um jogador do jogo anterior
  // que já acabou. Ignorar.
}

httpServer.listen(3000, () => {
  console.log("Servidor ouvindo na porta 3000");
});
