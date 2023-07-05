const formUser = document.querySelector("#button");
const dayUser = document.querySelector("#birthDateUserDay");
const monthUser = document.querySelector("#birthDateUserMonth");
const yearUser = document.querySelector("#birthDateUserYear");


formUser.addEventListener("click", send);
dayUser.addEventListener("input", days);
monthUser.addEventListener("blur", days);
yearUser.addEventListener("blur", days);



function send() {

    let user = {
        "name": document.querySelector("#nameUser").value,
        "birthDate": new Date(yearUser.value, monthUser.value, dayUser.value),
        "weight": parseFloat(document.querySelector("#weightUser").value),
        "height": parseInt(document.querySelector("#heightUser").value),
        "gender": document.querySelector("#genderUser").value,
    }
    
    console.log(user);
}

function days() {

    let month = monthUser.value;

    switch (month) {
        case "1":
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

        default:
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
        }

        if (dayUser.value>31) {
            dayUser.value = 31;                        
        }

        if (monthUser.value>12) {
            monthUser.value = 12;                        
        }

        if (yearUser.value>new Date().getUTCFullYear()) {
            yearUser.value = new Date().getUTCFullYear();
        }

    // Perguntar a Vitor
    /* if (month == (1 || 3 || 5 || 7 || 8 || 10 || 12)) {
                
    }

    if (month == (4 || 6 || 9 || 11)) {
        dayUser.max = 30;

        if (dayUser.maxue>30) {
            dayUser.maxue = 30;
        }
    }

    if (month == 2) {
        dayUser.max = 28;                        
    } */
}
