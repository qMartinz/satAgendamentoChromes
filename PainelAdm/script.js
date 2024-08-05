const ORDENAR_ID = function(a, b) {
    return b - a;
}

const ORDENAR_DATE = function(a, b) {
    return new Date(b.Date) - new Date(a.Date);
}

const ORDENAR_START = function(a, b) {
    return new Date(b.emprestimohora) - new Date(a.emprestimohora);
}

const ORDENAR_END = function(a, b) {
    return new Date(b.devolucaohora) - new Date(a.devolucaohora);
}

const ORDENAR_TURMA = function(a, b) {
    return b.turma - a.turma;
}

const ORDENAR_NOME = function(a, b) {
    return a.nome.localeCompare(b.nome);
}

const ORDENAR_EMAIL = function(a, b) {
    return a.email.localeCompare(b.email);
}

const ORDENAR_STATUS = function(a, b) {
    let statusA = getStatus(a.emprestimohora, a.devolucaohora, a.devolvido);
    
    let statusB = getStatus(b.emprestimohora, b.devolucaohora, b.devolvido);
    
    return statusB - statusA;
}

const ORDENAR_CHROMES = function(a, b) {
    return b.chromes.length - a.chromes.length;
}

// Variáveis alteradas ao alterar função de ordenação
let ordenarAgendamentos = ORDENAR_ID;
let ordenarArquivados = ORDENAR_ID;

// Dados das planilhas
let chromes = [];
let agendamentos = [];
let arquivados = [];

/**
* @callback sortFunction Função utilizada para definir a ordem da lista
* 
* Utilize um dos seguintes:
* * {@linkplain ORDENAR_ID} para ordenar por ID
* * {@linkplain ORDENAR_DATE} para ordenar por data de agendamento
* * {@linkplain ORDENAR_START} para ordenar por data de empréstimo
* * {@linkplain ORDENAR_END} para ordenar por data de devolução
* * {@linkplain ORDENAR_TURMA} para ordenar por turma
* * {@linkplain ORDENAR_NOME} para ordenar por nome alfabeticamente
* * {@linkplain ORDENAR_EMAIL} para ordenar por email alfabeticamente
* * {@linkplain ORDENAR_STATUS} para ordenar por status
* * {@linkplain ORDENAR_CHROMES} para ordenar por quantidade de chromes
*/

/**
* Altera a função de ordenação utilizada na tabela de agendamentos
* @param {sortFunction} sortFunction Função utilizada para definir a ordem da lista
*/
function changeSortAgendamentos(event, sortFunction){
    if (ordenarAgendamentos == sortFunction) {
        agendamentos.reverse();
        if (event.target.classList.contains('decr')) {
            document.querySelectorAll("#agendamentos button").forEach(element => {
                element.classList.remove("cres");
                element.classList.remove("decr");
            });
            event.target.classList.add("cres");
        } else {
            document.querySelectorAll("#agendamentos button").forEach(element => {
                element.classList.remove("cres");
                element.classList.remove("decr");
            });
            event.target.classList.add("decr");
        };
    } else {
        document.querySelectorAll("#agendamentos button").forEach(element => {
            element.classList.remove("cres");
            element.classList.remove("decr");
        });
        ordenarAgendamentos = sortFunction;
        agendamentos.sort(ordenarAgendamentos);
        event.target.classList.add("cres");
    };
    criarTabelaAgendamentos();
}

/**
* Altera a função de ordenação utilizada na tabela de arquivados
* @param {sortFunction} sortFunction Função utilizada para definir a ordem da lista
*/
function changeSortArquivados(event, sortFunction){
    if (ordenarArquivados == sortFunction) {
        arquivados.reverse();
        if (event.target.classList.contains('decr')) {
            document.querySelectorAll("#arquivados button").forEach(element => {
                element.classList.remove("cres");
                element.classList.remove("decr");
            });
            event.target.classList.add("cres");
        } else {
            document.querySelectorAll("#arquivados button").forEach(element => {
                element.classList.remove("cres");
                element.classList.remove("decr");
            });
            event.target.classList.add("decr");
        };
    } else {
        document.querySelectorAll("#arquivados button").forEach(element => {
            element.classList.remove("cres");
            element.classList.remove("decr");
        });
        ordenarArquivados = sortFunction;
        arquivados.sort(ordenarArquivados);
        event.target.classList.add("decr");
    };
    criarTabelaArquivados();
}

