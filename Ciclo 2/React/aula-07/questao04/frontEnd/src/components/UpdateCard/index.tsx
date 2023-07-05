import { useContext, useState } from "react";
import { UserContext } from "../../contexts/Context";
import { Form } from "../Form";
import { Modal } from "../Modal";

const port = 8000;

export function UpdateCard() {
  const { setUser } = useContext(UserContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function closeModal() {
    setModalIsOpen(false);
  }

  function formSubmitted(email: string, password: string) {
    fetch(`http://localhost:${port}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ name: "default", email, password }),
    })
      .then((res) => {
        if (!res.ok) {
          throw console.error("User is not patch register");
        }
        return res.json();
      })
      .then((resApi) => {
        setUser({ id: resApi.data.id, email: resApi.data.email });
      })
      .catch(() => setModalIsOpen(true));
  }
  return (
    <div style={{ border: "1px solid black", padding: "10px", margin: "10px" }}>
      <h3>Atualizar</h3>
      <Form onSubmit={formSubmitted} />
      {modalIsOpen && (
        <Modal onClose={closeModal}>{"Erro na submissão do formulário"}</Modal>
      )}
    </div>
  );
}
