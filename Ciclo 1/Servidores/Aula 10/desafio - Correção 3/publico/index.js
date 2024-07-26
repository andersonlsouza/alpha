// const { response } = require("express");
// const path = "http://localhost:3000";

const form = document.querySelector("#form");
const nomeUser = document.querySelector("#nome-input");
const emailUser = document.querySelector("#e-mail-input");
const table = document.querySelector("tbody");
const button = document.querySelector("#cadastrar");

// Variável global
let userId;

reqGet();

// Formulário de preenchimento
form.addEventListener("submit", e =>{
    e.preventDefault();

    if (button.value == "Cadastrar") {
        fetch("/usuarios", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome: form.nome.value, email: form.email.value})
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error));
    }
    
    if (button.value == "Editar") {
        // console.log(userId);
        userEdit(userId);
        button.value = "Cadastrar";
    }

    reqGet();
});

// Requisição GET renderizando a tabela
function reqGet() {
    fetch("/usuarios")
    .then(response => response.json())
    .then(data => renderTable(data))
    .catch(error => console.log(error));    
}

// Renderização da tabela
function renderTable(array) {
    table.innerHTML = 
    `   
        <tr id="table-heading">
            <td class="id-number">#ID</td>
            <td class="nome">NOME</td>
            <td class="e-mail">E-MAIL</td>
            <td class="editar">EDITAR</td>
            <td class="excluir">EXCLUIR</td>
        </tr>
    `;
    
    for (let i = 0; i < array.length; i++) {
        
        let line = document.createElement("tr");
    
        let column1 = document.createElement("td");
        let column2 = document.createElement("td");
        let column3 = document.createElement("td");
        let column4 = document.createElement("td");
        let column5 = document.createElement("td");
    
        line.appendChild(column1);       
        line.appendChild(column2);       
        line.appendChild(column3);       
        line.appendChild(column4);       
        line.appendChild(column5);
    
        column1.innerHTML = `<td class="id-number">${i+1}</td>`;
        column2.innerHTML = `<td class="nome">${array[i].nome}</td>`;
        column3.innerHTML = `<td class="e-mail">${array[i].email}</td>`;
        column4.innerHTML = `<img src="./src/lapis.png" alt="Ícone de editar">`;
        column5.innerHTML = `<img src="./src/excluir.png" alt="Ícone de excluir">`;
        
        column4.addEventListener("click", () => user(array[i]));
        column5.addEventListener("click", () => userDelete(array[i].id));
        
        table.appendChild(line);
    }
}

// Usuário específico
function user(obj) {
    button.value = "Editar";
    userId = obj.id;
    nomeUser.value = obj.nome;
    emailUser.value = obj.email;
}

// Edição de usuário
function userEdit(id) {
    fetch(`/usuarios/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome: form.nome.value, email: form.email.value})
    })
    .catch(error => console.log(error));
}

// Ação para remover um objeto
function userDelete (id) {

    fetch(`/usuarios/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .catch(error => console.log(error));

    reqGet();
}