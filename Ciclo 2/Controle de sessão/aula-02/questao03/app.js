const express = require("express");
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const roter = require("./roter.js");

const port = 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());

app.use(express.json());

app.use(roter);
app.use(express.static("./public"));

// Escuta do servidor
app.listen(port, () => {
    console.log(`Servidor funcionando na port: ${port}`);
});