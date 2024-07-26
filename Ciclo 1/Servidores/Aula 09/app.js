const express = require("express");
const roteador = require("./roteador.js")

const porta = 3000;

const app = express();
app.use(express.json());
app.use(roteador);

app.listen(porta, () => {
    console.log(`Servidor funcionando na porta: ${porta}`);
});