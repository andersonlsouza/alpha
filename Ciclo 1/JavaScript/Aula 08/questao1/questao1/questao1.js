// Declaração de constantes globais
const formUser = document.querySelector("#button"); /* Botão do formulário */
const nameUser = document.querySelector("#nameUser"); /* Input de nome do usuário */
const dayUser = document.querySelector("#birthDateUserDay"); /* Input do dia do mês */
const monthUser = document.querySelector("#birthDateUserMonth"); /* Input do mês */
const yearUser = document.querySelector("#birthDateUserYear"); /* Input do ano */
const weightUser = document.querySelector("#weightUser"); /* Input do peso do usuário */
const heightUser = document.querySelector("#heightUser"); /* Input da altura do usuário */
const genderUser = document.querySelector("#genderUser"); /* Input de gênero do usuário */
const resultfinally = document.querySelector("#result"); /* Resultado final */

// Constantes de erros
const erroname = document.querySelector("#erroname");
const errodate = document.querySelector("#errodate");
const erroweight = document.querySelector("#erroweight");
const erroheight = document.querySelector("#erroheight");
const errogender = document.querySelector("#errogender");


// Eventos
formUser.addEventListener("click", send);
nameUser.addEventListener("blur", names);
dayUser.addEventListener("blur", days);
monthUser.addEventListener("blur", days);
yearUser.addEventListener("blur", days);
weightUser.addEventListener("blur", weights);
heightUser.addEventListener("blur", heights);
genderUser.addEventListener("change", genders);


// Função de envio do formulário que clicado em botão
function send() {
    
    // Verificando se todas as funções estão funcionando perfeitamente para evitar erros no formulário
    try {
        names();
        days();
        weights();
        heights();
        genders();

    } catch (error) {
        throw error;
    }

    // Como melhorar esta parte? Aqui eu pego os inputs quando estão vázios para declarar erro ao usuário
    if (nameUser.value === "" || dayUser.value === "" || monthUser.value === "" || yearUser.value === "" || weightUser.value === "" || heightUser.value === "" || genderUser.value === "undefined") {
                                                        
        if (nameUser.value === "") {
            erroname.innerHTML = "<p>*preencha este item</p>";                        
        }

        if (dayUser.value === "" || monthUser.value === "" || yearUser.value === "") {
            errodate.innerHTML = "<p>*preencha todos os itens da data</p>";                        
        }

        if (weightUser.value === "") {
            erroweight.innerHTML = "<p>*preencha este item</p>";                        
        }
        
        if (heightUser.value === "") {
            erroheight.innerHTML = "<p>*preencha este item</p>";                        
        }
        
        if (genderUser.value === "undefined") {
            errogender.innerHTML = "<p>*preencha este item</p>";                        
        }

        throw new Error("Form incomplete!");                                      
    }

    // Objeto para armazenamento de dados do usuário
    let user = {
        name: nameUser.value,
        birthDate: new Date(yearUser.value, monthUser.value-1, dayUser.value),
        weight: parseFloat(weightUser.value),
        height: parseInt(heightUser.value),
        gender: genderUser.value,
    }
    
    // Inserção de dados no HTML
    resultfinally.innerHTML = `<label for="result1">Nome: <span id="result1">${nameUser.value}</span></label>
        <label for="result2">Data: <span id="result2">${new Date(yearUser.value, monthUser.value-1, dayUser.value).toLocaleString().slice(0, 10)}</span></label>
        <label for="result3">Peso (kg): <span id="result3">${parseFloat(weightUser.value)}</span></label>
        <label for="result4">Altura (cm): <span id="result4">${parseInt(heightUser.value)}</span></label>
        <label for="result5">Gênero: <span id="result5">${genderUser.value}</span></label>
        <label for="result6">Objeto em JSON: <span id="result6">${JSON.stringify(user)}</span></label>`
    
    // Mostrando no console o resultado final do objeto sem está em JSON
    console.log(user);
}

