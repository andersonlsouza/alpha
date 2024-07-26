document.getElementById("button").addEventListener("click", function() {
    
    // Declaração de variáveis
    var num1 = Number(document.getElementById("operando1").value);
    var num2 = Number(document.getElementById("operando2").value);
    var operation = document.getElementById("operation").value;
    var result = document.getElementById("result");

    // Condições para a realização das operações
    if(operation === "sum") {
        result.textContent = num1+num2;
    }
    if(operation === "subtraction") {
        result.textContent = num1-num2;
    }
    if(operation === "multiplication") {
        result.textContent = num1*num2;
    }
    if(operation === "division") {
        result.textContent = num1/num2;
    }
});
