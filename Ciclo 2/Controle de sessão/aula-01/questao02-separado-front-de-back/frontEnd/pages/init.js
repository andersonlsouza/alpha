// import customEvent from "../modules/customEvent.js";
// import router from "../modules/router.js";

import { route } from "../modules/router.js";

export function renderPageInit() {
    const page = document.createElement("div");
    page.classList = "container";

    // Página HTML estática
    const pageInit =
    `
    <div>
        <h1>LOGIN</h1>
    </div>
    <form id="form" class="input-box">
        <input type="text" name="email" id="e-mail-input" class="input-field" placeholder="E-mail" autocomplete="off">
        <input type="password" name="password" id="password-input" class="input-field" placeholder="Senha" autocomplete="off">
        <input type="submit" value="Entrar" id="login" class="button">
    </form>
    <p id="result"></p>
    `;
    
    // Renderização da página inicial
    page.innerHTML = pageInit;

    // Formulário de preenchimento
    const form = page.querySelector("#form");
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        fetch("/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: form.email.value, password: form.password.value })
        })
        .then(response => {
            console.log(response);
            
            if (response.ok) {
                // form.login.formAction = "/login";
                form.action = "/login";
                // console.log(e);
                // form.login.href = "/login";
                route(e);
                // button.addEventListener("click", route);

            } else {
                const result = page.querySelector("#result");
                result.textContent = "E-mail ou senha inválidos";
            }
        })
        .catch(error => console.log(error));
    });

    return page;
}