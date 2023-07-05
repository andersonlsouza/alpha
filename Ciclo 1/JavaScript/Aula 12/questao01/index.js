// Constantes

const button = document.querySelector("#button");
const result = document.querySelector("#result");

button.addEventListener("click", qtdPrimos);

function qtdPrimos() {

    let count;
    let res = 0;

    for (let index = 2; index <= 100000; index++) {

        count = 0;

        for (let i = 2; i <= 100000; i++) {
            if (index%i === 0) {
                count++;  
            }                        
        }

        if (count === 1) {
            res += 1;                       
        }
    }
    
    result.innerHTML = res;
}