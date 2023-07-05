// Constantes

// Inputs
const productName = document.querySelector("#product");
const productDescription = document.querySelector("#description");
const productPrice = document.querySelector("#price");
const search = document.querySelector("#search");

// Resultados
const result = document.querySelector("#result");

// Células principais da tabela
const nameProducts = document.querySelector("#nameProducts");
const valueProducts = document.querySelector("#valueProducts");

// Botões
const buttonInclude = document.querySelector("#buttonInclude");
const buttonList = document.querySelector("#buttonList");
const buttonSearch = document.querySelector("#buttonSearch");

// Corpo da tabela
const tableBody = document.querySelector("#tableElements");

// Variáveis
let count = 1; /* Contador para identificação de produto */
let idEdit;
let products = [];
let arraySearch;
let arrayType;


// Eventos

// Botões
buttonInclude.addEventListener("click", configProduct);
buttonList.addEventListener("click", configButtonList);
buttonSearch.addEventListener("click", () => {searchProducts(search.value)});

// Ordenação
nameProducts.addEventListener("click", () => {

    if (arrayType == 0) {
        orderNameProducts(products);

    } else {
        orderNameProducts(arraySearch);                        
    }
});

valueProducts.addEventListener("click", () => {

    if (arrayType == 0) {
        orderValueProducts(products);

    } else {
        orderValueProducts(arraySearch);                        
    }
});


// Funções
function validation() {
    if(productName.value === "" || productDescription.value === "" || productPrice.value === "") {
        result.innerHTML = "Nenhum campo pode está vázio";
        throw "Campos vazios!";        
    }
}

function configProduct() {

    // Validação
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
        
        products.push(product);

        productName.value = "";
        productDescription.value = "";
        productPrice.value = "";
    
        result.innerHTML = `Produto ${product.name} incluído com sucesso!`;            
    }

    // Edição de um valor de um produto
    if (buttonInclude.value === "Atualizar valor") {
    
        products[idEdit].name = productName.value;
        products[idEdit].description = productDescription.value;
        products[idEdit].price =  productPrice.value;

        productName.value = "";
        productDescription.value = "";
        productPrice.value = "";

        result.innerHTML = "Produto editado!";

        buttonInclude.style.backgroundColor = "var(--color-buttons)";
        buttonList.style.backgroundColor = "var(--color-buttons)";
    
        buttonInclude.value = "Incluir produto";
        buttonList.value = "Listar produtos";

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

    productName.value = products[id].name;
    productDescription.value = products[id].description;
    productPrice.value = products[id].price;

    idEdit = id;

    result.innerHTML = "Edição de produto";

    buttonInclude.style.backgroundColor = "green";
    buttonList.style.backgroundColor = "red";

    buttonInclude.value = "Atualizar valor";
    buttonList.value = "Cancelar alteração";
}

// Ação para remover um objeto
function productDelete (id) {

    products.splice(id,1);

    table(products);

    buttonInclude.value = "Incluir produto";
}


// Exibições do botão de Listar produtos
function configButtonList() {

    document.querySelector("#resultSearch").innerHTML =  "";

    // Criação e exibição da tabela
    if (buttonList.value === "Listar produtos") {
        arrayType = 0;
        table(products);                
    }
    
    // Botão quando a edição de um elemento é ativada
    if (buttonList.value === "Cancelar alteração") {
        productName.value = "";
        productDescription.value = "";
        productPrice.value = "";

        buttonList.value = "Listar produtos";

        result.innerHTML = "";
    }
}

function orderNameProducts(products) {

    products.sort(function (a, b) {

        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
    });

    table(products);
}


function orderValueProducts(products) {

    products.sort(function (a, b) {

        if ((a.price - b.price) > 0) {
          return 1;
        }
        if ((a.price - b.price) < 0) {
          return -1;
        }
        return 0;
    });
    
    table(products);
}

function searchProducts(query) {

    tableBody.innerHTML = "";
    
    if (products.length === 0) {
        result.innerHTML = "Não existe produtos cadastrados";
        configButtonList();
        
    } else {
        result.innerHTML = "";
        
        arraySearch = products.filter(product => (product.name.toLowerCase().indexOf(query.toLowerCase()) > -1) || (product.description.toLowerCase().indexOf(query.toLowerCase()) > -1));
        
        if (arraySearch.length === 0) {
            document.querySelector("#resultSearch").innerHTML =  "Não foram encontrados produtos conforme chave de pesquisa!";
            
        } else {
            tableBody.innerHTML = "";
            
            arrayType = 1;
            table(arraySearch);

            document.querySelector("#resultSearch").innerHTML =  `Foram encontrado(s) ${arraySearch.length} produto(s)`;
        }
    }
}

function table(array) {
    tableBody.innerHTML = "";
    
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
    
        tableBody.appendChild(line);
    
        column1.innerHTML = array[i].id;
        column2.innerHTML = `<span onclick="productExibition(${i})">${array[i].name}</span>`;
        column3.innerHTML = array[i].price;
        column4.innerHTML = `<img src="https://cdn-icons-png.flaticon.com/512/1159/1159633.png" alt="image" onclick="productEdit(${i})">`;
        column5.innerHTML = `<img src="https://icon-library.com/images/icon-delete/icon-delete-16.jpg" alt="image" onclick="productDelete(${i})">`;
    }  
}