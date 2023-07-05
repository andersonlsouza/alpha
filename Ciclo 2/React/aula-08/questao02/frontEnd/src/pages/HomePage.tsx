import { Link, Navigate } from "react-router-dom";
import { ProfileCard } from "../components/ProfileCard";
import { useContext } from "react";
import { UserContext } from "../contexts/Context";

export function HomePage() {
  const { user } = useContext(UserContext);

  return (
    <>
      {!user && <Navigate to="/" replace={true} />}
      <h1>Home: sua página logada</h1>
      <ProfileCard />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Link to="/update">Atualizar cadastro</Link>
        <Link to="/">Sair</Link>
      </div>
    </>
  );
}
