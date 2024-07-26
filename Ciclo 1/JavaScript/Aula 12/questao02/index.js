// ***Constantes***

// Tela de resultados
const result = document.querySelector("#result");
const imgCartas = document.querySelector("#cartas");

// Botões
const embaralharCartas = document.querySelector("#botaoEmbaralhar");
const retirar = document.querySelector("#botaoRetirar");
const jogar = document.querySelector("#botaoResultado");


// ***Variáveis e constantes globais***

// Baralho
const cartas = {
    copas: [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"],
    paus: [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"],
    ouro: [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"],
    espada: [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"],
};

// Sequência de cartas de um naipe
const cartasSequencia = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];

// Baralho iniciado a cada rodada
let baralho = [];

// Jogo realizado a cada jogada
let jogo = [];


// ***Estilização padrão dos botões***

// Estilos iniciais dos botões
retirar.style.display = "none";
jogar.style.display = "none";


// ***Eventos***

// Evento de embaralhar as cartas
embaralharCartas.addEventListener("click", function () {
    retirar.style.display = "block";
    embaralhar(cartas);    
});

// Evento de retirar as cartas
retirar.addEventListener("click", function () {
    retirar.style.display = "none";
    jogar.style.display = "block";
    jogar.style.backgroundColor = "green";
    retirada();    
});

// Evento de análises dos jogos
jogar.addEventListener("click", function () {

    retirar.style.display = "none";
    jogar.style.display = "none";

    rendizarCartas(jogo);

    if (straightFlush(jogo)) {
        result.innerHTML = "Você fez um Straight Flush";
        return true;                        
    }

    if (quadra(jogo)) {
        result.innerHTML = "Você fez uma Quadra";
        return true;                        
    }

    if (fullHouse(jogo)) {
        result.innerHTML = "Você fez um Full House";
        return true;                        
    }

    if (sequencia(jogo)) {
        result.innerHTML = "Você fez uma Sequência";
        return true;                        
    }

    if (trinca(jogo)) {
        result.innerHTML = "Você fez uma Trinca";
        return true;                        
    }

    if (doisPares(jogo)) {
        result.innerHTML = "Você fez dois Pares";
        return true;                   
    }

    if (par(jogo)) {
        result.innerHTML = "Você fez um Par";
        return true;                        
    }
    result.innerHTML = "Não fez nada";
});


// Criando o array de baralho
function deck(obj) {

    baralho = [];

    for (let i = 0; i < 13; i++) {
        baralho.push([obj.copas[i], "copas"]);
        baralho.push([obj.paus[i], "paus"]);
        baralho.push([obj.ouro[i], "ouro"]);
        baralho.push([obj.espada[i], "espada"]);
    }         
}

// Função para transformar array duplo em apenas um array com números
function numerosJogo(jogo) {
    const array = [];

    for (let i = 0; i < 5; i++) {
        array[i] = jogo[i][0];
    }
    
    return array;
}

// Função para transformar array duplo em apenas um array com nipes
function nipesJogo(jogo) {
    const array = [];

    for (let i = 0; i < 5; i++) {
        array[i] = jogo[i][1];
    }
    
    return array;
}

// Função para embaralhar as cartas
function embaralhar(obj) {

    deck(obj);

    const min = -1;

    const max = 1;

    baralho.sort(function () {
        return Math.round((Math.random()*(max-min) + min));
    });
}

// Função para retirar as cartas do baralho
function retirada() {
    jogo = baralho.splice(0,5);
}

// ***Possibilidades de jogos

function straightFlush(jogo) {

    if (sequencia(jogo)) {

        const arrayNipes = nipesJogo(jogo);
        let count;
    
        for (let index = 0; index < arrayNipes.length; index++) {
            count = 0;
            for (let i = 0; i < arrayNipes.length; i++) {
                if (arrayNipes[index] == arrayNipes[i]) {
                    count++;                
                }
                if (count == 5) {
                    return 1;                
                }                        
            }
        }      
    }
    return 0; /* Não é um straight flush */
}

function quadra(jogo) {

    const array = numerosJogo(jogo);
    let count;

    for (let index = 0; index < array.length; index++) {
        count = 0;
        for (let i = 0; i < array.length; i++) {
            if (array[index] == array[i]) {
                count++;
            }
            if (count == 4) {
                return 1;                
            }                        
        }
    }
    return 0; /* Não é uma quadra. */
}

function fullHouse(jogo) {
    if (trinca(jogo) && par(jogo)) {
        return 1;        
    }
    return 0; /* Não é um Full House */    
}

function sequencia(jogo) {

    const array = numerosJogo(jogo);

    // Transformando as letras do array em apenas números
    for (let i = 0; i < array.length; i++) {
        
        if (array[i] == "J") {
            array[i] = 11;
        }
        
        if (array[i] == "Q") {
            array[i] = 12;
        }
        
        if (array[i] == "K") {
            array[i] = 13;
        }
        
        if (array[i] == "A") {
            array[i] = 14;
        }
    }
    
    array.sort(function (a, b) {
        return a - b;
    });
    
    // Comparando os dois vetores para a primeiro sequência com Ás
    if (JSON.stringify(array) == JSON.stringify([2, 3, 4, 5, 14])) {
        return 1;        
    }

    // Transformando os números do baralho em letras novamente
    for (let i = 0; i < array.length; i++) {
        
        if (array[i] == 11) {
            array[i] = "J";
        }
        
        if (array[i] == 12) {
            array[i] = "Q";
        }
        
        if (array[i] == 13) {
            array[i] = "K";
        }
        
        if (array[i] == 14) {
            array[i] = "A";
        }
    }

    // Comparando a mão do jogador com as possíveis sequências
    for (let i = 0; i <= cartasSequencia.length - 5; i++) {

        if (JSON.stringify(array) == JSON.stringify(cartasSequencia.slice(i, i+5))) {
            return 1;            
        }
    }
    return 0; /* Não é uma sequência */
}

function trinca(jogo) {

    const array = numerosJogo(jogo);

    // Combinando o vetor com ele mesmo para saber se existe uma trinca
    for (let index = 0; index < array.length; index++) {
        count = 0;
        for (let i = 0; i < array.length; i++) {
            if (array[index] == array[i]) {
                count++;                
            }
            if (count == 3) {
                return 1;                
            }                        
        }
    }

    return 0; /* Não é uma trinca. */
}

function doisPares(jogo) {

    let count = 0;

    const array = numerosJogo(jogo);

    // Combinando o vetor com ele mesmo para saber se existe dois pares
    for (let index = 0; index < array.length; index++) {
        for (let i = 0; i < array.length; i++) {
            if (array[index] == array[i] && (index != i)) {
                count++;               
            }                    
        }
    }

    // Analisei as combinações e vi que o count estava ficando sempre 4 com dois pares
    if (count == 4) {
        return 1;        
    }
    else {
        return 0; /* Não é dois pares. */
    }
}

function par(jogo) {

    let count = 0;

    const array = numerosJogo(jogo);

    // Combinando o vetor com ele mesmo para saber se existe um par
    for (let index = 0; index < array.length; index++) {
        for (let i = 0; i < array.length; i++) {
            if (array[index] == array[i] && (index != i)) {
                count++;               
            }                    
        }
    }

    if (count == 2 || count == 8) {
        return 1;        
    }
    else {
        return 0; /* Não é um par. */
    }
}

// Renderização das cartas
function rendizarCartas(jogo) {

    imgCartas.innerHTML = "";

    const arrayNumbers = numerosJogo(jogo);
    for (let i = 0; i < arrayNumbers.length; i++) {
        
        if (arrayNumbers[i] == 10) {
            arrayNumbers[i] = "T";
        }
    }
    
    const arrayNipes = nipesJogo(jogo);
    for (let i = 0; i < arrayNipes.length; i++) {
        
        if (arrayNipes[i] == "copas") {
            arrayNipes[i] = "H";
        }
        
        if (arrayNipes[i] == "paus") {
            arrayNipes[i] = "C";
        }
        
        if (arrayNipes[i] == "ouro") {
            arrayNipes[i] = "D";
        }
        
        if (arrayNipes[i] == "espada") {
            arrayNipes[i] = "S";
        }
    }

    for (let i = 0; i < arrayNipes.length; i++) {
        imgCartas.innerHTML += `<img src="deck/${arrayNumbers[i]}${arrayNipes[i]}.svg" alt="${arrayNumbers[i]}${arrayNipes[i]}">`;   
    }
}