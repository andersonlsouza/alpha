import { useState } from "react";
import { LoginPage } from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";
import { UserContext } from "./contexts/Context";
import { Route, Routes } from "react-router-dom";
import { SignUpPage } from "./pages/SignUpPage";
import { UpdatePage } from "./pages/UpdatePage";

export interface IUser {
  id: string;
  email: string;
}

export function App() {
  const [user, setUser] = useState<IUser | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/register" element={<SignUpPage />} />
        <Route path="/update" element={<UpdatePage />} />
      </Routes>
    </UserContext.Provider>
  );
}
