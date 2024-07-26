import exemplo from "./modules/person.js";

// ***Constantes e variáveis***

// Constantes
// const nomedaconstante = document.querySelector("#nomeNoHTML");
const result = document.querySelector("#result");

// Tabela
// const containerTable = document.querySelector("#countainer-table");

// Erro
const error = document.querySelector("#error");

// **Estilização inicial**

// containerTable.style.display = "none";


// ***Eventos***

// element.addEventListener("click", function name() {
    
// });

// element.addEventListener("click", () => {
    
// })

/* 
Construa uma classe Person, que receba como parâmetro (no construtor) um e-mail e uma data de nascimento (no formato YYYY-MM-DD), salvando-os nos atributos email e birthDate da classe, respectivamente. Além disso:

    i. A classe deve ter um método getEmail, que deve retornar o email do usuário;

    ii. A classe deve ter um método getBirthDate, que deve retornar a data de nascimento do usuário;

    iii. A classe deve ter um método getCode, que deve retornar um código formado pela soma dos números que fizerem parte da data de nascimento recebida como parâmetro. Por exemplo, se a data for 21/02/1990, o código será 2+1+0+2+1+9+9+0 = 24.
*/

// ***Funções sincronas***

// setTimeOut e setInterval
const time = 1000;
const id = setInterval(function () {
    console.log("setInterval");
    request("https://api.adviceslip.com/advice");
}, time);


// ***Funções assincronas***

// Requisição utilizando async
async function request(url) {
    
    try {
        const response = await fetch(url);

        // if (!response.ok) {
        //     throw new Error("Erro no servidor");            
        // }

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

// class padrao1{
//     // var1;
//     // var2;

//     constructor(_email, _birthDate){
//         this.email = _email;
//         this.birthDate = _birthDate;
//     }

//     // get getvar1(){
//     //     return this.var1;
//     // }

//     set setVar1(value) {
//         this.var1 = value;
//     }

//     // set time(time){
//     //     const id = setInterval(function () {
//     //         console.log("setInterval");
//     //     }, time);
//     //     clearInterval(id);

//     //     const id2 = setTimeout(function () {
//     //         console.log("setTimout");    
//     //     }, time)
//     //     clearTimeout(id2);
//     // }

//     getEmail() {
//         return this.email;
//     }

//     getBirthDate() {
//         return this.birthDate;
//     }

//     getCode() {
//         // Transformar data de nascimento em soma
//     }
// }