/**
* @param {number} id Número de 0 à 16 correspondente à turma que o agendamento é destinado
* @returns {string} Texto correspondente ao número especificado
*/
function getTurma(id) {
    switch (id){
        case 0:
        return "Maternal";
        case 1:
        return "Jardim";
        case 2:
        return "Pré";
        case 3:
        return "1º Ano";
        case 4:
        return "2º Ano";
        case 5:
        return "3º Ano";
        case 6:
        return "4º Ano";
        case 7:
        return "5º Ano";
        case 8:
        return "6º Ano";
        case 9:
        return "7º Ano";
        case 10:
        return "8º Ano";
        case 11:
        return "9º Ano";
        case 12:
        return "1º Médio";
        case 13:
        return "2º Médio";
        case 14:
        return "3º Médio";
        case 15:
        return "Bilíngue";
        case 16:
        return "Uso Próprio";
        default:
        return "Turma Inválida";
    }
}

/**
* 
* @param {Date} emprestimo Horário de empréstimo do agendamento
* @param {Date} devolucao Horário de devolução do agendamento
* @param {boolean} devolvido Verdadeiro caso o agendamento já tenha sido devolvido
* @returns {number} Valor de 0 à 2 correspondente ao status do agendamento
*/
function getStatus(emprestimo, devolucao, devolvido){
    var status = 0
    var pastEmprestimo = new Date() >= new Date(emprestimo);
    var pastDevolucao = new Date() > new Date(devolucao);
    
    if (devolvido) return status;
    
    if (!pastDevolucao && pastEmprestimo) {
        status = 1;
    }
    
    if (pastDevolucao) {
        status = 2;
    }
    
    return status;
}

/**
* 
* @param {Date} emprestimo Horário de empréstimo do chrome
* @param {Date} devolucao Horário de devolução do chrome
* @param {boolean} devolvido Verdadeiro caso o chrome já tenha sido devolvido
* @returns {number} Valor de 0 à 4 correspondente ao status do chrome
*/
function getChromeStatus(agendamentos, id, ocupado){
    let status = 0;
    
    agendamentos.forEach(agendamento => {
        if (agendamento.devolvido == "on") return;
        if (!agendamento.chromes.includes("chrome" + (Number(id) + 1).toString())) return;
        
        var pastEmprestimo = new Date() >= new Date(agendamento.emprestimohora);
        var pastDevolucao = new Date() > new Date(agendamento.devolucaohora);
        
        if (pastDevolucao) {
            status = 3;
        }
        
        if (!pastDevolucao && pastEmprestimo) {
            status = 2;
        }
        
        if (!pastEmprestimo && status < 2) {
            status = 1;
        }
    });
    
    if (ocupado) status = 4;
    status.textContent = status;
    
    return status;
}

/**
* @param {number} status Número de 0 à 2 que define o status do agendamento
* @returns {string} O status no formato de texto
*/
function getStatusString(status){
    switch(status){
        case 0:
        return "Agendado";
        case 1:
        return "Em uso";
        case 2:
        return "Aguardando devolução";
        default:
        return "Status inválido";
    }
}

/**
* @param {number} status Número de 0 à 4 que define o status do chrome
* @returns {string} O status no formato de texto
*/
function getChromeStatusString(status){
    switch(status){
        case 0:
        return "Disponível";
        case 1:
        return "Agendado";
        case 2:
        return "Em uso";
        case 3:
        return "Aguardando devolução";
        case 4:
        return "Ocupado";
        default:
        return "Status inválido";
    }
}

