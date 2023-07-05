// Constantes para indetificação de elementos dos números
const num1 = document.querySelector("#number1");
const num2 = document.querySelector("#number2");

// Constantes para elementos dos botões
const sum = document.querySelector("#buttonSum");
const sub = document.querySelector("#buttonSub");
const mult = document.querySelector("#buttonMult");
const exp = document.querySelector("#buttonexp");
const div = document.querySelector("#buttonDiv");

// Constante para elemento onde irá conter o resultado final
const resultfinaly = document.querySelector("#result");

// Eventos
sum.addEventListener("click", eventResult);
sub.addEventListener("click", eventResult);
mult.addEventListener("click", eventResult);
exp.addEventListener("click", eventResult);
div.addEventListener("click", eventResult);

// Função para captar o evento e transferir parametros para demais funções
function eventResult() {
    let n1 = Number(num1.value);
    let n2 = Number(num2.value);
    let result;

    if (this.value === "Soma") {
        result = opSum(n1, n2);
    }

    if (this.value === "Subtração") {
        result = opSub(n1, n2);
    }

    if (this.value === "Multiplicação") {
        result = opMult(n1, n2);
    }

    if (this.value === "Potenciação") {
        result = opExp(n1, n2);
    }

    if (this.value === "Divisão") {
        result = opDiv(n1, n2);
    }

    resultfinaly.innerHTML = result;
}

// Funções para operações matemáticas
function opSum(number1, number2) {
    return number1+number2;            
}

function opSub(number1, number2) {
    return number1-number2;            
}

function opMult(number1, number2) {
    return number1*number2;             
}

function opExp(number1, number2) {
    return Math.pow(number1, number2);             
}

function opDiv(number1, number2) {
    if (number2 === 0) {
        return "Não existe";        
    } else {
        return number1/number2;            
    }
}


// Este código abaixo serviu muito para eu entender que não posso chamar uma função dentro do addListener

/* function minhaFuncao(param2, param3){
    console.log(param2);
    console.log(param3);
}

var bt = document.querySelector('#buttonSum');

bt.addEventListener('click', function(event){
    var param2 = "valor 2";
    var param3 = "valor 3";
    minhaFuncao(param2, param3);
}); */