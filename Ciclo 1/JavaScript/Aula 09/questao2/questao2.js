// Declaração de constantes globais
const formUser = document.querySelector("#button"); /* Botão do formulário */
const dayUser = document.querySelector("#birthDateUserDay"); /* Input do dia do mês */
const monthUser = document.querySelector("#birthDateUserMonth"); /* Input do mês */
const yearUser = document.querySelector("#birthDateUserYear"); /* Input do ano */
const genderUser = document.querySelector("#genderUser"); /* Input de gênero do usuário */
const resultfinally = document.querySelector("#result"); /* Resultado final */


// Constantes de erros
const errodate = document.querySelector("#errodate");
const errogender = document.querySelector("#errogender");


// Eventos
formUser.addEventListener("click", send);
dayUser.addEventListener("blur", days);
monthUser.addEventListener("blur", days);
yearUser.addEventListener("blur", days);
genderUser.addEventListener("change", genders);


// Função de envio do formulário que clicado em botão
function send() {
    
    // Verificando se todas as funções estão funcionando perfeitamente para evitar erros no formulário
    try {
        days();
        genders();

    } catch (error) {
        throw error;
    }

    // Como melhorar esta parte? Aqui eu pego os inputs quando estão vázios para declarar erro ao usuário
    if (dayUser.value === "" || monthUser.value === "" || yearUser.value === "" || genderUser.value === "undefined") {

        if (dayUser.value === "" || monthUser.value === "" || yearUser.value === "") {
            errodate.innerHTML = "<p>*preencha todos os itens da data</p>";                        
        }
        
        if (genderUser.value === "undefined") {
            errogender.innerHTML = "<p>*preencha este item</p>";                        
        }

        throw new Error("Form incomplete!");                                      
    }

    // Objeto para armazenamento de dados do usuário
    let person = {
        birthDate: new Date(yearUser.value, monthUser.value-1, dayUser.value),
        gender: genderUser.value,
        daysToDeath: function () {
            let result;
            let health;
            let extendDate;
            let currentDate = new Date;

            if(person.gender === "masc"){
                health = 73.1;

                extendDate = person.birthDate.setUTCFullYear(person.birthDate.getUTCFullYear() + health);

                result = (person.birthDate.getTime() - currentDate.getTime())/86400000;

                return result;   

            } else {

                health = 80.1;

                extendDate = person.birthDate.setUTCFullYear(person.birthDate.getUTCFullYear() + health);

                result = (person.birthDate.getTime() - currentDate.getTime())/86400000;

                return result;
            }                        
        }
    }
    
    // Inserção de dados no HTML
    resultfinally.innerHTML = `<label>Dias para morte: <span>${person.daysToDeath()}</span></label>`
    
    // Mostrando no console o resultado final do objeto sem está em JSON
    console.log(person);
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