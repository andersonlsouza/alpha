import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from "./App";
// import reportWebVitals from "./reportWebVitals";

interface IUser {
  fistName: string;
  lastName: string;
  birthUser: string;
}

function formatName(user: IUser) {
  return user.fistName + " " + user.lastName;
}

function formatAge(user: IUser) {
  const year = new Date().getUTCFullYear();
  const yearBirth = new Date(user.birthUser).getUTCFullYear();

  return year - yearBirth;
}

const user: IUser = {
  fistName: "Anderson",
  lastName: "Lima",
  birthUser: "04/11/2000",
};

const element: JSX.Element = (
  <h1>
    Olá, meu nome completo é {formatName(user)}, tenho {formatAge(user)} ano(s)
    e este é meu primeiro contato com JSX.
  </h1>
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(element);
