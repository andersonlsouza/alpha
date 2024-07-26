import { useState } from "react";
import { LoginPage } from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";
import { UserContext } from "./contexts/Context";

export interface IUser {
  id: string;
  email: string;
}

export function App() {
  const [page, setPage] = useState("LoginPage");
  const [user, setUser] = useState<IUser | null>(null);

  function handlePage(page: string) {
    setPage(page);
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {page === "LoginPage" ? <LoginPage onPage={handlePage} /> : <HomePage />}
    </UserContext.Provider>
  );
}
