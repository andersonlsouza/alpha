// Arredondar um número
document.querySelector("#button3").addEventListener("click", function(){
    let numero = document.querySelector("#num").value;
    const num_cima = document.querySelector("#resultado-arredondado-cima");
    const num_baixo = document.querySelector("#resultado-arredondado-baixo");

    if (isNaN(numero)) {
        num_cima.textContent = "Insira um número";
        num_baixo.textContent = "Insira um número";
    } else {
        num_cima.textContent = Math.ceil(numero);
        num_baixo.textContent = Math.floor(numero);
    }
});