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
    <>
      {modalIsOpen && (
        <Modal onClose={closeModal}>{"Form enviado com sucesso !"}</Modal>
      )}
      <h1>Login</h1>
      <Form onSubmit={formSubmitted} />
    </>
  );
}
