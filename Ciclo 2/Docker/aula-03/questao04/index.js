const express = require("express");

const PORT = 3000;

const HOST = "0.0.0.0";

const app = express();

app.use(express.static("public"));

app.listen(PORT, HOST);
