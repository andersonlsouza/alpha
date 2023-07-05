// Inputs do arquivo vo HTML
const form = document.querySelector("#form");
const emailUser = document.querySelector("#e-mail-input");
const password = document.querySelector("#password-input");
const result = document.querySelector("#result");


// Formulário de preenchimento
form.addEventListener("submit", e => {
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
            window.location.replace('/login');
        } else {
            result.textContent = "E-mail ou senha inválidos";
        }
    })
    .catch(error => console.log(error));
});