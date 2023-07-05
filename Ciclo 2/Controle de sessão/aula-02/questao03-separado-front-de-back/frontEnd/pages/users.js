import { route } from "../modules/router.js";

export function renderPageNewUser() {

    const page = document.createElement("div");
    page.classList = "container";
    
    // Página estática de usuários
    const pageUsers =
    `
        <div>
            <h1>Bem-vindo(a) Administrador!</h1>
        </div>
        <form id="form" class="input-box">
            <input type="text" name="name" id="name-input" class="input-field" placeholder="Nome" autocomplete="off">
            <input type="text" name="email" id="e-mail-input" class="input-field" placeholder="E-mail" autocomplete="off">
            <select name="typeUser" id="typeUser-input" class="input-field">
                <option value="adm">Administrador</option>
                <option value="user">Usuário comum</option>
            </select>
            <input type="password" name="password" id="password-input" class="input-field" placeholder="Senha" autocomplete="off">
            <div class="cointainer-buttons">
                <input type="button" value="Cadastrar" id="register" class="button">
                <input type="button" value="Logout" id="logout" class="button">
            </div>
        </form>
        <p id="result"></p>
    `;

    // Importação da página login
    page.innerHTML = pageUsers;

    const buttonLogout = page.querySelector("#logout");
    const buttonRegister = page.querySelector("#register");

    // Evento de botão de logout
    buttonLogout.addEventListener("click", (e) => {
        fetch("/logout", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            buttonLogout.href = "/";
            route(e);
        })
        .catch(error => console.log(error));
    });

    // Evento de botão de login
    buttonRegister.addEventListener("click", () => {
        const name = page.querySelector("#name-input");
        const email = page.querySelector("#e-mail-input");
        const type = page.querySelector("#typeUser-input");
        const password = page.querySelector("#password-input");
        const result = page.querySelector("#result");

        // Array com todos os inputs HTML
        const inputs = page.querySelectorAll('input[class="input-field"]');

        // Verifica se existe algum input vazio
        let inputNull;
        inputs.forEach(element => {
            if (element.value === "") {
                return inputNull = true;                                    
            }
        });
        if (inputNull) {
            return result.textContent = "Todos os campos devem ser preenchidos";                
        }

        fetch("/users", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name.value,
                email: email.value,
                type: type.value,
                password: password.value
            })
        })
        .then(response => {
            if (response.ok) {
                result.textContent = "Cadastrado com sucesso";
            } else {
                result.textContent = "Falha no cadastrado";
            }
        })
        .catch(error => console.log(error));

        // Limpa todos os inputs
        inputs.forEach(element => element.value = "");
    });

    return page;
}