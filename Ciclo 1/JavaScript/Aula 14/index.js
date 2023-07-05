import roteador from "./modulos/roteador.js";

// Objeto que contém todas as rotas
const rota = roteador();

// Objeto do HTML para renderização de página
const root = document.querySelector("#root");

// Renderização da página principal
const page = rota.getPage("/");

// Renderização da página principal
root.appendChild(page);

// Escuta do novo evento
document.addEventListener("onstatechange", function (event) {
    
    // URL do elemento quando clicado
    const url = event.detail.url;

    // Objeto HTML de um página que foi clicada
    const page = rota.getPage(url);

    // Renderização da página clicada
    root.innerHTML = "";
    root.appendChild(page);
    window.history.pushState(null, "", event.detail.url);
});