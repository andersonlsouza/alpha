const { Router } = require('express');
const { listarUsuarios, apenasUmUsuario, adicionarUsuario, editarUsuario, deletarUsuario } = require("./controladores/controlers.js");

const roteador = Router();

roteador.get("/", (req, res) => res.send("Página de início"));
roteador.get("/usuarios", listarUsuarios);
roteador.get("/usuarios/:id", apenasUmUsuario);
roteador.post("/usuarios", adicionarUsuario);
roteador.patch("/usuarios/:id", editarUsuario);
roteador.delete("/usuarios/:id", deletarUsuario);

module.exports = roteador;