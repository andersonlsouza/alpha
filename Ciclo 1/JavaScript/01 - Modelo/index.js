// Constantes
const productName = document.querySelector("#product");
const productDescription = document.querySelector("#description");
const productPrice = document.querySelector("#price");
const result = document.querySelector("#result");
const buttonInclude = document.querySelector("#buttonInclude");
const buttonList = document.querySelector("#buttonList");
const tableBody = document.querySelector("#tableElements");

// Variáveis
let count = 1; /* Contador para identificação de produto */
let idEdit; /* Variável global para captação de id de edição */
let products = [];


// Eventos
buttonInclude.addEventListener("click", configProduct);
buttonList.addEventListener("click", configButtonList);


// Funções de validação
function validation() {
    // Quando os campos estão vazios
    if(productName.value === "" || productDescription.value === "" || productPrice.value === "") {
        result.innerHTML = "Nenhum campo pode está vázio";
        throw "Campos vazios!";        
    }

    /* if (isNaN(parseInt(productName.value)) === false || isNaN(parseInt(productDescription.value))) {
        result.innerHTML = "Digita apenas letras";
        throw "Existem elementos além de letras!";        
    } */
}

// Função para evento de clique de botão para adicionar e editar produtos
function configProduct() {

    // Chamando função de validação
    validation();

       
    // Inclusão de um produto novo
    if (buttonInclude.value === "Incluir produto") {
        const product = {
            id: count++,
            name: productName.value,
            description: productDescription.value,
            price: productPrice.value,
            includedIn: new Date().toISOString(),
        }
        
        // Inserindo o produto em um array
        products.push(product);
    
        result.innerHTML = `Produto ${product.name} incluído com sucesso!`;            
    }

    // Edição de um valor de um produto
    if (buttonInclude.value === "Atualizar valor") {
    
        // Substituindo dos valores novos inseridos pelo usuário
        products[idEdit].name = productName.value;
        products[idEdit].description = productDescription.value;
        products[idEdit].price =  productPrice.value;

        // Limpando a tela para o usuário
        productName.value = "";
        productDescription.value = "";
        productPrice.value = "";

        result.innerHTML = "Produto editado!";

        // Reconfigurando cores dos botões para o padrão
        buttonInclude.style.backgroundColor = "var(--color-buttons)";
        buttonList.style.backgroundColor = "var(--color-buttons)";
        
        // Atribuição dos valores originais dos botões
        buttonInclude.value = "Incluir produto";
        buttonList.value = "Listar produtos";

        // Chamando a função para atualizar os dados da tabela
        configButtonList();
    }
}

// Descriçao completa do cadastro de um produto clicado no nome
function productExibition(id) {

    let date = new Date(products[id].includedIn).toLocaleString();
    
    result.innerHTML = `Id: ${products[id].id}<br> Nome: ${products[id].name}<br> Descrição: ${products[id].description}<br> Preço: ${products[id].price}<br> Incluído em: ${date.slice(0, 10)} - ${date.slice(11, 19)}`; 
}

// Captura do objeto para ediçao
function productEdit (id) {

    // Mostrando os valores para o usuário
    productName.value = products[id].name;
    productDescription.value = products[id].description;
    productPrice.value = products[id].price;

    // Atribuindo id para uma variável global para ser utilizado em outra função
    idEdit = id;

    result.innerHTML = "Edição de produto";
    
    // Modificando as cores dos botões quando o produto entra em edição
    buttonInclude.style.backgroundColor = "green";
    buttonList.style.backgroundColor = "red";

    // Trocando valores dos botões para realização da edição
    buttonInclude.value = "Atualizar valor";
    buttonList.value = "Cancelar alteração";
}

// Ação para remover um objeto
function productDelete (id) {

    // count--; /* Tive dificuldade aqui, pois estava dando um erro de identificação do produto, mas depois entendi que cada produuto deve ter um id único */

    /* while (id < products.length-1) {
        products[id] = products[id+1];
        id++;
    } */
    
    // products.length -= 1;
    
    products.splice(id, 1);
    
    // Chamando função para renderizar a tabela
    configButtonList();

    buttonInclude.value = "Incluir produto";
}


// Exibições do botão de Listar produtos
function configButtonList() {

    // Criação e exibição da tabela
    if (buttonList.value === "Listar produtos") {
        let i = 0;
        tableBody.innerHTML = "";

        // Criação de cada linha da tabela
        while (i<products.length) {
            
            // Variável para criação da linha
            let line = document.createElement("tr");
            
            // Variáveis para criação da coluna
            let column1 = document.createElement("td");
            let column2 = document.createElement("td");
            let column3 = document.createElement("td");
            let column4 = document.createElement("td");
            let column5 = document.createElement("td");
            
            // Inserção de cada coluna na linha td no HTML
            line.appendChild(column1);       
            line.appendChild(column2);       
            line.appendChild(column3);       
            line.appendChild(column4);       
            line.appendChild(column5);
            
            // Inserção de cada linha na tabela
            tableBody.appendChild(line);

            // Exibição de cada linha para o usuário
            column1.innerHTML = products[i].id;
            column2.innerHTML = `<span onclick="productExibition(${i})">${products[i].name}</span>`;
            column3.innerHTML = products[i].price;
            column4.innerHTML = `<img src="https://cdn-icons-png.flaticon.com/512/1159/1159633.png" alt="image" onclick="productEdit(${i})">`;
            column5.innerHTML = `<img src="https://icon-library.com/images/icon-delete/icon-delete-16.jpg" alt="image" onclick="productDelete(${i})">`;

            i++;
        }
    }
    
    // Atualização do botão e limpeza dos dados quando a edição de um elemento é ativada e o usuário clica para cancelar a edição
    if (buttonList.value === "Cancelar alteração") {
        productName.value = "";
        productDescription.value = "";
        productPrice.value = "";

        buttonList.value = "Listar produtos";

        result.innerHTML = "";
    }
}