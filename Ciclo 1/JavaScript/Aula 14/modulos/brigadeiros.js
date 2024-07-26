import eventoCustomizado from "./eventoCustomizado.js";

export default function brigadeiros() {

    const page = document.createElement("div");

    // Criação da div para contanainer do link
    const div1 = document.createElement("div");
    
    // Criação do link para página principal
    const a = document.createElement("a");
    a.textContent = "Página principal";
    div1.appendChild(a);
    
    // Criação da div que contém a imagem e o texto explicativo
    const div2 = document.createElement("div");
    div2.setAttribute("class", "countainer-flex-column card");

    // Criação do elemento HTML de imagem
    const img = document.createElement("img");
    img.src = "https://i.ytimg.com/vi/aX384FauHPg/maxresdefault.jpg";
    img.alt = "brigadeiros";
    div2.appendChild(img);
    
    // Criação do elemento de HTML do texto
    const p = document.createElement("p");
    p.setAttribute("class", "text-title");
    p.textContent = "Brigadeiros";
    div2.appendChild(p);

    page.appendChild(div1);
    page.appendChild(div2);

    a.addEventListener("click", function () {
        const link1 = eventoCustomizado("/");
        document.dispatchEvent(link1);        
    });

    return page;
}