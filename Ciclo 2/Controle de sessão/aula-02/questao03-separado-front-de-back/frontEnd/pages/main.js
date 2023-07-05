import { route } from "../modules/router.js";
import { obtainValueCookie } from "../modules/obtainValueCookie.js";

export function renderMainPage() {
    const page = document.createElement("div");
    page.classList = "container";

    // Página HTML estática
    const pageMain =
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
    page.innerHTML = pageMain;

    const myCookie = obtainValueCookie('token');
    if (myCookie) {

        // fetch(`/user/${myCookie}`)
        fetch(`/login`)
        .then(response => response.json())
        .then(data => {
            if (data.isAdmin) {
                window.history.pushState({}, "", "/users");
            }
            else {
                window.history.pushState({}, "", "/login");
            }
            route();
        })
        .catch(error => {
            console.log(error);
        })
    } else {
        // Formulário de preenchimento
        const form = page.querySelector("#form");
        const result = page.querySelector("#result");
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
    
            fetch("/system", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: form.email.value, password: form.password.value })
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    result.textContent = "E-mail ou senha inválidos";
                }
            })
            .then(data => {
                if (data.isAdmin) {
                    form.action = "/users";
                } else {
                    form.action = "/login";
                }
                route(e);
            })
            .catch(error => console.log(error));
        });
    }


    return page;
}