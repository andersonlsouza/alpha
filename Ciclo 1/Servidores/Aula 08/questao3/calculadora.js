// const express = require("express");

// const app = express();
// const porta = process.env.PORT;

// app.get('/', (req, res) => {
//     res.send("CFB Cursos")
// })

// app.get('/canal', (req, res) => {
//     res.json({canal: 'CFB Cursos'})
// })

// servidor.listen(porta || 3000, () => {console.log("Servidor rodando")});

const express = require("express");

const app = express();

const porta = process.env.PORT;
const host = "192.1681.5";

app.get('/', () => {
    res.send("Teste");
})

app.get('/calculador/soma/:valor1/:valor2', (req, res) => {
    const result = Number(req.params.valor1) + Number(req.params.valor2);
    console.log(result);
    res.send("O resultado é "+ result);
})

app.listen(porta || 3000, host, () => {console.log(`Servidor rodando ${host}:${porta}`)});