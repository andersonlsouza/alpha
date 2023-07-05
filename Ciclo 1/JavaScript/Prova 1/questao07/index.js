// Não fiz essa questão na prova

// Constantes
const textUser = document.querySelector("#inputText");
const buttonAdd = document.querySelector("#add");
const buttonList = document.querySelector("#list");
const buttonReset = document.querySelector("#reset");
const buttonPrint = document.querySelector("#print");
const textResult = document.querySelector("#text");


// Eventos
buttonAdd.addEventListener("click", function() {
    addValue(textUser.value);
});

buttonList.addEventListener("click", list);
buttonReset.addEventListener("click", reset);
buttonPrint.addEventListener("click", printConsole);

const values = [];

function addValue(value) {
    if (value == "") {
        try {
            throw "Erro: tentativa de adicionar valor vazio"
        } catch (error) {
            textResult.innerHTML = error;            
        }        
    } else {
        values.push(value);
    }    
}

function list() {
    textResult.innerHTML = JSON.stringify(values);    
}

function reset() {
    textResult.innerHTML = "";
    values.splice(0,values.length);
}

function printConsole() {

    console.clear();

    let i = 0;
    let count = 0;

    while (i < values.length) {
        if (values[i].slice(0,1) == "a") {
            console.log(`Valor ${i}: ${values[i]} começa com a`);
            count++;                
        }
        i++;
    }
    console.log(count);        
}