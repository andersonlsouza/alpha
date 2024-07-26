// Fotos

// Foto de homem adulto: https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
// Foto de homem idoso: https://images.pexels.com/photos/834863/pexels-photo-834863.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
// Foto de mulher adulta: https://images.pexels.com/photos/806835/pexels-photo-806835.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
// Foto de mulher idosa: https://images.pexels.com/photos/788567/pexels-photo-788567.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
// Menino: https://images.pexels.com/photos/35537/child-children-girl-happy.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
// Menina: https://images.pexels.com/photos/36029/aroni-arsa-children-little.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1

// Constantes
const msg = document.querySelector("#msg");
const imagem = document.querySelector("#imagem");

// document.querySelector("body").addEventListener("load", carregar);

function carregar() {
    let data = new Date();
    let hora = data.getHours();

    msg.innerHTML = `Agora são ${hora} horas`;
    
    if (hora >= 0 && hora < 12) {
        document.body.style.background = "#e2cd9f";
        imagem.src = "https://images.pexels.com/photos/2240000/pexels-photo-2240000.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";        
    } else if(hora >= 12 && hora < 18) {
        document.body.style.background = "#b9846f";
        imagem.src = "https://images.pexels.com/photos/2386144/pexels-photo-2386144.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";        
    } else {
        document.body.style.background = "#515154";
        imagem.src = "https://images.pexels.com/photos/6059094/pexels-photo-6059094.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
    }
}
