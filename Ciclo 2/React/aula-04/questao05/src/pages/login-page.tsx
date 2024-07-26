import "./login-page.css";

import { useState } from "react";
import { Form } from "../components/Form";
import { Modal } from "../components/Modal";

export function LoginPage() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function formSubmitted() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <div className="box-form-background">
      <div className="box-form">
        <h1>Login</h1>
        <Form onSubmit={formSubmitted} />
      </div>
      {modalIsOpen && (
        <Modal onClose={closeModal}>{"Formulário enviado com sucesso !"}</Modal>
      )}
    </div>
  );
}
