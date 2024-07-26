const forAno = document.querySelector("#texAno");
const result = document.querySelector("#res");
const foto = document.querySelector(".foto");

function verificar() {
    let data = new Date;
    let ano = data.getFullYear();

    console.log(forAno.value);

    if (forAno.value.length === 0 || forAno.value > ano) {
        alert("Verifique os dados e tente novamente");        
    
    } else{
        let sex = document.getElementsByName("radsex");
        let idade = ano - Number(forAno.value);
        let genero;

        let img = document.createElement("img");
        img.setAttribute("id","foto");
        
        if (sex[0].checked) {
            genero = "Homem";
            
            if (idade >= 0 && idade < 10) {
                img.setAttribute("src","https://images.pexels.com/photos/35537/child-children-girl-happy.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1");
                // Criança                
            } else if (idade < 21 || idade < 50) {
                img.setAttribute("src","https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1");
                // Adulto
                
            } else {
                img.setAttribute("src","https://images.pexels.com/photos/834863/pexels-photo-834863.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1");
                // Idoso
            }
            
        } else if (sex[1].checked) {
            genero = "Mulher";
            
            if (idade >= 0 && idade < 10) {
                img.setAttribute("src","https://images.pexels.com/photos/36029/aroni-arsa-children-little.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1");
                // Criança                
            } else if (idade < 21 || idade < 50) {
                img.setAttribute("src","https://images.pexels.com/photos/806835/pexels-photo-806835.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1");
                // Adulto
                
            } else {
                img.setAttribute("src","https://images.pexels.com/photos/788567/pexels-photo-788567.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1");
                // Idoso
            }
        }

        result.style.texAlign = "center";
        result.innerHTML = `Detectamos ${genero} com ${idade} anos`;
        
        foto.innerHTML = "";
        foto.appendChild(img);
    }
}