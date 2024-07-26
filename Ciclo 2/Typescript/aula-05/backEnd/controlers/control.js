const fs = require("fs");
const path = "./backEnd/data/users.json";

// Leitura de dados do arquivo JSON
const users = JSON.parse(fs.readFileSync(path, "utf-8"));

// Rota para cadastrar usuários (apenas para administradores)
const postUser = (req, res) => {
  const { name, email, password } = req.body;

  // Verifica se o email já está sendo usado
  if (users.some((u) => u.email === email)) {
    return res
      .status(400)
      .json({ error: "O email informado já está sendo usado" });
  }

  // Cadastra novos usuários
  const newUser = {
    id: users.length + 1,
    name,
    email,
    password,
  };
  users.push(newUser);

  // Adicionando informações no arquivo JSON de banco de dados
  try {
    fs.writeFileSync(path, JSON.stringify(users));
  } catch (error) {
    res.status(500).send({ error: "Erro na escrita do banco de dados" });
    return;
  }

  res.json(newUser);
};

// Rota para autenticação de usuários
const login = (req, res) => {
  const { email, password } = req.body;

  // Verifica se o usuário existe
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ error: "Email ou senha inválidos" });
  }

  // Armazena o token em um cookie
  res.cookie("user", user.id, { maxAge: 300000 });

  res.send({ message: "Autenticado com sucesso" });
};

// Rota para envio dos dados cadastrados do usuário
const patchUser = (req, res) => {
  // Capta a informção do id do usuário
  const id = Number(req.cookies.user);

  const users = JSON.parse(fs.readFileSync(path, "utf-8"));

  // Seleciona apenas o usuário que entrou no sistema
  const user = users.find((u) => u.id === id);

  const { email, name, password } = req.body;

  user.email = email;
  user.name = name;
  user.password = password;

  // Adicionando informações no arquivo JSON de banco de dados
  try {
    fs.writeFileSync(path, JSON.stringify(users));
  } catch (error) {
    res.status(500).send({ error: "Erro na escrita do banco de dados" });
    return;
  }

  // Envia para o front as informações do usuário
  res.json(user);

  return user;
};

module.exports = { login, patchUser, postUser };