/**
* Cria um array mais organizado com os agendamentos no parâmetro agendamentosData
* @param {Object[]} agendamentosData 
* @returns 
*/
function getAgendamentos(agendamentosData){
    let agndmnts = [];
    for (id = 0; id < agendamentosData.length; id++){
        const element = agendamentosData[id];
        let agendamento = {};
        let chromesAgendados = [];
        Object.entries(element).forEach(element2 => {
            if (element2[0].startsWith("chrome") && element2[1] == "on") {
                chromesAgendados.push(element2[0]);
            } else if (!element2[0].startsWith("chrome")) {
                agendamento[element2[0]] = element2[1];
            }
            
            agendamento.chromes = chromesAgendados;
        });
        agndmnts.push(agendamento);
    }
    return agndmnts;
}

/**
* Cria uma linha de tabela para o agendamento especificado
* @param {Object} agendamento O objeto com os dados do agendamento
* @param {boolean} arquivado Verdadeiro caso o agendamento já tenha sido arquivado
*/
function criarLinha(agendamento, arquivado){
    const linha = document.createElement("tr");
    document.getElementById(arquivado ? "arquivados" : "agendamentos").appendChild(linha);
    
    const id = document.createElement("td");
    id.textContent = agendamento.id;
    
    const data = document.createElement("td");
    let dmadata = agendamento.Date.split("T")[0].split("-");
    data.textContent = dmadata[2] + "/" + dmadata[1] + "/" + dmadata[0] + " às " + agendamento.Date.split("T")[1];
    
    const horainicio = document.createElement("td");
    let dmahorainicio = agendamento.emprestimohora.split("T")[0].split("-");
    horainicio.textContent = dmahorainicio[2] + "/" + dmahorainicio[1] + "/" + dmahorainicio[0] + " às " + agendamento.emprestimohora.split("T")[1];
    
    const horafim = document.createElement("td");
    let dmahorafim = agendamento.devolucaohora.split("T")[0].split("-");
    horafim.textContent = dmahorafim[2] + "/" + dmahorafim[1] + "/" + dmahorafim[0] + " às " + agendamento.devolucaohora.split("T")[1];
    
    const turma = document.createElement("td");
    turma.textContent = getTurma(agendamento.turma);
    
    const nome = document.createElement("td");
    nome.textContent = agendamento.nome;
    
    const email = document.createElement("td");
    email.textContent = agendamento.email;
    
    const status = document.createElement("td");
    if (!arquivado) status.textContent = getStatusString(getStatus(agendamento.emprestimohora, agendamento.devolucaohora, agendamento.devolvido));
    
    const chromes = document.createElement("td");
    var btnChromes = document.createElement("button");
    btnChromes.textContent = agendamento.chromes.length + " Chromes";
    btnChromes.classList.add("chromes");
    btnChromes.id = agendamento.id;
    btnChromes.onclick = function(e) { mostrarListaChromes(e.target.id); };
    chromes.appendChild(btnChromes);
    
    const obs = document.createElement("td");
    obs.textContent = arquivado ? agendamento["obsdevolucao"] : agendamento["obs"];
    
    const devolvido = document.createElement("td");
    if (!arquivado) {
        var btnDevolvido = document.createElement("button");
        btnDevolvido.textContent = "Registrar";
        btnDevolvido.classList.add("devolvido");
        btnDevolvido.id = agendamento.id;
        btnDevolvido.onclick = function(e) { 
            document.getElementById("devolucaoform-wrapper").hidden = false;
            document.getElementById("devolucaoform").querySelector('button[type="submit"]').id = e.target.id;
        };
        devolvido.appendChild(btnDevolvido);
    }
    
    linha.appendChild(id);
    linha.appendChild(data);
    linha.appendChild(horainicio);
    linha.appendChild(horafim);
    linha.appendChild(turma);
    linha.appendChild(nome);
    linha.appendChild(email);
    if (!arquivado) linha.appendChild(status);
    linha.appendChild(chromes);
    linha.appendChild(obs);
    if (!arquivado) linha.appendChild(devolvido);
}

