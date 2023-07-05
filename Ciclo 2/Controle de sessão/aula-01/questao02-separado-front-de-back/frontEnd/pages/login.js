// import customEvent from "../modules/customEvent.js";
import { route } from "../modules/router.js";

export function renderPageLogin() {
    const page = document.createElement("div");
    page.classList = "container";
    
    // Página estática de login
    const pageLogin =
    `
    <div>
        <h1>Bem-vindo(a)!</h1>
    </div>
    <form id="form" class="input-box">
        <input type="text" name="name" id="name-input" class="input-field" placeholder="Nome" autocomplete="off" disabled>
        <input type="text" name="email" id="e-mail-input" class="input-field" placeholder="E-mail" autocomplete="off" disabled>
        <input type="text" name="type" id="type-input" class="input-field" placeholder="Tipo" autocomplete="off" disabled>
        <input type="button" value="Logout" id="logout" class="button">
    </form>
    `;

    // Importação da página login
    page.innerHTML = pageLogin;
    
    // Renderização dos dados de input
    userInputs();
    
    // Importação dos dados do backEnd para o front
    function userInputs() {
        const inputName = page.querySelector("#name-input");
        const inputEmail = page.querySelector("#e-mail-input");
        const inputType = page.querySelector("#type-input");
        
        fetch("/login")
        .then(response => {
            console.log(response);
            if (response.ok) {
                return response.json();
            }
            throw "Usuário não logado!";
        })
        .then(data => {
            console.log(data);
            inputName.value = data.name;
            inputEmail.value = data.email;
            inputType.value = data.type;
        })
        .catch(error => console.log(error)); 
        
    }

    // Botão de logout
    const button = page.querySelector("#logout");
    button.addEventListener("click", (e) => {
        fetch("/logout", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            button.href = "/";
            route(e);
        })
        .catch(error => console.log(error));
    });              
    
    return page;
}