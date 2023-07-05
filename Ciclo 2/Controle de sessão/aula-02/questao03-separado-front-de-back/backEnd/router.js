const { Router } = require('express');
const { getMain, logout, system, dataUser, postUsers } = require("./controlers/control.js");
const { authMiddleware, isAdmin } = require("./controlers/middleware.js");

const router = Router();

// Rota para página inicial
router.get("/login", authMiddleware, isAdmin, getMain);


// Rotas para autenticação do usuário
router.get("/system", authMiddleware, dataUser);
router.post("/system", system);

// Rotas privilegiadas do admininstrador
router.post("/users", authMiddleware, isAdmin, postUsers);

// Rota para limpeza dos cookies
router.post("/logout", logout);

module.exports = router;