/**
* Cria a tabela com os agendamentos ainda não arquivados
*/
function criarTabelaAgendamentos() {
    const firstChild = document.getElementById("agendamentos").firstElementChild;
    document.getElementById("agendamentos").innerHTML = "";
    document.getElementById("agendamentos").append(firstChild);
    
    // Cria um array mais organizado com os agendamentos
    let agndmnts = getAgendamentos(agendamentos);
    
    // Filtra e ordena os agendamentos para criar uma linha na tabela para cada agendamento
    agndmnts.filter(a => a.devolvido !== "on").forEach(a => criarLinha(a, false));
}

document.getElementById("voltarListaChromes").addEventListener("click", function(){
    document.getElementById('listaChromes').hidden = true;
    document.getElementById("listaChromes").querySelector("ul").innerHTML = "";
});

/**
* Cria uma linha de tabela para o chrome especificado
* @param {Object[]} agendamentos Os agendamentos registrados
* @param {Object} chrome O chrome especificado
*/
function criarLinhaChromes(agendamentos, chrome){
    const tr = document.createElement("tr");
    
    const nome = document.createElement("td");
    nome.textContent = "Chrome " + (Number(chrome.id) + 1).toString();
    
    const modelo = document.createElement("td");
    modelo.textContent = chrome.modelo;
    
    const status = document.createElement("td")
    status.textContent = getChromeStatusString(getChromeStatus(agendamentos, chrome.id, chrome.ocupado == "on"));
    
    const agendamentoRecente = agendamentos.sort(ORDENAR_DATE).find(a => a.chromes.includes("chrome" + (Number(chrome.id) + 1).toString()));
    
    const ultimoAgendDate = document.createElement("td");
    if (agendamentoRecente != null) {
        let date = agendamentoRecente.Date;
        let dmaDateSplit = date.split("T")[0].split("-");
        ultimoAgendDate.textContent = dmaDateSplit[2] + "/" + dmaDateSplit[1] + "/" + dmaDateSplit[0] + " às " + date.split("T")[1]
    } else {
        ultimoAgendDate.textContent = "Nenhum agendamento";
    }
    
    const ultimoUsuario = document.createElement("td");
    const ultimaDevolucao = agendamentos.sort(ORDENAR_END).find(a => a.chromes.includes("chrome" + (Number(chrome.id) + 1).toString()) && new Date() > new Date(a.emprestimohora));
    if (ultimaDevolucao != null) {
        ultimoUsuario.textContent = ultimaDevolucao.nome;
    } else {
        ultimoUsuario.textContent = "Nenhum usuário";
    }
    
    const ocupar = document.createElement("td");
    const btnOcuparWrapper = document.createElement("div");
    btnOcuparWrapper.classList.add("ocupar-wrapper");
    const btnOcupar = document.createElement("input");
    btnOcupar.classList.add("switch");
    btnOcupar.id = chrome.id;
    btnOcupar.type = "checkbox";
    btnOcupar.checked = chrome.ocupado == "on";
    btnOcupar.onchange = function (e){ ocuparChrome(e.target.id, e.target.checked); }
    btnOcuparWrapper.appendChild(btnOcupar);
    ocupar.appendChild(btnOcuparWrapper);
    
    tr.appendChild(nome);
    tr.appendChild(modelo);
    tr.appendChild(status);
    tr.appendChild(ultimoAgendDate);
    tr.appendChild(ultimoUsuario);
    tr.appendChild(ocupar);
    
    document.getElementById("chromes").appendChild(tr);
}

/**
* Cria a tabela com os chromes registrados na planilha
*/
function criarTabelaChromes() {
    const chromeTabela = document.getElementById("chromes");
    const firstChild = chromeTabela.firstElementChild;
    chromeTabela.innerHTML = "";
    chromeTabela.append(firstChild);
    
    let agndmnts = getAgendamentos(agendamentos);
    agndmnts = agndmnts.sort(ordenarAgendamentos);
    
    let chrms = [];
    for (id = 0; id < chromes.length; id++){
        const element = chromes[id];
        let chrome = {};
        Object.entries(element).forEach(element2 => chrome[element2[0]] = element2[1]);
        chrome.id = id;
        chrms.push(chrome);
    }
    
    chrms.forEach(chrome => criarLinhaChromes(agndmnts, chrome));
}

