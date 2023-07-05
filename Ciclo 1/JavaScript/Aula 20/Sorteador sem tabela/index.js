// ***Constantes iniciais***
const play = document.querySelector("#play");
const list = document.querySelector("#list");
const result = document.querySelector("#result");
const divTable = document.querySelector("#cards");
const globe = document.querySelector("#drawn");
const cardsDrawn = [];

// ***Estilização inicial***
play.style.display = "none";

// ***Eventos***
play.addEventListener("click", function () {
    play.style.display = "none";
    list.style.display = "none";
    globe.innerHTML = "";
    result.innerHTML = "";
    
    init();            
})

list.addEventListener("click", function () {
    
    play.style.display = "block";
    result.innerHTML = "";

    cardsDrawn.push(cards());
    table(cardsDrawn[cardsDrawn.length - 1].listCard());
})

// ***Funções***
function cards() {
    const numbersPerCard = 10;
    const min = 1;
    const max = 75;
    const card = [];
    let count = 0;

    function listCard() {
        
        while (card.length < numbersPerCard) {
            const drawn = Math.round(Math.random()*(max-min) + min);
    
            if (card.indexOf(drawn) == -1) {
                card.push(drawn);
            }
        }
    
        card.sort((a, b) => a - b);

        return card;
    }

    function drawnCard(numberDrawn) {
        const search = card.indexOf(numberDrawn);

        return search;
    }

    function checkCard(number) {

        if (card.indexOf(number) > -1) {
            count++;
            if (count == numbersPerCard) {
                return true;
            }
            return false;
        }      
    }

    return {
        listCard: listCard,
        drawnCard: drawnCard,
        checkCard: checkCard,
    }
}

function drawer(min, max) {
    const drawnNumbers = [];

    function raffle() {
        
        const drawn = Math.round(Math.random()*(max-min) + min);
        
        if (!checkDrawn(drawn)) {
            drawnNumbers.push(drawn);
            return drawn;
        } else {
            return raffle();
        }                        
    }
    
    function checkDrawn(element) {
        
        // Primeira condição é para saber se existe um número já sorteado, falso para quando não for sorteado
        if (drawnNumbers.indexOf(element) == -1) {
            return false;                               
        } else {
            return true;
        }         
    }

    return {
        raffle: raffle,
        checkDrawn: checkDrawn,
        drawnNumbers: drawnNumbers,
        max: max,
    };    
}

function init() {
    // const min = 1;
    // const max = 12; /* Lembrar de mudar aqui no final */
    const time = 5000; /* Lembrar de mudar aqui no final */
    const drawerGlobe = drawer(1, 75);
    
    let count = 0;
    
    const id = setInterval(() => {
        const numberDrawn = drawerGlobe.raffle();
        globe.innerHTML += numberDrawn + " ";
        count++;
        
        for (let i = 0; i < cardsDrawn.length; i++) {

            const positionNumber = cardsDrawn[i].drawnCard(numberDrawn);

            if (positionNumber > -1) {
                const column = document.querySelectorAll(`[data-card="${i + 1}"]`);

                // Vou terminar aqui
                column[positionNumber].style.cursor = "pointer";
                // column[positionNumber].style.backgroundColor = "blue";

                column[positionNumber].addEventListener("click", function sorteado() {
                    column[positionNumber].removeEventListener("click", sorteado);
                    column[positionNumber].style.backgroundColor = "var(--input-background)";

                    if (cardsDrawn[i].checkCard(numberDrawn)) {
                        clearInterval(id);
                        result.innerHTML = `A cartela ${i + 1} venceu!`;
                        divTable.innerHTML = "";
                        cardsDrawn.length = 0;
                        list.style.display = "block";
                        count = 0;
                        return;                                
                    }
                });              
            }
        }
        if (count == drawerGlobe.max) {
            console.log("Encerrado");
            clearInterval(id); 
        }
    }, time);
}


function table(array) {

    const tableHTML = document.createElement("table");
    const tableBody = document.createElement("tbody");
    const thead = document.createElement("thead");
    const tr = document.createElement("tr");
    const th = document.createElement("th");

    th.setAttribute("colspan", array.length);
    th.textContent = `Cartela ${cardsDrawn.length}`;
    
    tableHTML.appendChild(thead);
    thead.appendChild(tr);
    tr.appendChild(th);
    
    const column = [];
    column.length = array.length; /* Quantidade de colunas da tabela */
    
    
    // array.length é a quantidade de linhas da tabela que sempre é variável de acordo com a quantidade de dados
    // Criação de cada linha da tabela
    let line = document.createElement("tr");
    
    // Criação das colunas de acordo com a quantidade infomada na constante column
    for (let j = 0; j < column.length; j++) {
        column[j] = document.createElement("td");
        column[j].dataset.column = j;
        column[j].dataset.card = cardsDrawn.length;
        line.appendChild(column[j]);                               
        column[j].innerHTML = `<p class="text">${array[j]}</p>`;
    }
    
    tableBody.appendChild(line);

    tableHTML.appendChild(tableBody);
    divTable.appendChild(tableHTML);
}