// Constantes
const buttonApresentation = document.querySelector("#apresentation");
const text = document.querySelector("#text");


// Eventos
buttonApresentation.addEventListener("click", introduce);

function introduce() {
    text.innerHTML = "Me chamo Anderson, sou de Santa Cruz do Capibaribe no estado de Pernambuco, gosto de jogar vídeo game e jogar vôlei."        
}