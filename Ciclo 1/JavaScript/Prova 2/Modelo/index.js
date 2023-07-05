import exemplo from "./modules/exemplo.js";

// ***Constantes e variáveis***

// Constantes
// const nomedaconstante = document.querySelector("#nomeNoHTML");

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


// ***Funções assincronas***

// Requisição utilizando async


async function request(url) {
    
    try {
        const response = await fetch(url);

        // if (!response.ok) {
        //     throw new Error("Erro no servidor");            
        // }

        const api = await response.json();
        console.log("Tratamento da api", api);
        recebeApi(api);
        // Aqui eu posso tratar a promisse para pegar apenas o que eu quero para questão

        return api;
    } catch (error) {
        return error;        
    }
}

// console.log(request("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome"));

// Recebe API
function requestApi(api) {
    console.log("Utilização da API em funções", api);
}