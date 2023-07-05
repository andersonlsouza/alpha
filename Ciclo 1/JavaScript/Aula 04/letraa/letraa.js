// Cálculo do IMC

document.querySelector("#button1").addEventListener("click", function() {
    /* Variáveis de input */
    let peso = document.querySelector("#peso").value;
    let altura = document.querySelector("#altura").value;
    
    /* Variáveis para classificação do IMC*/
    const result = document.querySelector("#resultado-imc");
    const classif = document.querySelector("#classificacao-imc");
    
    /* Condições */
    
    if (isNaN(peso) || isNaN(altura) || isNaN("null")) {
        return result.textContent = "Por favor insira um número";
    } else {
        let imc = peso/(altura*altura);
        result.textContent = imc;
        console.log(imc);
        
        if (imc < 18.5) {
            classif.textContent = "Abaixo do peso";        
        }
    
        if (imc >= 18.5 && imc < 25) {
            classif.textContent = "Peso normal";
        }
    
        if (imc >= 25 && imc < 30) {
            classif.textContent = "Sobrepeso (acima do peso desejado)";
        }
    
        if (imc >= 30) {
            classif.textContent = "Obesidade";
        }
    }

});