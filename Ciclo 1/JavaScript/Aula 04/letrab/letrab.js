// Sorteio de um número

document.querySelector("#button2").addEventListener("click", function() {
    let min = parseInt(document.querySelector("#numero1").value);
    let max = parseInt(document.querySelector("#numero2").value);

    /* Cálculos */
    let sorteio = Math.round(Math.random()*(max-min) + min); /* Não está pegando o menor número, pois sempre arredonda para cima */ /* Eu consertei com Vitor usando o random porque pega o mais próximo*/
    const resultado_sorteio = document.querySelector("#resultado-sorteio");
    
    if (isNaN(min) || isNaN(max)) {
        console.log("Digite um número");
        return resultado_sorteio.textContent = "Digite apenas números em ambos os campos"
    } else {
        if (max<min) {
            resultado_sorteio.textContent = "Coloque o valor maior no campo correto"        
        } else {
            document.querySelector("#resultado-sorteio").textContent = sorteio;
        }
    }
});

