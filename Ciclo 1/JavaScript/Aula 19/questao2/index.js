// Execução da função para mostrar os decks
showDeck();

// ***Funções assíncronas***

async function newDeck() {
    try {
        const url = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";

        const api = await (await fetch(url)).json();

        const deckId = api.deck_id;

        return deckId;        
    } catch (error) {
        return error;
    }    
}

async function removeFiveCarts() {
    
    try {
        const id = await newDeck();
        const url = `https://deckofcardsapi.com/api/deck/${id}/draw/?count=1`;
        const carts = [];
        
        for (let i = 0; i < 5; i++) {
            const api = await (await fetch(url)).json();
            carts.push(api.cards[0].image);
        }

        return carts;

    } catch (error) {
        return error;        
    }
}

async function promiseAll() {
    try {
        const results = await Promise.all([newDeck(), removeFiveCarts()]);
        return results;
    } catch (error) {
        return error;
    }
}

// ***Funções normais***

function showDeck() {
    promiseAll().then((array) => {
        const imageCarts = document.querySelector(".card");

        for (let i = 0; i < array[1].length; i++) {
            imageCarts.innerHTML += `<img src="${array[1][i]}">`;
        }
    })     
}