/**
* Altera o valor de ocupado do chrome para o parâmetro ocupado
* @param {string} id Id do chrome
* @param {boolean} ocupado Verdadeiro caso o usuário tenha definido o chrome como ocupado
*/
async function ocuparChrome(id, ocupado){
    const range = "Chromes!" + "B" + (Number(id) + 2).toString();
    document.querySelectorAll("#chromes input").forEach(e => e.disabled = true);
    
    let value = ocupado ? "on" : "off";
    
    const data = {
        properties: value
    };
    
    const values = [
        [value]
    ];
    
    const resource = {
        values,
    };
    
    try {
        const result = await gapi.client.sheets.spreadsheets.values.update({
            spreadsheetId: '1CJybEPi2DvzoqQjYFjCcbi8AyQlptxlT0uV9aTggFbk',
            range: range,
            valueInputOption: 'RAW',
            resource,
        });
        
        await getSheetDataCallback("Chromes", (sheetData) => chromes = sheetData);
        
        await new Promise(() => criarTabelaChromes());
    } catch (err) {
        console.error('Erro ao adicionar dados:', err);
    } finally {
        document.querySelectorAll("#chromes input").forEach(e => e.disabled = false);
    }
}

/**
* Arquiva o agendamento e o define como devolvido
* @param {number} id Id do agendamento a ser devolvido
*/
function registrarDevolucao(id){
    document.querySelectorAll(".devolvido").forEach(btn => btn.disabled = true);
    
    let agndmnts = [];
    
    for (i = 0; i < agendamentos.length; i++){
        const element = agendamentos[i];
        let agendamento = {};
        Object.entries(element).forEach(element2 => agendamento[element2[0]] = element2[1]);
        agendamento.id = i;
        agndmnts.push(agendamento);
    }

    devolverAgendamento(id);
    adicionarAoArquivo(agndmnts[id]);
    document.getElementById('loading').hidden = false;
}

/**
* Torna visível uma lista com os chromes presentes no agendamento
* @param {number} id O id do agendamento
*/
function mostrarListaChromes(id){
    let chrms = [];
    
    Object.entries(agendamentos[id]).forEach(element2 => {
        if (element2[0].startsWith("chrome") && element2[1] == "on") chrms.push(element2[0]);
    });
    
    const listaDiv = document.getElementById("listaChromes")
    listaDiv.hidden = false;
    
    const lista = listaDiv.querySelector("ul");
    lista.innerHTML = "";
    chrms.forEach(chrome => {
        const item = document.createElement("li");
        item.textContent = "Chrome " + chrome.replace("chrome", "");
        lista.appendChild(item);
    });    
}

/**
* Adiciona o agendamento especificado à planilha de arquivados
* @param {Object} agendamento Os dados do agendamento
*/
async function adicionarAoArquivo(agendamento) {
    const sheetrange = 'Arquivados';
    
    // Cria um array organizado com os valores a serem enviados para a planilha
    var agendValues = agendamento;
    delete agendValues.devolvido;
    agendValues.obsdevolucao = document.forms["devolucaoform"]["obs"].value;
    agendValues.id = agendValues.id.toString();
    agendValues.turma = agendValues.turma.toString();
    const values = [
        [agendValues.id, agendValues.Date, agendValues.emprestimohora, agendValues.devolucaohora, agendValues.turma, agendValues.nome, agendValues.email]
    ];
    
    var chromes = Object.entries(agendValues).filter(p => p[0].startsWith('chrome'));
    chromes.forEach(c => values[0].push(c[1]));
    
    values[0].push(agendValues.obs, agendValues.obsdevolucao);
    
    const resource = {
        values,
    };
    
    try {
        const result1 = await gapi.client.sheets.spreadsheets.values.append({
            spreadsheetId: '1CJybEPi2DvzoqQjYFjCcbi8AyQlptxlT0uV9aTggFbk',
            range: sheetrange,
            valueInputOption: 'RAW',
            insertDataOption: 'INSERT_ROWS',
            resource,
        });
    } catch (err) {
        console.error('Erro ao adicionar dados:', err);
    } finally {
        // Atualiza as tabelas
        await getSheetDataCallback("Chromes", (sheetData) => chromes = sheetData);
        await getSheetDataCallback("Arquivados", (sheetData) => arquivados = sheetData);
        await getSheetDataCallback("Agendamentos", (sheetData) => {
            agndmnts = [];
            for(var id = 0; id < sheetData.length; id++) {
                const element = sheetData[id];
                element.id = id;
                agndmnts.push(element);
            }
            agendamentos = agndmnts;
        });
        
        criarTabelaAgendamentos();
        criarTabelaChromes();
        criarTabelaArquivados();

        document.getElementById('loading').hidden = true;
        document.getElementById('success').hidden = false;
    }
}

