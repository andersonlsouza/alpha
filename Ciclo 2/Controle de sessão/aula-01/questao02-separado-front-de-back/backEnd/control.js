const fs = require("fs");
const path = "./backEnd/data/users.json";

// Leitura de dados do arquivo JSON
const dataUsers = JSON.parse(fs.readFileSync(path, "utf-8"));

// Rota para envio dos dados cadastrados do usuário
const getLogin = async (req, res) => {
    const id = Number(req.cookies.userId);

    // Resposta caso não seja encontrado os cookies
    if (!id) {
        return res.status(401).send('Usuário não encontrado!');
    }

    // Obtém os registros de usuários do banco de dados
    const users = dataUsers;

    // Procura pelo usuário correspondente ao id fornecido
    const user = users.find(u => u.id === id);

    res.send(user);

    return user;
}

// Rota para construção do cookie
const postLogin = async function (req, res) {
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

// Limpeza dos cookies
const logout = async (req, res) => {
    res.clearCookie("userId");
    res.redirect("/");
};

module.exports = { getLogin, postLogin, logout };