// ***Importação***

import person from "./modules/person.js";

// ***Constantes e variáveis***

// Constantes
const email = document.querySelector("#email");
const birthDate = document.querySelector("#date");
const search = document.querySelector("button");
const result = document.querySelector("#result");


// ***Eventos***
    
search.addEventListener("click", () => {
    const personOne = new person(email.value, birthDate.value);
    
    request(`http://45.77.6.136/person?email=${personOne.getEmail()}&birthdate=${personOne.getBirthDate()}&code=${personOne.getCode()}`);    
})


// ***Funções assincronas***

// Requisição utilizando async
async function request(url) {
    
    try {
        const response = await fetch(url);

        if (!response.ok) {
            const error = await response.json();
            
            throw error;          
        }

        const api = await response.json();

        const responseApi = api.message;

        requestApi(responseApi);

        return api;
    } catch (error) {
        result.innerHTML = error.error;
        return error;        
    }
}

// ***Funções sincronas***

// Recebe API
function requestApi(api) {
    console.log("Utilização da API em funções", api);
    result.innerHTML = "";
    result.innerHTML = api;
}