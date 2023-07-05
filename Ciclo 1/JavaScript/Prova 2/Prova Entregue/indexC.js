import person from "./modules/person.js";

// ***Constantes e variáveis***

// Constantes
const email = document.querySelector("#email");
const birthDate = document.querySelector("#date");
const search = document.querySelector("button");
const result = document.querySelector("#result");


// ***Eventos***

// element.addEventListener("click", function name() {
    
    // });
    
search.addEventListener("click", () => {
    const personOne = new person(email.value, birthDate.value);
    request(`http://45.77.6.136/person?email=${personOne.getEmail()}&birthdate=${personOne.getBirthDate()}&code=${personOne.getCode()}`);    
})

/* 
Construa uma classe Person, que receba como parâmetro (no construtor) um e-mail e uma data de nascimento (no formato YYYY-MM-DD), salvando-os nos atributos email e birthDate da classe, respectivamente. Além disso:

    i. A classe deve ter um método getEmail, que deve retornar o email do usuário;

    ii. A classe deve ter um método getBirthDate, que deve retornar a data de nascimento do usuário;

    iii. A classe deve ter um método getCode, que deve retornar um código formado pela soma dos números que fizerem parte da data de nascimento recebida como parâmetro. Por exemplo, se a data for 21/02/1990, o código será 2+1+0+2+1+9+9+0 = 24.
*/

// ***Funções sincronas***



// ***Funções assincronas***

// Requisição utilizando async
async function request(url) {
    
    try {
        const response = await fetch(url);

        const api = await response.json();
        // console.log("Tratamento da api", api);

        const responseApi = api.slip.advice;
        // console.log(responseApi);
        requestApi(responseApi);
        // Aqui eu posso tratar a promisse para pegar apenas o que eu quero para questão

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