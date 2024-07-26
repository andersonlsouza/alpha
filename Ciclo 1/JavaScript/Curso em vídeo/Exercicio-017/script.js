const num = document.querySelector("#numero");
const botao = document.querySelector("#botao");
const res = document.querySelector("#res");

botao.addEventListener("click", tabela);

function tabela() {
    if (num.value === "") {
        res.innerHTML = "O campo de número de ser preenchido";
        throw "Existe algum campo vazio";
                        
    } else {

        res.innerHTML = "";

        let num1 = num.value;
        
        let i = 0;
        while (i <= 10) {
            let calc = num1*i;
            
            let option = document.createElement("option");

            option.value = `tab${i}`;

            option.textContent = `${num1} X  ${i} = ${calc}`;
            res.appendChild(option);

            i++;
        }
    }    
}