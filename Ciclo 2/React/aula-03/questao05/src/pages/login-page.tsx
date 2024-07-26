import { Form } from "../components/Form";
import { Modal } from "../components/Modal";

export function LoginPage() {
  const modalIsOpen = false;

  function formSubmitted() {
    alert("Na próxima aula, clicar aqui vai abrir o modal!");
  }

  return (
    <>
      {modalIsOpen && <Modal>{"Form enviado com sucesso !"}</Modal>}
      <h1>Login</h1>
      <Form onSubmit={formSubmitted} />
    </>
  );
}
