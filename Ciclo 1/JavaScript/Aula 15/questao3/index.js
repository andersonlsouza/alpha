// ***Constantes e variáveis***

// Nodelist de dois botões (Iniciar alarme e desarmar alarme)
const button = document.querySelector(".button");

// Painel de visualização do usuário
const cronometer = document.querySelector(".result");

// Toque do alarme
const audioAlarm = new Audio("./audio/Xiaomi-12-Pro.mp3");

// Tempo fornecedido pelo o usuário
const timeUser = document.querySelectorAll(".time");

// Criação do select para o usuário, sendo o "for" mais externo para alternância dos minutos e o "for" mais interno para inserção do tempo para visualização do usuário
for (let index = 0; index < timeUser.length; index++) {
    for (let i = 1; i < 60; i++) {
        timeUser[index].innerHTML += `<option value="${i}">${String(i).padStart(2, "0")}</option>`;
    }
}

// Variáveis globais para realizar o encerramento dos loops de tempo
let id;
let id2;

// ***Eventos***

// Botão de iniciar e parar alarme
button.addEventListener("click", function () {

    if (button.textContent == "Iniciar alarme") {

        // Coloca o botão para mostrar o usuário a opção de desarmar alarme
        button.textContent = "Desarmar alarme";
        
        // Salvando tempo do usuário em variáveis
        let timeMinutes = timeUser[0].value;
        let timeSeconds = timeUser[1].value;

        // Coloca a cor do texto do cronometro para preto
        cronometer.style.color = "black";

        // Condicional, caso o usuário apenas aperte em iniciar alarme, apenas aparecerá o cronometro zerado, caso contrário será executado o setInterval
        if (timeMinutes == 0 && timeSeconds == 0) {
            cronometer.innerHTML = "00:00";        
        } else {
            id = setInterval(function () {

                // Visualização do tempo para o usuário
                cronometer.innerHTML = `${String(timeMinutes).padStart(2, "0")}:${String(timeSeconds).padStart(2, "0")}`;
                
                // Sempre que os segundos for zerado é decrementado um minuto e os segundos retornam para 60
                if (timeSeconds == 0) {
                    timeMinutes--;            
                    timeSeconds = 60;
                }
                
                // Condição para os minutos não ficarem negativos e realizar a para do setInterval
                if (timeMinutes < 0 && timeSeconds == 60) {
                    clearInterval(id);
                    id2 = setInterval(() => audioAlarm.play(), 1000);                                                              
                }

                // Condição para mudança de estilização em 5% do tempo final
                if ((timeMinutes*60 + timeSeconds)/(timeUser[0].value*60 + timeUser[1].value) <= 0.05) {
                    cronometer.style.color = "red";                                
                }

                // Decremento dos segundos ao longo do tempo
                timeSeconds--;
            }, 1000);
        }
    } else {
        // Modificando o botão para iniciar alarme quando o usuário clicar para desarmar o alarme
        button.textContent = "Iniciar alarme";

        // Paralização de todos os intervalos de tempo e áudio
        clearInterval(id);
        clearInterval(id2);
        audioAlarm.pause();

        // Coloca a cor do texto do cronometro para preto
        cronometer.style.color = "black";

        // Mostrando o usuário o cronometro zerado
        cronometer.innerHTML = "00:00";
    }
});