const { Router } = require('express');
const { mainPage, login, logout, system, dataLogin, getUsers, postUsers } = require("./controlers/control.js");
const { authMiddleware, isAdmin } = require("./controlers/middleware.js");

const roter = Router();

// Rota para página inicial
roter.get("/", mainPage);

// Rota para página de dados do usuário comum
roter.get("/login",authMiddleware, login);

// Rotas para autenticação do usuário
roter.get("/system", authMiddleware, dataLogin);
roter.post("/system", system);

// Rotas privilegiadas do admininstrador
roter.get("/users", authMiddleware, isAdmin, getUsers);
roter.post("/users", authMiddleware, isAdmin, postUsers);

// Rota para limpeza dos cookies
roter.post("/logout", logout);

module.exports = roter;