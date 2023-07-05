const fs = require("fs");
const path = "./data/users.json";

// Leitura de dados do arquivo JSON
const dataUsers = JSON.parse(fs.readFileSync(path, "utf-8"));

// Página principal de login do usuário
const mainPage = async (req, res) => {
    res.sendFile('/public/index.html', { root: __dirname + "/.." });
};

// Rota para construção do cookie
const system = async function (req, res) {
    const { email, password } = req.body;

    // Verificando se o usuário está cadastrado
    const user = dataUsers.find(u => u.email === email && u.password === password);

    if (user) {

        // Define o cookie de sessão com o id do usuário autenticado
        res.cookie('userId', user.id, { maxAge: 300000 });
        res.redirect("/login");
    } else {
        // Retorna status HTTP Unauthorized em caso de falha na autenticação
        res.status(401).send('Email ou senha inválidos!');
    }
}

// Rota para a autenticação de usuários
const login = async (req, res) => {
    res.sendFile('/public/login.html', { root: __dirname + "/.." });
}

// Rota para envio dos dados cadastrados do usuário
const dataLogin = async (req, res) => {
    const id = Number(req.cookies.userId);

    const user = listUser(id);

    res.send(user);

    return user;
}

// Limpeza dos cookies
const logout = async (req, res) => {
    res.clearCookie("userId");
    res.redirect("/");
};

// Função para listar apenas um usuário
function listUser(id) {
    // Obtém os registros de usuários do banco de dados
    const users = dataUsers;

    // Procura pelo usuário correspondente ao id fornecido
    const user = users.find(u => u.id === id);

    return user;
}
 
module.exports = { mainPage, logout, login, system, dataLogin };