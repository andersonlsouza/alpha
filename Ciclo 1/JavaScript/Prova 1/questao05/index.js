// Arquivo foi alterado depois da prova para corrigir meus erros

// Constantes
const textUser = document.querySelector("#inputText");
const rept = document.querySelector("#inputNumber");
const button = document.querySelector("#button");
const text = document.querySelector("#text");


// Eventos
button.addEventListener("click", write);

function write() {

    validation();

    text.innerHTML = "";
    
    let i=0
    while (i < rept.value) {

        if (i < rept.value - 1) {
            text.innerHTML += `${textUser.value} `;  
        } else {
            text.innerHTML += `${textUser.value}.`;  
        }        
        i++;       
    }
}

function validation() {
    if (textUser.value == "" || rept.value == "") {
        text.innerHTML = "Existe um campo vazio";        
        throw "Campo vazio";
    }    
}