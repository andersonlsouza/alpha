// Constantes
const num = document.querySelector("#input");
const buttonApresentation = document.querySelector("#apresentation");
const text = document.querySelector("#text");


// Eventos
buttonApresentation.addEventListener("click", validate);

function validate() {

    if (isNaN(num.value) || num.value == "") {
        text.innerHTML = `O valor ${num.value} não é um número`;                
    }
    
    if (num.value < 10) {
        text.innerHTML = `O valor ${num.value} é um número menor do que 10`;                        
    }
    
    if (num.value == 10) {
        text.innerHTML = `O valor ${num.value} é igual a 10`;                        
    }

    if (num.value > 10) {
        text.innerHTML = `O valor ${num.value} é um número maior do que 10`;                        
    }
}