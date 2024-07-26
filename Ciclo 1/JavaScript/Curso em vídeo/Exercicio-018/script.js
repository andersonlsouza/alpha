const num = document.querySelector("#num");
const botaoadd = document.querySelector("#add");
const menu = document.querySelector("#menu");
const botaofinalizar = document.querySelector("#finalizar");
const res = document.querySelector("#res");

botaoadd.addEventListener("click", add);
botaofinalizar.addEventListener("click",finalizar);

const array = [];


function add() {

    let num1 = num.value;

    if (num1.length == 0) {
        res.innerHTML = "Digite um número no primeiro campo";

    } else if (num1 < 0 || num1 >100) {
        res.innerHTML = "Digite um valor entre 0 e 100";

    } else if (validacao(num1, array)) {
        res.innerHTML = "";

        let option = document.createElement("option");
    
        option.textContent = `Valor "${num1}" adicionado`;
        menu.appendChild(option); 
    
        array.push(num1);
    }
}

function finalizar() {

    res.innerHTML = "";

    let i = 0;
    let maior = array[0];
    let menor = array[0];
    let soma = 0;
    let media;

    while (i < array.length) {
        if (array[i] > maior) {
            maior = array[i];
        }
        
        if (array[i] < menor) {
            menor = array[i];            
        }

        soma += Number(array[i]);

        media = soma/array.length;

        i++;
    }

    res.innerHTML = `<p>Ao todo temos ${array.length} números cadastrados.</p>
                    <p>O maior valor informado foi ${maior}.</p>
                    <p>O menor valor informado foi ${menor}.</p>
                    <p>Somando todos os valores, temos ${soma}.</p>
                    <p>A média dos valores digitados é ${media}.</p>`
}

// Validação para encontrar dentro do vetor algum item que já foi colocado antes
function validacao(n, l) {
    if (l.indexOf(n) != -1) {
        res.innerHTML = "Número já encontrado na lista";
        return false;        
    } else {
        return true;
    }    
}