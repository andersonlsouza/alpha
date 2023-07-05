// ***Constantes e variáveis***

// Constantes
const state = document.querySelector("#state");
const city = document.querySelector("#city");
const containerTable = document.querySelector("#countainer-table");
const error = document.querySelector("#error");

// **Estilização inicial**
containerTable.style.display = "none";
city.style.display = "none";

// Requisição para obtenção dos ID dos estados
myPromise("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
.then(api => {
    // Visualização dos estados para o usuário logo quando carrega a página
    for (let i = 0; i < api.length; i++) {
        state.innerHTML += `<option value="${api[i].id}">${api[i].nome} (${api[i].sigla})</option>`
    }            
});

// ***Eventos***

// Select dos estados
state.addEventListener("change", statesAndCities);

// Select das cidades
city.addEventListener("change", previsionTemp);

// **Funções**

// Criaçao da nova promessa
function myPromise(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
        .then(response => {
            if (response.status == 200) {
                error.innerHTML = "";
                resolve(response.json());        
            }
            reject("Dados não carregados");
        });
    }).catch(erro => error.innerHTML = erro);   
}

// Função para filtro das cidades por estado e criação da tabela inicial
function statesAndCities() {
    // Estilização do mouse para carregamento
    state.style.pointerEvents = "none";
    document.body.style.cursor = "wait";

    // Requisição a API de nome de cidades
    myPromise(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state.value}/distritos?orderBy=nome`)
    .then(api => {

        // Reinicialização dos nomes das cidades para o usuário
        city.innerHTML = "";

        // Estilização do mouse para padrão
        state.style.pointerEvents = "auto";
        document.body.style.cursor = "auto";

        // Loop para visualiação dos nomes das cidades para o usuário
        for (let i = 0; i < api.length; i++) {
            if (i == 0) {
                city.style.display = "block";
                city.innerHTML = `<option value=""></option>`;

            }
            city.innerHTML += `<option value="${api[i].municipio.id}">${api[i].nome}</option>`
        }
    });
}

// Tabela de previsão do tempo
function previsionTemp() {
    // Estilização do segundo select
    containerTable.style.display = "block";

    // Geocode da cidade
    const geocode = city.value;

    // Requisição da previsão do tempo
    myPromise(`https://apiprevmet3.inmet.gov.br/previsao/${city.value}`)
    .then(api => {

        const today = new Date().toLocaleDateString();
        const tomorrow = new Date(new Date().setUTCDate(new Date().getUTCDate() + 1)).toLocaleDateString();
        const array = []; /* Array que armazena os dias como todas as informações solicitadas na questão */
        
        for (const campo in api[geocode]) {
            
            const obj = {};
            // DÚVIDA: Tiver problemas com esse objeto fora do for não funcionava

            // Abstraindo para um array apenas com os dados necessários
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
        // Chamando a função para realizar renderização da tabela sendo que cada posição do array, deve ter a mesma quantidade de colunas
        table(array);
    });
}

// Renderizaçao da tabela, ela deve receber um array que tenha os dados de cada linha da tabela no array
function table(array) {
    const tableHTML = document.querySelector("table");

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

    const column = [];
    column.length = Object.keys(array[0]).length; /* Quantidade de colunas da tabela */
    
    // array.length é a quantidade de linhas da tabela que sempre é variável de acordo com a quantidade de dados
    for (let i = 0; i < array.length; i++) {
        // Criação de cada linha da tabela
        let line = document.createElement("tr");

        // Criação das colunas de acordo com a quantidade infomada na constante column
        for (let j = 0; j < column.length; j++) {
            column[j] = document.createElement("td");
            line.appendChild(column[j]);                               
        }
    
        // Inserção dos elementos de cada coluna da tabela
        column[0].innerHTML = array[i].data;
        column[1].innerHTML = array[i].dia;
        column[2].innerHTML = `<img src="${array[i].tempo}">`;
        column[3].innerHTML = array[i].resumo;
        column[4].innerHTML = `${array[i].tempMin} °C`;
        column[5].innerHTML = `${array[i].tempMax} °C`;

        tableBody.appendChild(line);
    }
}