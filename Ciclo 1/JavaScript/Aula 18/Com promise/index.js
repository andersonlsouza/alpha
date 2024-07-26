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
.then(response => {
    // Tratamento da promise recebida pela API
    myPromise(response).then(api => {
        // Visualização dos estados para o usuário logo quando carrega a página
        for (let i = 0; i < api.length; i++) {
            state.innerHTML += `<option value="${api[i].id}">${api[i].nome} (${api[i].sigla})</option>`
        }            
    }).catch(erro => error.innerHTML = erro);
})

// ***Eventos***

// Select dos estados
state.addEventListener("change", statesAndCities);

// Select das cidades
city.addEventListener("change", previsionTemp);

// **Funções**

// Função para filtro das cidades por estado e criação da tabela inicial
function statesAndCities() {

    // Estilização do mouse para carregamento
    state.style.pointerEvents = "none";
    document.body.style.cursor = "wait";

    // Requisição a API de nome de cidades
    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state.value}/distritos?orderBy=nome`)
    .then(response => {
        myPromise(response).then(api => {

            // Reinicialização dos nomes das cidades para o usuário
            city.innerHTML = "";

            // Estilização do mouse para padrão
            state.style.pointerEvents = "auto";
            document.body.style.cursor = "auto";

            // Loop para visualiação dos nomes das cidades para o usuário
            for (let i = 0; i < api.length; i++) {
                if (i == 0) {
                    city.style.display = "block";
                    city.innerHTML = `<option value=""></option>`

                }
                city.innerHTML += `<option value="${api[i].municipio.id}">${api[i].nome}</option>`
            }
        }).catch(erro => error.innerHTML = erro);
    })
}

// Criaçao da nova promessa
function myPromise(response) {
    
    const promise = new Promise((resolve, reject) => {
        if (response.status == 200) {
            error.innerHTML = "";
            resolve(response.json());        
        }
        reject("Dados não carregados");
    });

    return promise;    
}

// Tabela de previsão do tempo
function previsionTemp() {

    // Estilização do segundo select
    containerTable.style.display = "block";

    // Geocode da cidade
    const geocode = city.value;

    // Tive muitos problemas para acessar os objetos
    fetch(`https://apiprevmet3.inmet.gov.br/previsao/${city.value}`)
    .then(response => {
        myPromise(response).then(api => {

            const today = new Date().toLocaleDateString();
            const tomorrow = new Date(new Date().setUTCDate(new Date().getUTCDate() + 1)).toLocaleDateString();
            const array = []; /* Array que armazena os dias como todas as informações solicitadas na questão */
            
            for (const campo in api[geocode]) {
                
                const obj = {};
                // DÚVIDA: Tiver problemas com esse objeto fora do for não funcionava

                if (campo == today || campo == tomorrow) {
                    obj.data = campo;
                    // DÚVIDA: Acesso ao objeto, não entendi porque o ponto não funciona
                    obj.dia = api[geocode][campo].manha.dia_semana;
                    obj.tempo = api[geocode][campo].manha.icone;
                    obj.resumo = api[geocode][campo].manha.resumo;
                    obj.tempMin = api[geocode][campo].manha.temp_min;
                    obj.tempMax = api[geocode][campo].manha.temp_max;
                    
                } else {
                    obj.data = campo;
                    obj.dia = api[geocode][campo].dia_semana;
                    obj.tempo = api[geocode][campo].icone;
                    obj.resumo = api[geocode][campo].resumo;
                    obj.tempMin = api[geocode][campo].temp_min;
                    obj.tempMax = api[geocode][campo].temp_max;
                }
                array.push(obj);                                                           
            }
            // Chamando a função para realizar renderização da tabela
            table(array);
        }).catch(erro => error.innerHTML = erro);
    });
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
        // DÚVIDA: Não entendi porque só funciona com o SRC assim e quando coloco no HTML dá errado, eu acho que é porque o link tem um "data: "
        img.src = array[i].tempo;
        column4.innerHTML = array[i].resumo;
        column5.innerHTML = `${array[i].tempMin} °C`;
        column6.innerHTML = `${array[i].tempMax} °C`;
    }
}