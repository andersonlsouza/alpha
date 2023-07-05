const express = require('express')
const mongoose = require('mongoose');

const app = express();

// Conectando ao banco de dados MongoDB local
mongoose.connect('mongodb://localhost/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Definindo um Schema para o dataset de vendas
const vendaSchema = new mongoose.Schema({
    product: String,
    state: String,
    quantity: Number,
    unitPrice: Number,
});

// Criando um modelo a partir do Schema
const Venda = mongoose.model('vendas', vendaSchema);

app.get('/estados', (req, res) => {
    // Consulta para obter a lista dos estados presentes no dataset
    Venda.aggregate([{ $group: { _id: "$state" } }])
        .then(resultados => {
            console.log('Estados:');
            console.log(resultados);
            res.json({ resultados })
        })
        .catch(err => {
            console.error('Erro ao obter os estados:', err);
            res.status(500).json({ error: 'Erro ao obter os estados' })
        })

})

app.get('/', (req, res) => {
    // Consulta para obter a soma total das vendas por estado
    Venda.aggregate([{ $match: { quantity: { $gt: 100 } } }, { $group: { _id: "$state", totalSales: { $sum: { $multiply: ["$quantity", "$unitPrice"] } } } }])
        .then(resultados => {
            console.log('Soma total das vendas por estado:');
            console.log(resultados);
            res.json({ resultados })
        })
        .catch(err => {
            console.error('Erro ao calcular a soma total das vendas:', err);
            res.status(500).json({ error: 'Erro ao calcular a soma total das vendas' });
        });
})

const porta = 3000;

app.listen(porta, () => {
    console.log(`Servidor iniciado na porta ${porta}`);
});