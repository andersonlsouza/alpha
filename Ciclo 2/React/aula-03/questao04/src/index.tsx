import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from "./App";
// import reportWebVitals from "./reportWebVitals";
// import { LoginPage } from "./login-page";

function App() {
  const cart = [
    { id: 20113, name: "sabonete", price: 3 },
    { id: 1214, name: "creme dental", price: 10 },
    { id: 55543, name: "espelho", price: 15 },
    { id: 112, name: "torneira", price: 5 },
  ];
  const balance = 30;

  let sum: number = 0;
  const product = cart.map((item, key) => {
    sum += item.price;
    return (
      <li key={key}>
        {item.name}
        <button
          onClick={() => alert(`O produto com id ${item.id} foi removido`)}
        >
          remover
        </button>
      </li>
    );
  });

  return (
    <>
      <h1>Meu Carrinho</h1>
      {balance < sum && <p>Saldo insuficiente</p>}
      <ul>{product}</ul>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <App />
);
