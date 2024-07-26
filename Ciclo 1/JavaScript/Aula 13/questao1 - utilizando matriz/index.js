// ***Constantes e variáveis***

const play = document.querySelectorAll(".elemento");
const result = document.querySelector("#result");
const buttonReset = document.querySelector(".button");

let player = 1; /* O primeiro jogador é quem começa */
let count = 0; /* Contador para definir o máximo de jogadas que são 9 */
const matriz = [["","",""],["","",""],["","",""]]; /* Matriz inicialmente vazia */


// ***Estilização inicial***

buttonReset.style.display = "none"; /* O botão de reset aparece inicialmente ocultado */

// ***Eventos***

// Botão de reset
buttonReset.addEventListener("click", () => reset());

// Atribuindo eventos a cada elemento do vetor de queryselectorAll
play.forEach(function (element) {
    element.addEventListener("click", () => playSelect(element));            
});

// ***Funções***

// Escolha de cada jogador
function playSelect(element) {

    const array = JSON.parse(element.dataset.move);

    const row = array[0];
    const column = array[1];

    if (matriz[row][column] == "") {

        if (player == 1) {
            matriz[row][column] = "X";
            element.innerHTML = "X";
            player = 2; /* Passando a vez para o jogador 2 */
        } else {
            matriz[row][column] = "O";
            element.innerHTML = "O";
            player = 1; /* Passando a vez para o jogador 1 */
        }
        count++;
    }

    if (winner()) {

        for (let i = 0; i < matriz.length; i++) {
            for (let j = 0; j < matriz.length; j++) {
                matriz[i][j] = null;
            }
        }
        buttonReset.style.display = "block";       
    }
}

// Análise de jogadas
function winner() {

    // Percorrendo as linhas
    for (let i = 0; i < matriz.length; i++) {

        let countPlayer1 = 0;
        let countPlayer2 = 0;

        for (let j = 0; j < matriz[i].length; j++) {

            if (matriz[i][j] == "X") {
                countPlayer1++;                                
            }
            
            if (matriz[i][j] == "O") {
                countPlayer2++;                                
            }

            if (countPlayer1 == 3) {
                result.innerHTML = `Jogador 1 Ganhou!`;
                return true;                                
            }

            if (countPlayer2 == 3) {
                result.innerHTML = `Jogador 2 Ganhou!`;
                return true;                                
            }
        }
    }

    
    // Percorrendo as colunas
    let i = 0;
    for (let j = 0; j < matriz[i].length; j++) {

        let countPlayer1 = 0;
        let countPlayer2 = 0;

        for (let i = 0; i < matriz.length; i++) {

            if (matriz[i][j] == "X") {
                countPlayer1++;                                
            }
            
            if (matriz[i][j] == "O") {
                countPlayer2++;                                
            }

            if (countPlayer1 == 3) {
                result.innerHTML = `Jogador 1 Ganhou!`;
                return true;                                
            }

            if (countPlayer2 == 3) {
                result.innerHTML = `Jogador 2 Ganhou!`;
                return true;                                
            }
        }
    }

    // Analise da diagonal principal
    let countPlayer1 = 0;
    let countPlayer2 = 0;

    for (let i = 0; i < matriz.length; i++) {
        for (let j = 0; j < matriz.length; j++) {

            if (i==j) {
                if (matriz[i][j] == "X") {
                    countPlayer1++;                                
                }
                
                if (matriz[i][j] == "O") {
                    countPlayer2++;                                
                }
    
                if (countPlayer1 == 3) {
                    result.innerHTML = `Jogador 1 Ganhou!`;
                    return true;                                
                }
    
                if (countPlayer2 == 3) {
                    result.innerHTML = `Jogador 2 Ganhou!`;
                    return true;                                
                }
            }
        }
    }

    // Analise da digonal secundária
    countPlayer1 = 0;
    countPlayer2 = 0;
    for (let i = 0; i < matriz.length; i++) {
        for (let j = 0; j < matriz.length; j++) {

            if (matriz.length-1-i == j) {
                if (matriz[i][j] == "X") {
                    countPlayer1++;                                
                }
                
                if (matriz[i][j] == "O") {
                    countPlayer2++;                                
                }
    
                if (countPlayer1 == 3) {
                    result.innerHTML = `Jogador 1 Ganhou!`;
                    return true;                                
                }
    
                if (countPlayer2 == 3) {
                    result.innerHTML = `Jogador 2 Ganhou!`;
                    return true;                                
                }                                
            }
        }
    }

    // Ultima jogada
    if (count == 9) {
        result.innerHTML = "Empate!";
        return true;
    }
}

// Ação do botão de reset
function reset() {

    for (let i = 0; i < play.length; i++) {
        play[i].innerHTML = "";
    }
    
    for (let i = 0; i < matriz.length; i++) {
        for (let j = 0; j < matriz.length; j++) {
            matriz[i][j] = "";
        }
    }
    count = 0;
    result.innerHTML = "";
    buttonReset.style.display = "none";
    player = 1;
}