/**
* Define o agendamento como devolvido na planilha
* @param {string} id O id do agendamento
*/
async function devolverAgendamento(id){
    const range = "Agendamentos!" + "A" + (Number(id) + 2).toString();
    
    const data = {
        properties: "on"
    };
    
    const values = [
        ["on"]
    ];
    
    const resource = {
        values,
    };
    
    try {
        const result = await gapi.client.sheets.spreadsheets.values.append({
            spreadsheetId: '1CJybEPi2DvzoqQjYFjCcbi8AyQlptxlT0uV9aTggFbk',
            range: range,
            valueInputOption: 'RAW',
            resource,
        });
    } catch (err) {
        console.error('Erro ao adicionar dados:', err);
    }
}

/**
* Evento acionado quando o usuário registra um agendamento como devolvido
*/
document.getElementById("devolucaoform").addEventListener("submit", function(e){
    let form = document.getElementById("devolucaoform");
    let submitButton = form.querySelector("[type='submit']");
    if (submitButton) submitButton.disabled = true;
    
    e.preventDefault();
    
    // Arquiva o agendamento
    registrarDevolucao(e.target.querySelector('button[type="submit"]').id);
    
    const data = new FormData(e.target);
    const action = e.target.action;
    fetch(action, {
        method: 'POST',
        body: data,
    })
    .then(() => {
        form.hidden = true;
        form.reset();
        submitButton.disabled = false;
    });
});

/**
* Cria a tabela dos agendamentos arquivados
*/
function criarTabelaArquivados() {
    const firstChild = document.getElementById("arquivados").firstElementChild;
    document.getElementById("arquivados").innerHTML = "";
    document.getElementById("arquivados").append(firstChild);
    
    // Cria um array mais organizado com todos os agendamentos arquivados
    let arquivo = [];
    for (id = 0; id < arquivados.length; id++){
        const element = arquivados[id];
        let arquivado = {};
        let chromes = [];
        
        Object.entries(element).forEach(element2 => {
            if (element2[0].startsWith("chrome") && element2[1] == "on") chromes.push(element2[0]);
            if (!element2[0].startsWith("chrome")) arquivado[element2[0]] = element2[1];
        });
        
        arquivado.chromes = chromes;
        arquivado.id = arquivados[id]["id"];
        arquivo.push(arquivado);
    }
    
    // Ordena a tabela de acordo com a variável ordenarArquivados editável pelo usuário e cria uma linha para cada agendamento arquivado
    arquivo.forEach(a => criarLinha(a, true));
}

async function closeLoading(){
    document.getElementById("devolucaoform-wrapper").hidden = true;
    document.getElementById("devolucaoform").hidden = false;
    document.getElementById("success").hidden = true;
    document.querySelectorAll(".devolvido").forEach(btn => btn.disabled = false);
}

/**
* Implementação de {@link handleAuthorize} para realizar o login e abrir o painel de administrador
*/
async function authorizePainel() {
    await new Promise((resolve, reject) => handleAuthorize(resolve, reject, true));
}