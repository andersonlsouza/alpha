import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Contador } from "./components/Contador";

function Eco(x: any) {
  console.log(x);
  return x;
}

function App() {
  const [list, setList] = useState([
    { id: 1, name: "terra" },
    { id: 2, name: "lua" },
    { id: 3, name: "marte" },
  ]);

  function removeCount(idCount: number) {
    setList(list.filter((count) => count.id !== idCount));
  }

  return Eco(
    <>
      <h1>Contadores</h1>
      <ul>
        {list.map((itemList, index) => (
          <Contador
            key={index}
            onRemove={() => removeCount(itemList.id)}
            name={itemList.name}
          />
        ))}
      </ul>
    </>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);

reportWebVitals();
