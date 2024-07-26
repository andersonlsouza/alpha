// Declaração de constantes globais
const formUser = document.querySelector("#button"); /* Botão do formulário */
const textA = document.querySelector("#inputText"); /* Input de nome do usuário */
const result = document.querySelector("#result");

// Constantes de erros
const errotext = document.querySelector("#erro");


// Eventos
formUser.addEventListener("click", send);

let obj;

function send() {
    obj = String(textA.value);
    
    try {
        result.innerHTML = "";
        obj = JSON.parse(obj);
        result.innerHTML = "Parsable JSON string!";
    } catch (error) {
        console.error("JSON not convert");
        result.innerHTML = "Not parsable JSON string!"
        obj="";
        throw "JSON invalid";
    }
    
    console.log(obj);    
}