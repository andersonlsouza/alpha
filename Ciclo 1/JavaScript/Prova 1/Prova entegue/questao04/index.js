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

    console.log(person.age);

    console.log(JSON.stringify(person));
    
    result.innerHTML = JSON.stringify(person);    
}
