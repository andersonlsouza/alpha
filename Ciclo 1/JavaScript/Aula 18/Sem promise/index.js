// ***Constantes e variáveis***

// Constantes
const state = document.querySelector("#state");
const city = document.querySelector("#city");
const tableHTML = document.querySelector("table");
const containerTable = document.querySelector("#countainer-table");
const error = document.querySelector("#error");

// **Estilização inicial**
containerTable.style.display = "none";
city.style.display = "none";

// Requisição para obtenção dos ID dos estados
fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
    .then(response => {response.json()
        .then(api => {

            for (let i = 0; i < api.length; i++) {
                state.innerHTML += `<option value="${api[i].id}">${api[i].nome} (${api[i].sigla})</option>`
            }
        })
    })
.catch(e => console.log("Deu erro:" + e.message));

// ***Eventos***

// Select dos estados
state.addEventListener("change", statesAndCities);

// Select das cidades
city.addEventListener("change", previsionTemp);

// **Funções**

// Função para filtro das cidades por estado e criação da tabela inicial
function statesAndCities() {

    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state.value}/distritos?orderBy=nome`)
    .then(response => {response.json()
        .then(api => {

            city.innerHTML = "";

            for (let i = 0; i < api.length; i++) {
                if (i == 0) {
                    city.style.display = "block";
                    city.innerHTML = `<option value=""></option>`

                }
                city.innerHTML += `<option value="${api[i].municipio.id}">${api[i].nome}</option>`
            }
        })
    })
    .catch(e => console.log("Deu erro:" + e.message));
    
}

// Tabela de previsão do tempo
function previsionTemp() {

    // Estilização do segundo select
    
    containerTable.style.display = "block";

    // Geocode da cidade
    const idCity = city.value;

    // Tive muitos problemas para acessar os objetos

    fetch(`https://apiprevmet3.inmet.gov.br/previsao/${city.value}`)
    .then(response => {response.json()
        .then(api => {

            const today = new Date().toLocaleDateString();
            const tomorrow = new Date(new Date().setUTCDate(new Date().getUTCDate() + 1)).toLocaleDateString();
            const array = [];
            
            for (const campo in api[idCity]) {
                
                // Tiver problemas com esse objeto
                const obj = {};

                if (campo == today || campo == tomorrow) {
                    obj.data = campo;
                    // Acesso ao objeto
                    obj.dia = api[idCity][campo].manha.dia_semana;
                    obj.tempo = api[idCity][campo].manha.icone;
                    obj.resumo = api[idCity][campo].manha.resumo;
                    obj.tempMin = api[idCity][campo].manha.temp_min;
                    obj.tempMax = api[idCity][campo].manha.temp_max;
                    
                } else {
                    obj.data = campo;
                    obj.dia = api[idCity][campo].dia_semana;
                    obj.tempo = api[idCity][campo].icone;
                    obj.resumo = api[idCity][campo].resumo;
                    obj.tempMin = api[idCity][campo].temp_min;
                    obj.tempMax = api[idCity][campo].temp_max;
                }
                array.push(obj);                                                            
            }
            table(array);
        })
    })
    .catch(e => console.log("Deu erro:" + e.message));
}

// Renderizaçao da tabela
function table(array) {

    tableHTML.innerHTML =
    `<thead>
        <tr>
            <th id="title-table" colspan="6">Previsão do tempo</th>
        </tr>

        <tr>
            <th>Data</th>
            <th>Dia da semana</th>
            <th>Tempo</th>
            <th>Resumo</th>
            <th>Temperatura máxima</th>
            <th>Temperatura mínima</th>
        </tr>
    </thead>
    <tbody id="tableElements"></tbody>`

    const tableBody = document.querySelector("#tableElements");
    
    for (let i = 0; i < array.length; i++) {
        
        let line = document.createElement("tr");
    
        let column1 = document.createElement("td");
        let column2 = document.createElement("td");
        let column3 = document.createElement("td");
        let img = document.createElement("img");
        let column4 = document.createElement("td");
        let column5 = document.createElement("td");
        let column6 = document.createElement("td");
    
        line.appendChild(column1);       
        line.appendChild(column2);       
        line.appendChild(column3);       
        column3.appendChild(img);       
        line.appendChild(column4);       
        line.appendChild(column5);
        line.appendChild(column6);
    
        tableBody.appendChild(line);
    
        column1.innerHTML = array[i].data;
        column2.innerHTML = array[i].dia;
        // Não entendi porque só funciona com o SRC
        img.src = array[i].tempo;
        column4.innerHTML = array[i].resumo;
        column5.innerHTML = `${array[i].tempMin} °C`;
        column6.innerHTML = `${array[i].tempMax} °C`;
    }
}