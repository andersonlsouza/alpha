// ***Constantes e variáveis***

const div = document.querySelector("#container-flex");

const button = document.querySelector(".button");

const audioArmBomb = new Audio("./audio/bomba78548862.mp3");

let id;

// ***Eventos***

// Evento realizado quando o usuário clica para armar a bomba
button.addEventListener("click", function () {

    // Ocultamento do botão de armar a bomba
    button.style.display = "none";

    // Controles de áudio da explosão e play no áudio de bomba acessa
    const audioExplosion = new Audio("./audio/230753659.mp3");
    audioExplosion.pause();
    audioArmBomb.play();

    // Visualização da bomba acessa
    div.innerHTML = "";
    div.innerHTML = `<img src="images/bomb-with-burning-wick-cartoon-style-vector.jpg">`;

    // Com 10 segundos a bomba acontece a explosão
    id = setTimeout(() => {
        
        // Visualização da explosão
        div.innerHTML = `<img src="images/boom-comic-explosion-comic-blast-vector-with-text-bubble-cartoon-burst-with-colorful-wordings-and-clouds-funny-explosion-bubbles-for-cartoons-with-red-white-and-y.png">`;        
        
        // Visualização do botao de armar a bomba
        button.style.display = "block";

        // Controles de áudio, pausa do tick e play na explosão
        audioArmBomb.pause();
        audioExplosion.play();
    }, 10000);
});

// Evento realizado quando o usuário clica na bomba para desarma-la
div.addEventListener("click", function () {

    // Pausa antes que a bomba exploda
    clearTimeout(id);

    button.style.display = "block";

    audioArmBomb.pause();
    
    // Visualização da bomba apagada
    div.innerHTML = "";
    div.innerHTML = `<img src="images/desarm-bomb-with-burning-wick-cartoon-style-vector.jpg">`;
});