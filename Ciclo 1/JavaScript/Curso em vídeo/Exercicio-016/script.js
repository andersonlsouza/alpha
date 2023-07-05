const inicio = document.querySelector("#inicio");
const fim = document.querySelector("#fim");
const passo = document.querySelector("#passo");
const botao = document.querySelector("#botao");
const res = document.querySelector("#res");

botao.addEventListener("click", contar);

function contar() {
    if (inicio.value === "" || fim.value === "" || passo.value === "") {
        res.innerHTML = "Todos os campos devem ser preenchidos";
        throw "Existe algum campo vazio";
                        
    } else if (passo.value == 0) {
        res.innerHTML = "Digite um valor de passo que não seja zero";
        throw "O passo foi definido como zero";
               
    } else {
        
        const inicioNum = Number(inicio.value);
        const passoNum = Number(passo.value);

        let i = inicioNum;

        // Resolução utilizando vetor
        /* let string = [];

        while (i < fim.value) {

            string.push(i);
            i += passoNum;
        }

        res.innerHTML = string; */


        // Resolução utilizando o appendChild
        res.innerHTML = "<p>Contando!!</p>"

        /* while (i < fim.value) {

            let contagem = document.createElement("span");

            if (i < fim.value - passoNum) {
                contagem.textContent = i + ", ";
                
                res.appendChild(contagem);
                
            } else {
                contagem.textContent = i;
                
                res.appendChild(contagem);
            }

            i += passoNum;
            console.log(i);
        } */

        // Forma mais simples resolvida na internet
        while (i < fim.value) {
            
            if (i < fim.value - passoNum) {
                res.innerHTML += `${i} \u{1F449}`;
                
            } else {
                res.innerHTML += `${i} \u{1F44F}`;
            }
            i += passoNum;
        }
    }    
}