// Não fiz essa questão na prova

// Constantes
const textUser = document.querySelector("#inputText");
const buttonAdd = document.querySelector("#add");
const buttonList = document.querySelector("#list");
const buttonReset = document.querySelector("#reset");
const textResult = document.querySelector("#text");


// Eventos
buttonAdd.addEventListener("click", function() {
    addValue(textUser.value);
});

buttonList.addEventListener("click", list);
buttonReset.addEventListener("click", reset);

const values = [];

function addValue(r) {
    if (r == "") {
        try {
            throw "Erro: tentativa de adicionar valor vazio"
        } catch (error) {
            textResult.innerHTML = error;            
        }        
    } else {
        values.push(r);
    }    
}

function list() {
    textResult.innerHTML = JSON.stringify(values);    
}

function reset() {
    textResult.innerHTML = "";
    values.splice(0,values.length);
}