// Funçao que condiciona as datas
function days() {

    let month = monthUser.value;

    switch (month) {
        case "1":
        case "2":
            if ((yearUser.value%4 === 0) || (yearUser.value%400 === 0 && yearUser.value%100 === 0)) {
                dayUser.max = 29;

                if (dayUser.value>29) {
                    dayUser.value = 29;
                }

                break;

            } else {
                dayUser.max = 28;

                if (dayUser.value>28) {
                    dayUser.value = 28;
                }
                break;                
            }
        case "3":
        case "5":
        case "7":
        case "8":
        case "10":
        case "12":
            dayUser.max = 31;            
            break;

        case "4":
        case "6":
        case "9":
        case "11":
            dayUser.max = 30;

            if (dayUser.value>30) {
                dayUser.value = 30;                
            }

            break;           
    }
    
    // Apaga a mensagem de erro quando o usuário digita incorretamente, este artifício foi utilizado diversas vezes no código
    errodate.innerHTML = "";

    // Consideração quando o usuário digita um valor acima de 31 ou menor que 1
    if (dayUser.value>31 || dayUser.value<1) {
        try {
            throw new Error("Field “birthDate” is invalid!")
        } catch (error) {
            console.error(error);
            errodate.innerHTML = "<p>*digite um dia do mês válido</p>";            
            dayUser.value = "";                        
        }
    }

    // Consideração quando o usuário digita um valor acima de 12 ou menor que 1
    if (monthUser.value>12 || monthUser.value<1) {
        try {
            throw new Error("Field “birthDate” is invalid!")
        } catch (error) {
            console.error(error);
            errodate.innerHTML = "<p>*digite um mês válido</p>";            
            monthUser.value = "";                      
        }
    }

    // Impede que o usuário digite um ano maior que o atual ou menor que 1900
    if (yearUser.value>new Date().getUTCFullYear() || (yearUser.value<1900 && yearUser.value !== "")) {

        if (yearUser.value<1900) {
            errodate.innerHTML = "<p>*digite um ano igual ou superior a 1900</p>";
            yearUser.value = "";
            throw new Error("Field “birthDate” is invalid!");                        
        } else {
            try {
                throw new Error("Field “birthDate” is invalid!");
            } catch (error) {
                console.error(error);
                errodate.innerHTML = "<p>*digite um ano igual ou inferior ao atual</p>";
                yearUser.value = "";
            }
        }
    }

    // Impede que o usuário digite uma data superior a data atual
    if (new Date(yearUser.value, monthUser.value-1, dayUser.value).getTime() > new Date().getTime()) {
        try {
            throw new Error("Field “birthDate” is invalid!")
        } catch (error) {
            console.error(error);
            errodate.innerHTML = "<p>*digite uma data inferior a atual</p>";
            dayUser.value = "";
            monthUser.value = "";
            yearUser.value = "";                      
        }
    }      
}

// Tratamento de erros para o campo de nome
function names() {
    
    try {
        erroname.innerHTML = "";
        if (nameUser.value.length<5) {
            throw new Error("Field “name” is invalid!");
        }
    } catch (error) {
        console.error(error);
        erroname.innerHTML = "<p>*digite no mínimo 5 caracteres</p>";
    }
}

// Tratamento de erros para o campo de peso
function weights() {

    // Eu tive uma dificuldade porque está aceitando a letra e quando coloco o input type number no HTML

    erroweight.innerHTML = "";
    
    try {
        // Estou tendo problema com o ezinho (e) e a vírgula, pois eles podem ser incluisos no input type number
        if (isNaN(weightUser.value) === true) {
            throw new Error("Field “weight” is invalid!");            
        }
    } catch (error) {
        console.error(error);
        erroweight.innerHTML = "<p>*digite apenas números</p>";
        weightUser.value = "";        
    }
}

// Tratamento de erros para o campo de altura
function heights() {

    erroheight.innerHTML = "";

    try {
        if (Number.isInteger(Number(heightUser.value)) === false) {
            throw new Error("Field “height” is invalid!");            
        }
    } catch (error) {
        console.error(error);
        erroheight.innerHTML = "<p>*digite apenas números inteiros</p>";
        heightUser.value = "";        
    }
}

// Tratamento de erros para o campo de gênero
function genders() {
    
    errogender.innerHTML = "";

    try {
        if (genderUser.value === "undefined") {
            throw new Error("Field “gender” is invalid!");            
        }
    } catch (error) {
        console.error(error);
        errogender.innerHTML = "<p>*escolha um gênero</p>";
        genderUser.value = "undefined";        
    }
}