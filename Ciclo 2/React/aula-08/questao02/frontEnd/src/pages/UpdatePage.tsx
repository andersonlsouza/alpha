import { useContext, useState } from "react";
import { UserContext } from "../contexts/Context";
import { Form } from "../components/Form";
import { Modal } from "../components/Modal";
import { Navigate, useNavigate } from "react-router-dom";

const port = 8000;

export function UpdatePage() {
  const { user, setUser } = useContext(UserContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();

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
        navigate("/home");
      })
      .catch(() => setModalIsOpen(true));
  }
  return (
    <div style={{ border: "1px solid black", padding: "10px", margin: "10px" }}>
      {!user && <Navigate to="/" replace={true} />}
      <h3>Atualizar</h3>
      <Form onSubmit={formSubmitted} />
      {modalIsOpen && (
        <Modal onClose={closeModal}>{"Erro na submissão do formulário"}</Modal>
      )}
    </div>
  );
}
