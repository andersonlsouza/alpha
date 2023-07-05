document.querySelector("#button").addEventListener("click", function(){
    const opt = document.querySelector("#selects");
    const final_result = document.querySelector("#result");

    switch (opt.value) {
        case "option0":
            final_result.textContent = "Escolha uma opção"
        break;
            
        case "option1":
            final_result.innerHTML = "<img src='https://www.receiteria.com.br/wp-content/uploads/bisteca-de-porco-frita-01.jpg'>";
        break;
            
        case "option2":
            final_result.innerHTML = "<img src='https://frigorificoarvoredo.com.br/blog/wp-content/uploads/2018/09/picanha.jpg'>";
        break;
    
        case "option3":
            final_result.innerHTML = "<img src='https://www.comidaereceitas.com.br/img/sizeswp/1200x675/2010/02/linguica_caseira.jpg'>";
        break;
    
        case "option4":
            final_result.innerHTML = "<img src='https://t2.rg.ltmcdn.com/pt/posts/8/1/1/fraldinha_assada_no_forno_com_manteiga_9118_600.jpg'>";
        break;
    
        case "option5":
            final_result.innerHTML = "<img src='https://t1.rg.ltmcdn.com/pt/posts/3/9/4/coxa_de_frango_assada_no_forno_com_batata_5493_orig.jpg'>";
        break;
    }
});