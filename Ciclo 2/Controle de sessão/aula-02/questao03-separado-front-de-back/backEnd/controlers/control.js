const fs = require("fs");
const path = "./backEnd/data/users.json";
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Chave secreta JWT
const jwtSecret = 'alphaedtech';

// Leitura de dados do arquivo JSON
const dataUsers = JSON.parse(fs.readFileSync(path, "utf-8"));

// Rota para resposta de Administrador
const getMain = (req, res) => {
    res.json({isAdmin: true});
}

// Rota para cadastrar usuários (apenas para administradores)
const postUsers = (req, res) => {
    const { name, email, type, password } = req.body;
  
    // Verifica se o email já está sendo usado
    if (dataUsers.some(u => u.email === email)) {
      return res.status(400).json({ error: 'O email informado já está sendo usado' });
    }
  
    // Gera o hash da senha
    const hashedPassword = bcrypt.hashSync(password, 10);
  
    // Cadastra novos usuários
    const newUser = {
        id: dataUsers.length + 1,
        name,
        email,
        type,
        password: hashedPassword
    }; 
    dataUsers.push(newUser);

    // Adicionando informações no arquivo JSON de banco de dados
    try {
        fs.writeFileSync(path, JSON.stringify(dataUsers));
    } catch (error) {
        res.status(500).send({error: "Erro na escrita do banco de dados"});
        return;        
    }

    res.json(newUser);
};


// Rota para autenticação de usuários
const system = (req, res) => {
    const { email, password } = req.body;

    // Verifica se o usuário existe
    const user = dataUsers.find(u => u.email === email);
    if (!user) {
        return res.status(401).json({ error: 'Email ou senha inválidos' });
    }
  
    // Verifica se a senha está correta
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Email ou senha inválidos' });
    }

    // Identificação de usuário administrador ou usuário comum
    let isAdmin = true;
    if (user.type !== "adm") {
        isAdmin = false;                      
    }
  
    // Gera o token JWT
    const token = jwt.sign({ id: user.id, isAdmin }, jwtSecret);
  
    // Armazena o token em um cookie
    res.cookie('token', token, { maxAge: 300000 });

    res.send({ message: 'Autenticado com sucesso', isAdmin });
}


// Rota para envio dos dados cadastrados do usuário
const dataUser = (req, res) => {

    // Capta a informção do id do usuário
    const id = Number(req.user.id);

    // Seleciona apenas o usuário que entrou no sistema
    const user = dataUsers.find(u => u.id === id);

    // Envia para o front as informações do usuário
    res.send(user);

    return user;
}

// Rota para limpeza dos cookies
const logout = (req, res) => {
    res.clearCookie("token");
    res.redirect("/");
};
 
module.exports = { getMain, logout, system, dataUser, postUsers, jwtSecret };