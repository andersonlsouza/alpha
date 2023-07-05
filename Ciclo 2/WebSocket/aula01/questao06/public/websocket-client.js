// não importa o path: /, /x, /y
const ws = new WebSocket("ws://localhost:3000");

const button = document.querySelector("button");
const input = document.querySelector("input");
const messages = document.querySelector("div");

ws.onmessage = (event) => {
  console.log(event)
  const message = document.createElement('p');
  message.textContent = event.data;
  messages.appendChild(message);
};

button.addEventListener('click', () => {
  ws.send(input.value);
  input.value = '';
});