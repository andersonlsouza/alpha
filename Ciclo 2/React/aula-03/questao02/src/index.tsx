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
    { id: 112, name: "torneira", price: 5 },
  ];
  const balance = 30;

  const product = cart.map((item) => <li>{item.name}</li>);

  return (
    <>
      <h1>Meu Carrinho</h1>
      <ul>{product}</ul>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <App />
);
