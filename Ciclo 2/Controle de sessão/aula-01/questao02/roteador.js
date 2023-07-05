const { Router } = require('express');
const { mainPage, login, logout, system, dataLogin } = require("./controlers/control.js");

const roteador = Router();

roteador.get("/", mainPage);
roteador.get("/login", login);
roteador.get("/system", dataLogin);
roteador.post("/system", system);
roteador.post("/logout", logout);

module.exports = roteador;