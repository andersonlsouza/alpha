const button = document.querySelector("#logout");
userInputs();

button.addEventListener("click", () => {
    fetch("/logout", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => window.location.replace('/'))
    .catch(error => console.log(error));
});

// Tenho que aprender utilizando Try Catch com função assincrona
function userInputs() {
    const inputName = document.querySelector("#name-input");
    const inputEmail = document.querySelector("#e-mail-input");
    const inputType = document.querySelector("#type-input");

    fetch("/system")
    .then(response => response.json())
    .then(data => {
        inputName.value = data.name;
        inputEmail.value = data.email;
        inputType.value = data.type;
    })
    .catch(error => console.log(error));                
}