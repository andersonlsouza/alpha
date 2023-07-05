import { useState } from "react";
import { Form } from "../components/Form";
import { Modal } from "../components/Modal";

const port = 8000;

interface PropTypes {
  onPage: (page: "LoginPage" | "HomePage") => void;
}

export function LoginPage({ onPage }: PropTypes) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function formSubmitted(email: string, password: string) {
    fetch(`http://localhost:${port}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((res) => {
        if (!res.ok) {
          throw console.error("User is not register");
        }
        return res.json();
      })
      .then(() => onPage("HomePage"))
      .catch(() => setModalIsOpen(true));
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <>
      <h1>Login</h1>
      <Form onSubmit={formSubmitted} />
      {modalIsOpen && (
        <Modal onClose={closeModal}>{"Usuário não cadastrado !"}</Modal>
      )}
    </>
  );
}
