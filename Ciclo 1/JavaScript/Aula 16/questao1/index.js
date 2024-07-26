// ***Constantes e variáveis***
const coin = document.querySelector("#coins");
const dateStart = document.querySelector("#date-start");
const dateEnd = document.querySelector("#date-end");
const button = document.querySelector("button");
const tableHTML = document.querySelector("table");
const divTable = document.querySelector("#countainer-table");
const errorUser = document.querySelector("#error");

divTable.style.display = "none";

button.addEventListener("click", function () {

    tableHTML.innerHTML = "";
    errorUser.innerHTML = "";
    divTable.style.display = "none";

    validation();

    document.body.style.cursor = "wait";
    button.style.pointerEvents = "none";

    
    fetch(`https://economia.awesomeapi.com.br/json/daily/${coin.value}/${(dateEnd.valueAsNumber - dateStart.valueAsNumber)/(1000*60*60*24)}?start_date=${dateStart.value.replaceAll("-", "")}&end_date=${dateEnd.value.replaceAll("-", "")}`)
    .then(response => {response.json()
        .then(api => {
            console.log(api);
            divTable.style.display = "block";
            document.body.style.cursor = "auto";
            button.style.pointerEvents = "auto";
            button.style.cursor = "pointer";
            table(api);
        })
    })
    .catch(e => console.log("Deu erro:" + e.message));
});

function table(api) {

    tableHTML.innerHTML =
    `<thead>
        <tr>
            <th id="title-table" colspan="6">Cotação</th>
        </tr>

        <tr>
            <th>Data</th>
            <th>Hora</th>
            <th>Compra</th>
            <th>Venda</th>
            <th>Mínimos</th>
            <th>Máximos</th>
        </tr>
    </thead>
    <tbody id="tableElements"></tbody>`

    const tableBody = document.querySelector("#tableElements");

    console.log(api.length);

    
    for (let i = 0; i < api.length; i++) {
        
        let line = document.createElement("tr");
    
        let column1 = document.createElement("td");
        let column2 = document.createElement("td");
        let column3 = document.createElement("td");
        let column4 = document.createElement("td");
        let column5 = document.createElement("td");
        let column6 = document.createElement("td");
    
        line.appendChild(column1);       
        line.appendChild(column2);       
        line.appendChild(column3);       
        line.appendChild(column4);       
        line.appendChild(column5);
        line.appendChild(column6);
    
        tableBody.appendChild(line);
    
        column1.innerHTML = new Date(api[i].timestamp*1000).toLocaleDateString();
        column2.innerHTML = new Date(api[i].timestamp*1000).toLocaleTimeString();
        column3.innerHTML = String(api[i].ask).replace(".", ",");
        column4.innerHTML = String(api[i].bid).replace(".", ",");
        column5.innerHTML = String(api[i].low.replace(".", ","));
        column6.innerHTML = String(api[i].high).replace(".", ",");
    }  
}

function validation() {

    if (dateStart.valueAsNumber > Date.now() || dateEnd.valueAsNumber > Date.now()) {
        errorUser.innerHTML = "Data superior a atual";
        throw errorUser.innerHTML;     
    }

    if ((dateEnd.valueAsNumber - dateStart.valueAsNumber)/(1000*60*60*24) > 90) {
        errorUser.innerHTML = "Data superior a 90 dias";
        throw errorUser.innerHTML;                
    }

    if (dateStart.valueAsNumber > dateEnd.valueAsNumber) {
        errorUser.innerHTML = "Data de inicio deve ser inferior ou igual a de fim";
        throw errorUser.innerHTML;        
    }

    if (dateEnd.value == "" || dateStart.value == "") {
        errorUser.innerHTML = "Data de inicio deve ser inferior ou igual a de fim";
        throw errorUser.innerHTML;
    }                   
}