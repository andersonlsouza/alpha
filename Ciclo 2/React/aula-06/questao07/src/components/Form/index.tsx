import { useState } from "react";
// import React from "react";

import * as S from "./styled";
import Button from "@mui/material/Button";

interface PropTypes {
  onSubmit: (email: string, password: string) => void;
}

export function Form({ onSubmit }: PropTypes) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <S.Container>
      <form onSubmit={(event) => event.preventDefault()}>
        <p>Email</p>
        <input
          type="email"
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Insira um e-mail"
        />
        <p>Senha</p>
        <input
          type="password"
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Insira uma senha"
        />
        <Button onClick={() => onSubmit(email, password)} variant="contained">
          Enviar
        </Button>
      </form>
    </S.Container>
  );
}
