import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

function App() {
  const cart = [
    { id: 20113, name: "sabonete", price: 3 },
    { id: 1214, name: "creme dental", price: 10 },
    { id: 55543, name: "espelho", price: 15 },
    { id: 112, name: "torneira", price: 5 },
  ];
  const balance = 30;
  const [products, setProduct] = useState(cart);

  function removeProduct(id: number) {
    setProduct(products.filter((product) => product.id !== id));
  }

  let sum: number = 0;
  return (
    <>
      <h1>Meu Carrinho</h1>
      {balance < sum && <p>Saldo insuficiente</p>}
      <ul>
        {products.map((item, key) => {
          sum += item.price;
          return (
            <li key={key}>
              {item.name}
              <button onClick={() => removeProduct(item.id)}>remover</button>
            </li>
          );
        })}
      </ul>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <App />
);
