// Evento de click do botão
document.querySelector("#button").addEventListener("click", function(){
    const dat = new Date(new Date(document.querySelector("#date").value));

    // Pegar data do dia, mês, ano e nome do dia de uma data completa
    let dt = dat.getUTCDate();
    let month = dat.getUTCMonth();
    let year = dat.getUTCFullYear();
    let day = dat.getUTCDay();

    // Adicionando dados da data no HTML
    document.querySelector("#result1").textContent = dt;    
    document.querySelector("#result2").textContent = month+1;    
    document.querySelector("#result3").textContent = year;
    
    // Dias por extenso
    switch (day) {
        case 0:
            document.querySelector("#result4").textContent = "Domingo";
            break;
            
        case 1:
            document.querySelector("#result4").textContent = "Segunda";
            break;
        
        case 2:
            document.querySelector("#result4").textContent = "Terça";
            break;
        
        case 3:
            document.querySelector("#result4").textContent = "Quarta";
            break;
        
        case 4:
            document.querySelector("#result4").textContent = "Quinta";
            break;
        
        case 5:
            document.querySelector("#result4").textContent = "Sexta";
            break;
        
        case 6:
            document.querySelector("#result4").textContent = "Sábado";
            break;
    
        default:
            break;
    }

    const result_month = document.querySelector("#result5");

    // Meses por extenso
    switch (month) {
        case 0:
            result_month.textContent = "Janeiro";
            break;
        
        case 1:
            result_month.textContent = "Fevereiro";
            break;
        
        case 2:
            result_month.textContent = "Março";
            break;
        
        case 3:
            result_month.textContent = "Abril"
            break;
        
        case 4:
            result_month.textContent = "Maio";
            break;
        
        case 5:
            result_month.textContent = "Junho";
            break;
        
        case 6:
            result_month.textContent = "Julho";
            break;
        
        case 7:
            result_month.textContent = "Agosto";
            break;
        
        case 8:
            result_month.textContent = "Setembro";
            break;
        
        case 9:
            result_month.textContent = "Outubro";
            break;
        
        case 10:
            result_month.textContent = "Novembro";
            break;
        
        case 11:
            result_month.textContent = "Dezembro";
            break;
    
        default:
            break;
    }

    // Tempo em millisegundos a partir da data de 1970
    let timestamp = dat.getTime();
    document.querySelector("#result6").textContent = timestamp;
});