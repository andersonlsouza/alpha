import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

interface Cart {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: { rate: number; count: number };
  title: string;
}

function App() {
  const balance = 30;

  const [products, setProduct] = useState<Cart[]>([]);

  useEffect(() => {
    getCart();
  }, []);

  async function getCart() {
    try {
      const res = await fetch("https://fakestoreapi.com/products?limit=5");
      if (!res.ok) {
        throw console.error("Erro na requisição");
      }
      const data = await res.json();
      setProduct(data);
    } catch (error) {
      console.error(error);
    }
  }

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
              {item.title}
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
