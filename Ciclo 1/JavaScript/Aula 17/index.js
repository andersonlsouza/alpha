// ***Constantes e variáveis***

// Input do CEP e tag Iframe
const cep = document.querySelector("#input-cep");
const containerIframe = document.querySelector("#countainer-iframe");

// Nodelist com todos os botões da questão
const button = document.querySelectorAll("button");

// Constantes para representação do erro para o usuário
const erro = document.querySelector("#mensage-error");
const erro2 = document.querySelector("#error");

// Variáveis globais
let latitud;
let longtud;
let apenasnumeros;

// ***Estlização inicial***
button[1].style.display = "none";

// ***Eventos***

// Evento do botão de consultar o CEP
button[0].addEventListener("click", function () {

    // Reset das informações toda vez que o usuário clica no botão consultar
    containerIframe.innerHTML = "";
    erro2.innerHTML = "";

    // Mudança do cursor para carregamento da página
    document.body.style.cursor = "wait";
    button[0].style.pointerEvents = "none";

    // Requisição a API do CEP
    fetch(`https://cep.awesomeapi.com.br/json/${apenasnumeros}`)
    .then(response => {response.json()
        .then(api => {

            // Mudanças no curso caso a requisição seja realizada
            button[1].style.display = "inline-block";
            document.body.style.cursor = "auto";
            button[0].style.pointerEvents = "auto";
            button[0].style.cursor = "pointer";

            // Condicionais caso ocorra algum erro de status na requisição, caso contrário o código é executado normalmente
            if (response.status == 400 || response.status == 404) {

                for (let i = 0; i < document.querySelectorAll(".input-response").length; i++) {
                    document.querySelectorAll(".input-response")[i].value = "";
                }

                if (response.status == 400) {
                    erro2.innerHTML = "CEP incompleto!";             
                } else {
                    erro2.innerHTML = "CEP não encontrado!";
                }
                throw "Erro:" + response.status;

            } else {
                inputResult(api);
            }
        })
    })
    .catch(e => console.log("Deu erro:" + e.message));
});

// Evento realizado quando é clicado no botão "Exibir mapa"
button[1].addEventListener("click",  () => { 

    // Mudanças no curso caso a requisição seja realizada
    document.body.style.cursor = "wait";
    button[0].style.pointerEvents = "none";
    button[1].style.pointerEvents = "none";
    button[1].style.display = "none";

    // Criação do iframe, requisição e envio das informações para o HTML
    const iframe = document.createElement("iframe");
    iframe.src = `https://maps.google.com/maps?q=${latitud},${longtud}&hl=pt&z=14&output=embed`;
    containerIframe.appendChild(iframe);

    // Mudanças no curso caso a requisição seja concluída, perguntar a Vitor porque o carregamento do mapa não funciona o carreamento do botão
    document.body.style.cursor = "auto";
    button[0].style.pointerEvents = "auto";
    button[1].style.pointerEvents = "auto";
    button[0].style.cursor = "auto";
})

// Evento de input para escrita do CEP
cep.addEventListener("input", digitation);

const inputResult = (result) => {
    // Acessa todos os campos de um objeto e mostra para o usuário as informações de endereço nos inputs
    for (const campo in result) {
        if (document.querySelector("#" + campo)) {
            document.querySelector("#" + campo).value = result[campo];
        }

        // Condiçao para atribuir a latitude e longitude nas variáveis globais de latitude e longitude
        if (campo === "lat") {
            latitud = result["lat"];
            longtud = result["lng"];
        }
    }           
}

// Função para realização do evento
function digitation (event) {

    /* Variável para retirada de ponto, hífen e guardando apenas os números nela */
    apenasnumeros = cep.value;
    apenasnumeros = apenasnumeros.replace(".","");
    apenasnumeros = apenasnumeros.replace("-","");
    
    // Captando o item a cada vez que é digitado algo pelo usuário
    let caracterPorEvento = event.data;

    // Se o usuário digitar algo que não for um número então a condição abaixo será satisfeita
    if (isNaN(caracterPorEvento) == true) {
        
        // Posição do cursor quando algum elemento é alterado dentro do input, esta posição foi pega para saber em qual posição o cursor estava antes de apagar o valor digitado que não era número
        let position = cep.value.indexOf(caracterPorEvento);

        // Substitui o que não for número por nada
        cep.value = cep.value.replace(caracterPorEvento,"");

        // Deixa o curso na mesma posição antes de deletar o item
        event.target.selectionEnd = position;
    }

    // Se o texto conter algo que não seja número a condição abaixo será satisfeita
    if (isNaN(apenasnumeros) == true) {
        erro.textContent = "Insira apenas números";
    } else {
        // Apaga o campo caso o usuário digite apenas números
        erro.textContent = null;

        // Colocar a condição utilizando a variável apenas fez com que o usuário não pudesse apagar o ponto e o hífen aleatoriamente e também colocar a máscara do CPF
        if (apenasnumeros.length > 2) {
            // Máscara do ponto
            cep.value = apenasnumeros.slice(0,2) + "." + apenasnumeros.slice(2, 5);
        
            if (apenasnumeros.length > 5) {
                // Máscara com ponto e hífen
                cep.value = apenasnumeros.slice(0,2) + "." + apenasnumeros.slice(2, 5) + "-" + apenasnumeros.slice(5,apenasnumeros.length);
            }
        }
    }
};