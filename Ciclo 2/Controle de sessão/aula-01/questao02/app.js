const express = require("express");
const cookieParser = require("cookie-parser");
const roteador = require("./roteador.js");

const porta = 3000;

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(roteador);
app.use(express.static("./public"));

// Escuta do servidor
app.listen(porta, () => {
    console.log(`Servidor funcionando na porta: ${porta}`);
});