const express = require("express");
const cookieParser = require("cookie-parser");
const router = require("./backEnd/router.js");

const porta = 3000;

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.static("./frontEnd"));
app.use(router);

// Escuta do servidor
app.listen(porta, () => {
    console.log(`Servidor funcionando na porta: ${porta}`);
});