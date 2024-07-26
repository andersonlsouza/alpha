// ***Constantes e variáveis***

const play = document.querySelectorAll(".elemento");
const result = document.querySelector("#result");
const buttonReset = document.querySelector(".button");

let player = 1; /* O primeiro jogador é quem começa */
let count = 0; /* Contador para definir o máximo de jogadas que são 9 */

// ***Estilização inicial***

buttonReset.style.display = "none"; /* O botão de reset aparece inicialmente ocultado */

// ***Eventos***

buttonReset.addEventListener("click", () => reset(play));

play.forEach((element) => element.addEventListener("click", () => playSelect(element.dataset.move)))

// ***Funções***

// Escolha de cada jogador
function playSelect(i) {

    if (play[i].dataset.player == "") {

        if (player == 1) {
            play[i].dataset.element = "X";
            play[i].dataset.player = 1;
            play[i].innerHTML = "X";
            player = 2; /* Passando a vez para o próximo jogador */
        } else {
            play[i].dataset.element = "O";
            play[i].dataset.player = 2;
            play[i].innerHTML = "O";
            player = 1; /* Passando a vez para o próximo jogador */
        }
        count++;
    }

    if (winner()) {
        for (let i = 0; i < play.length; i++) {
            play[i].dataset.player = null;
        }

        buttonReset.style.display = "block";       
    }
}

// Análise de jogadas
function winner() {

    for (let i = 1; i <= 2; i++) {

        // Analisando as colunas
        if (play[0].dataset.player == i && play[3].dataset.player == i && play[6].dataset.player == i) {
            result.innerHTML = `Jogador ${i} Ganhou!`;
            return 1;                
        }
    
        if (play[1].dataset.player == i && play[4].dataset.player == i && play[7].dataset.player == i) {
            result.innerHTML = `Jogador ${i} Ganhou!`;
            return 1;                
        }
        
        if (play[2].dataset.player == i && play[5].dataset.player == i && play[8].dataset.player == i) {
            result.innerHTML = `Jogador ${i} Ganhou!`;
            return 1;                
        }
    
        // Analisando as linhas    
        if (play[0].dataset.player == i && play[1].dataset.player == i && play[2].dataset.player == i) {
            result.innerHTML = `Jogador ${i} Ganhou!`;
            return 1;                
        }
    
        if (play[3].dataset.player == i && play[4].dataset.player == i && play[5].dataset.player == i) {
            result.innerHTML = `Jogador ${i} Ganhou!`;
            return 1;                
        }
        
        if (play[6].dataset.player == i && play[7].dataset.player == i && play[8].dataset.player == i) {
            result.innerHTML = `Jogador ${i} Ganhou!`;
            return 1;                
        }

        // Analisando a diagonal principal  
        if (play[0].dataset.player == i && play[4].dataset.player == i && play[8].dataset.player == i) {
            result.innerHTML = `Jogador ${i} Ganhou!`;
            buttonReset.style.display = "block";
            return 1;                
        }

        // Analisando a diagonal secundária  
        if (play[2].dataset.player == i && play[4].dataset.player == i && play[6].dataset.player == i) {
            result.innerHTML = `Jogador ${i} Ganhou!`;
            buttonReset.style.display = "block";
            return 1;                
        }

        // Analisando caso ninguém ganhe
        if (count == 9) {
            result.innerHTML = "Empate!";
            return 1;
        } 
    }  
}

// Ação do botão de reset
function reset(array) {
    for (let i = 0; i < array.length; i++) {
        play[i].innerHTML = "";
        play[i].dataset.player = "";
    }        
    count = 0;
    result.innerHTML = "";
    buttonReset.style.display = "none";
    player = 1;
}