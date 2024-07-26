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

  function renderForm() {
    return (
      <div className="box-form">
        <h1>Login</h1>
        <Form onSubmit={formSubmitted} />
      </div>
    )    
  }

  function renderModal () {
    if (!modalIsOpen) return;

    return (
      <Modal onClose={closeModal}>{"Formulário enviado com sucesso !"}</Modal>
    );
  }

  return (
    <div className="box-form-background">
      {renderForm()}
      {renderModal()}
    </div>
  );
}
