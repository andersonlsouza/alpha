import { useState } from "react";
import { LoginPage } from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";

export function App() {
  const [page, setPage] = useState("LoginPage");

  function handlePage(page: string) {
    setPage(page);
  }

  return page === "LoginPage" ? (
    <LoginPage onPage={handlePage} />
  ) : (
    <HomePage />
  );
}
