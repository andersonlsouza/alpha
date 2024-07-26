document.querySelector("#button").addEventListener("click", function(){
    let value = parseInt(document.querySelector("#number-0-10").value);
    const result = document.querySelector("#result");

    switch (value) {
        case 0:
            result.textContent = "Zero";
            break;
    
        case 1:
            result.textContent = "Um";
            break;
    
        case 2:
            result.textContent = "Dois";
            break;
    
        case 3:
            result.textContent = "Três";
            break;
    
        case 4:
            result.textContent = "Quatro";
            break;
    
        case 5:
            result.textContent = "Cinco";
            break;
    
        case 6:
            result.textContent = "Seis";
            break;
    
        case 7:
            result.textContent = "Sete";
            break;
    
        case 8:
            result.textContent = "Oito";
            break;
    
        case 9:
            result.textContent = "Nove";
            break;
    
        case 10:
            result.textContent = "Dez";
            break;
    
        default:
            result.textContent = "Digitar um número entre 0 e 10";
            break;
    }
});