// url lida dinamicamente para funcionar sempre
const socket = new WebSocket("ws://localhost:3000");

socket.onopen = function (e) {
  console.log("[open] Connection established");
};

socket.onmessage = function (event) {
  const msg = JSON.parse(event.data);
  const messagePanel = document.getElementById("message-panel");
  messagePanel.innerHTML += `<p>[${msg.type}] <strong>${msg.message}</strong></p>`;
  messagePanel.scrollTop = messagePanel.scrollHeight;
  if (msg.type === "gameStarted") {
    document.getElementById("bet-box").style.display = "block";
  }
};

socket.onerror = function (error) {
  console.log(`[error] ${error.message}`);
};

socket.onclose = function () {
  const messagePanel = document.getElementById("message-panel");
  messagePanel.innerHTML += `<p>[close] <strong>Conexão fechada. Recarregue a página</strong></p>`;
};

document.getElementById("place-bet").addEventListener("click", function () {
  const numberBet = Number(document.getElementById("number-bet").value);
  const parityBet = document.getElementById("parity-bet").value;

  socket.send(JSON.stringify({ type: "bet", numberBet, parityBet }));
});
