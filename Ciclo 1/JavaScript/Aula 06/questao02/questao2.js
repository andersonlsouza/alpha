// Atribuição de constantes
const inputCep = document.querySelector("#cep-field");
const erro = document.querySelector("#mensage-error");

// Tamanho máximo de quantidade de caracteres
inputCep.maxLength = 10;

// Adição de evento
inputCep.addEventListener("input", digitation); /* Quando eu coloquei o input ele não apagou tudo e deixa o hífen, não entendi o porque e se deixar keypress ele tem meio que um delay --- O Professor me respondeu que o keypress está em desuso*/


// Função para realização do evento
function digitation (event) {

    /* Variável para retirada de ponto, hífen e guarda apenas os números */
    let apenasnumeros = inputCep.value;
    
    apenasnumeros = apenasnumeros.replace(".","");
    apenasnumeros = apenasnumeros.replace("-","");
    
    // Captando o item a cada vez que é digitado algo pelo usuário
    let caracterPorEvento = event.data;

    // Se o usuário digitar algo que não for um número então a condição abaixo será satisfeita
    if (isNaN(caracterPorEvento) == true) {
        
        // Posição do cursor quando algum elemento é alterado dentro do input, esta posição foi pega para saber em qual posição o cursor estava antes de apagar o valor digitado que não era número
        let position = inputCep.value.indexOf(caracterPorEvento);

        // Substitui o que não for número por nada
        inputCep.value = inputCep.value.replace(caracterPorEvento,"");

        // Deixa o curso na mesma posição antes de deletar o item
        event.target.selectionEnd = position; /* Eu poderia escrever inputCep.selectionEnd ou this.selectionEnd */

        // Não funciona o prevent default no evento input
        // event.preventDefault();
        // console.log(event.defaultPrevented);
    }

    // Se o texto conter algo que não seja número a condição abaixo será satisfeita
    if (isNaN(apenasnumeros) == true) {

        erro.textContent = "Insira apenas números";
    } else {
        // Apaga o campo caso o usuário digite apenas números
        erro.textContent = null;

        // Colocar a condição utilizando a variável apenas fez com que o usuário não pudesse apagar o ponto e o hífen aleatoriamente e também colocar a máscara do CPF
        if (apenasnumeros.length > 2) {

            inputCep.value = apenasnumeros.slice(0,2) + "." + apenasnumeros.slice(2, 5);
            
            if (apenasnumeros.length > 5) {
                
                inputCep.value = apenasnumeros.slice(0,2) + "." + apenasnumeros.slice(2, 5) + "-" + apenasnumeros.slice(5,apenasnumeros.length);
            }
        }

    }
};