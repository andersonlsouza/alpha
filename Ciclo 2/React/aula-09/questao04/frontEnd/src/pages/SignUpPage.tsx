import { useContext } from "react";
import { UserContext } from "../contexts/Context";
import { Form } from "../components/Form";
import { UseModal } from "../components/Modal";
import { useNavigate } from "react-router-dom";

const port = 8000;

export function SignUpPage() {
  const { setUser } = useContext(UserContext);
  const [EasyModal, openModal] = UseModal();
  const navigate = useNavigate();

  function formSubmitted(email: string, password: string) {
    fetch(`http://localhost:${port}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ name: "default", email, password }),
    })
      .then((res) => {
        if (!res.ok) {
          throw console.error("User was not registered");
        }
        return res.json();
      })
      .then((resApi) => {
        setUser({ id: resApi.data.id, email: resApi.data.email });
        navigate("/");
      })
      .catch(() => openModal());
  }
  return (
    <>
      <h3>Novo Usuário</h3>
      <Form onSubmit={formSubmitted} />
      <EasyModal />
    </>
  );
}
