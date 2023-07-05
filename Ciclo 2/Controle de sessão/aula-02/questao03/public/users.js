const buttonLogout = document.querySelector("#logout");
const buttonRegister = document.querySelector("#register");

// Evento de botão de logout
buttonLogout.addEventListener("click", () => {
    fetch("/logout", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => window.location.replace('/'))
    .catch(error => console.log(error));
});

// Evento de botão de login
buttonRegister.addEventListener("click", () => {
    const name = document.querySelector("#name-input");
    const email = document.querySelector("#e-mail-input");
    const type = document.querySelector("#typeUser-input");
    const password = document.querySelector("#password-input");
    const result = document.querySelector("#result");

    // Array com todos os inputs HTML
    const inputs = document.querySelectorAll('input[class="input-field"]');

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