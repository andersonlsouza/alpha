/* eslint-disable @typescript-eslint/no-use-before-define */

import { useEffect, useState, useMemo } from "react";
import "./styles.css";

/**
 * 1: Componentes da aplicação (EmailList e App)
 * ===========================================
 */

interface EmailListProps {
  theme: string;
}

function EmailList({ theme }: EmailListProps) {
  const [filter, setFilter] = useState("");
  const [emails, setEmails] = useState<string[]>([]);

  // escreva seu código somente abaixo deste comentário

  const filteredEmails = useMemo(() => filterList(emails, filter), [emails, filter]);

  // escreva seu código somente acima deste comentário

  useEffect(() => {
    fetch("/mock-data.json")
      .then((res) => res.json())
      .then((emails) => setEmails(emails));
  }, []);

  return (
    <div
      style={{
        backgroundColor:
          theme === "dark" ? "black" : "white",
        color: theme === "dark" ? "white" : "black",
        padding: "20px"
      }}
    >
      Filtro (digite):
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <ul>
        {filteredEmails.map((email) => (
          <li>{email}</li>
        ))}
      </ul>
    </div>
  );
}

export default function App() {
  const [theme, setTheme] = useState("dark");

  return (
    <div className="App">
      <button
        onClick={() =>
          theme === "dark"
            ? setTheme("light")
            : setTheme("dark")
        }
      >
        Trocar tema
      </button>
      <EmailList theme={theme} />
    </div>
  );
}

/**
 * 2: Funções utilitárias
 * ===========================================
 */

/**
 * Não mexa nesta função. Ela tem um delay interno
 * proposital para simular uma operação que demanda
 * tempo
 *
 * Recebe uma lista de strings e um termo de busca.
 *
 * Retorna uma nova lista que só inclui as strings
 * que atendem ao termo de busca. Não modifica
 * a lista de entrada
 */
function filterList(list: string[], filter: string) {
  let startTime = performance.now();
  while (performance.now() - startTime < 500) {
    // Do nothing for 500 ms to emulate extremely slow code
  }

  const result: string[] = [];
  for (let i = 0; i < list.length; i++) {
    if (
      list[i].toLowerCase().includes(filter.toLowerCase())
    ) {
      result.push(list[i]);
    }
  }

  return result;
}
