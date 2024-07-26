// import { useState } from "react";
import { Form } from "../components/Form";
import { UseModal } from "../components/Modal";
import { useContext } from "react";
import { UserContext } from "../contexts/Context";
import { Link, useNavigate } from "react-router-dom";

const port = 8000;

export function LoginPage() {
  const [EasyModal, openModal] = UseModal();
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  function formSubmitted(email: string, password: string) {
    fetch(`http://localhost:${port}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        if (!res.ok) {
          throw console.error("User is not register");
        }
        return res.json();
      })
      .then((resApi) => {
        setUser({ id: resApi.data.id, email: resApi.data.email });
        navigate("/home");
      })
      .catch(() => openModal());
  }

  return (
    <div style={{ border: "1px solid black", padding: "10px", margin: "10px" }}>
      <h1>Login</h1>
      <Form onSubmit={formSubmitted} />
      <EasyModal />
      <Link to="/register">Cadastre-se</Link>
    </div>
  );
}
