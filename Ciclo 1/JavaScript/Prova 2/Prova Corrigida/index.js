// ***Constantes e variáveis***

// Constantes
const result = document.querySelector("#result");

// ***Funções sincronas***

// setTimeOut e setInterval
const time = 5000;
const id = setInterval(function () {
    console.log("setInterval");
    request("https://api.adviceslip.com/advice");
}, time);


// ***Funções assincronas***

// Requisição utilizando async
async function request(url) {
    
    try {
        const response = await fetch(url);

        const api = await response.json();

        const responseApi = api.slip.advice;
        requestApi(responseApi);

        return api;
    } catch (error) {
        return error;        
    }
}

// Recebe API
function requestApi(api) {
    console.log("Utilização da API em funções", api);
    result.innerHTML = "";
    result.innerHTML = api;
}