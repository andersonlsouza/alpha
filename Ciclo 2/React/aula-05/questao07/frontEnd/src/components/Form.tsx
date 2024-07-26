import { useState } from "react";

interface PropTypes {
  onSubmit: (email: string, password: string) => void;
}

export function Form({ onSubmit }: PropTypes) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <p>Email</p>
      <input type="email" onChange={(event) => setEmail(event.target.value)} />
      <p>Senha</p>
      <input
        type="password"
        onChange={(event) => setPassword(event.target.value)}
      />
      <br />
      <button onClick={() => onSubmit(email, password)}>Enviar</button>
    </form>
  );
}
