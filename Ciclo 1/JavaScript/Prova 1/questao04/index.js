// Eu alterei o arquivo depois da prova para ver onde eu estava errando

const formUser = document.querySelector("#button");
const result = document.querySelector("#text");

formUser.addEventListener("click", send);

function send() {

    let person = {
        name: document.querySelector("#nameUser").value,
        age: document.querySelector("#ageUser").value,
        gender: document.querySelector("#genderUser").value,
        // welcome: `Seja bem-vindo(a) ${person.name}, você tem ${person.age} anos de idade`,
    }
    
    person["welcome"] = `Seja bem-vindo(a) ${person.name}, você tem ${person.age} anos de idade`; /* Na hora da prova eu tinha que fazer isso */
    
    result.innerHTML = JSON.stringify(person);    
}
