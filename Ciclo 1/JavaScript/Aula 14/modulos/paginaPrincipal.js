import eventoCustomizado from "./eventoCustomizado.js";

export default function paginaPrincipal() {

    // Elemento div que terá todo conteúdo da página
    const page = document.createElement("div");

    // Criação da div para contanainer do link
    const div1 = document.createElement("div");
    
    // Criação do link para página principal
    const a1 = document.createElement("a");
    const a2 = document.createElement("a");
    const a3 = document.createElement("a");
    a1.textContent = "Brigadeiros";
    a2.textContent = "Cupcakes";
    a3.textContent = "Doces";
    div1.appendChild(a1);
    div1.appendChild(a2);
    div1.appendChild(a3);
    
    // Criação da div que contém a imagem e o texto explicativo
    const div2 = document.createElement("div");
    div2.setAttribute("class", "countainer-flex-column card");

    // Criação do elemento HTML de imagem
    const img = document.createElement("img");
    img.src = "https://cdn6.campograndenews.com.br/uploads/noticias/2020/03/10/1xe5r60f8ghef.jpg";
    img.alt = "doceria";
    div2.appendChild(img);
    
    // Criação do elemento de HTML do texto
    const p = document.createElement("p");
    p.setAttribute("class", "text-title");
    p.textContent = "Doceria";
    div2.appendChild(p);
    
    // Colocando o conteúdo da página em uma div
    page.appendChild(div1);
    page.appendChild(div2);

    
    // Criaçao dos links
    a1.addEventListener("click", function () {
        const link1 = eventoCustomizado("/brigadeiros");
        document.dispatchEvent(link1);        
    });
    
    a2.addEventListener("click", function () {
        const link2 = eventoCustomizado("/cupcakes");
        document.dispatchEvent(link2);         
    });
    
    a3.addEventListener("click", function () {
        const link3 = eventoCustomizado("/doces");
        document.dispatchEvent(link3);                 
    });

    return page;
}