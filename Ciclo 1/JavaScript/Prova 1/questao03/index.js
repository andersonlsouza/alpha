// Constantes
const textUser = document.querySelector("#input");
const text = document.querySelector("#text");


// Eventos
textUser.addEventListener("input", textsync);

function textsync() {

    text.innerHTML = textUser.value;
}