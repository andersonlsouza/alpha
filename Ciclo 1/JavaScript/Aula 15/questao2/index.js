// ***Constantes e variáveis***

// Div onde contém a imagem da bomba
const div = document.querySelector("#container-flex");

// Importando o objeto HTML de imagem no JavaScript
const img = document.querySelector("img");

// Botão para armar a bomba
const button = document.querySelector(".button");

// Áudio de tick da bomba
const audioTick = new Audio("./audio/tick.mp3");

// Variaveis globais para realização das pausas do evento de tempo
let id;
let id2;

// ***Eventos***

// Botão de armar a bomba
button.addEventListener("click", function () {
    
    // Importação do áudio para o JavaScript
    const audioExplosion = new Audio("./audio/230753659.mp3");
    audioExplosion.pause();
    
    // Início do tempo
    let time = 60;
    
    // Ocultamento do botão de desarmar a bomba
    button.style.display = "none";
    
    // Inserção da imagem da bomba acessa
    img.src = "";
    img.src = "images/bomb-with-burning-wick-cartoon-style-vector.jpg";

    // Descremento do tempo e execução do áudio de tick a cada segundo
    id = setInterval(function () {

        time--;

        document.querySelector("#time").innerHTML = `${time}`;
    
        audioTick.play();

    }, 1000);

    // Explosão da bomba quando o tempo é esgotado
    id2 = setTimeout(() => {
        
        // Imagem da explosão
        img.src = "images/boom-comic-explosion-comic-blast-vector-with-text-bubble-cartoon-burst-with-colorful-wordings-and-clouds-funny-explosion-bubbles-for-cartoons-with-red-white-and-y.png";        
        
        // Mostra o botão de armar a bomba para o usuário
        button.style.display = "block";

        // Controle dos áudios
        audioTick.pause();
        audioExplosion.play();

        // Encerra o decremento do tempo
        clearInterval(id);

        document.querySelector("#time").innerHTML = "";
    }, 60000);
});

// Quando o usuário clica na bomba ela é dersamada
div.addEventListener("click", function () {

    // Pausa todos os eventos de tempo
    clearInterval(id);
    clearTimeout(id2);

    // Mostra o botão de armar bomba para o usuário
    button.style.display = "block";

    // Pausa o som de tick da bomba
    audioTick.pause();
    
    // Mostra a imagem da bomba desarmada
    img.src = "";
    img.src = "images/desarm-bomb-with-burning-wick-cartoon-style-vector.jpg";
});