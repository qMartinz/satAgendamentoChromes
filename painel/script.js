class ORDENAR_ID {
    constructor() { }
    static cre(a, b) {
        return a.id - b.id;
    }
    static dec(a, b) {
        return b.id - a.id;
    }
}


class ORDENAR_DATE {
    constructor() { }
    static cre(a, b) {
        return new Date(b.Date) - new Date(a.Date);
    }
    static dec(a, b) {
        return new Date(a.Date) - new Date(b.Date);
    }
}

class ORDENAR_START {
    constructor() { }
    static cre(a, b) {
        return new Date(b.emprestimohora) - new Date(a.emprestimohora);
    }
    static dec(a, b) {
        return new Date(a.emprestimohora) - new Date(b.emprestimohora);
    }
}

class ORDENAR_END {
    constructor() { }
    static cre(a, b) {
        return new Date(b.devolucaohora) - new Date(a.devolucaohora);
    }
    static dec(a, b) {
        return new Date(a.devolucaohora) - new Date(b.devolucaohora);
    }
}

class ORDENAR_TURMA {
    constructor() { }
    static cre(a, b) {
        return b.turma - a.turma;
    }
    static dec(a, b) {
        return a.turma - b.turma;
    }
}

class ORDENAR_NOME {
    constructor() { }
    static cre(a, b) {
        if (a.nome < b.nome) {
            return -1;
        }
        if (a.nome > b.nome) {
            return 1;
        }
        return 0;
    }
    static dec(a, b) {
        if (a.nome < b.nome) {
            return 1;
        }
        if (a.nome > b.nome) {
            return -1;
        }
        return 0;
    }
}

class ORDENAR_EMAIL {
    constructor() { }
    static cre(a, b) {
        if (a.email < b.email) {
            return -1;
        }
        if (a.email > b.email) {
            return 1;
        }
        return 0;
    }
    static dec(a, b) {
        if (a.email < b.email) {
            return 1;
        }
        if (a.email > b.email) {
            return -1;
        }
        return 0;
    }
}

class ORDENAR_STATUS {
    constructor() { }
    static cre(a, b) {
        let statusA = getStatus(a.emprestimohora, a.devolucaohora, a.devolvido);

        let statusB = getStatus(b.emprestimohora, b.devolucaohora, b.devolvido);

        return statusB - statusA;
    }
    static dec(a, b) {
        let statusA = getStatus(a.emprestimohora, a.devolucaohora, a.devolvido);

        let statusB = getStatus(b.emprestimohora, b.devolucaohora, b.devolvido);

        return statusA - statusB;
    }
}

class ORDENAR_CHROMES {
    constructor() { }
    static cre(a, b) {
        return a.chromes.length - b.chromes.length;
    }
    static dec(a, b) {
        return b.chromes.length - a.chromes.length;
    }
}

// Variáveis alteradas ao alterar função de ordenação
let ordenarAgendamentos;
let ordenarAgendamentosFunc = ORDENAR_ID.cre;
let sortButtonAgendamentos;
let ordenarArquivados;
let ordenarArquivadosFunc = ORDENAR_ID.cre;
let sortButtonArquivados;

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
* @param {sortFunction} sort Função utilizada para definir a ordem da lista
*/
function changeSortAgendamentos(element, sort) {
    if (ordenarAgendamentos == sort) {
        if (element.classList.contains('decr')) {
            document.querySelectorAll("#agendamentos button").forEach(element2 => {
                element2.classList.remove("cres");
                element2.classList.remove("decr");
            });
            element.classList.add("cres");
            ordenarAgendamentosFunc = sort.cre;
        } else {
            document.querySelectorAll("#agendamentos button").forEach(element2 => {
                element2.classList.remove("cres");
                element2.classList.remove("decr");
            });
            element.classList.add("decr");
            ordenarAgendamentosFunc = sort.dec;
        };
    } else {
        document.querySelectorAll("#agendamentos button").forEach(element2 => {
            element2.classList.remove("cres");
            element2.classList.remove("decr");
        });
        ordenarAgendamentosFunc = sort.cre;
        ordenarAgendamentos = sort;
        element.classList.add("cres");
    };

    agendamentos.sort(ordenarAgendamentosFunc);
    criarTabelaAgendamentos();
    sortButtonAgendamentos = element;
}

/**
* Altera a função de ordenação utilizada na tabela de arquivados
* @param {sortFunction} sort Função utilizada para definir a ordem da lista
*/
function changeSortArquivados(element, sort) {
    if (ordenarArquivados == sort) {
        if (element.classList.contains('decr')) {
            document.querySelectorAll("#arquivados button").forEach(element2 => {
                element2.classList.remove("cres");
                element2.classList.remove("decr");
            });
            element.classList.add("cres");
            ordenarArquivadosFunc = sort.cre;
        } else {
            document.querySelectorAll("#arquivados button").forEach(element2 => {
                element2.classList.remove("cres");
                element2.classList.remove("decr");
            });
            element.classList.add("decr");
            ordenarArquivadosFunc = sort.dec;
        };
    } else {
        document.querySelectorAll("#arquivados button").forEach(element2 => {
            element2.classList.remove("cres");
            element2.classList.remove("decr");
        });
        ordenarArquivadosFunc = sort.cre;
        ordenarArquivados = sort;
        element.classList.add("cres");
    };

    arquivados.sort(ordenarArquivadosFunc);
    criarTabelaArquivados();
    sortButtonArquivados = element;
}

/**
* @param {number} id Número de 0 à 16 correspondente à turma que o agendamento é destinado
* @returns {string} Texto correspondente ao número especificado
*/
function getTurma(id) {
    switch (id) {
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
function getStatus(emprestimo, devolucao, devolvido) {
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
function getChromeStatus(agendamentos, id, ocupado) {
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
function getStatusString(status) {
    switch (status) {
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
function getChromeStatusString(status) {
    switch (status) {
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
function getAgendamentos(agendamentosData) {
    let agndmnts = [];
    for (id = 0; id < agendamentosData.length; id++) {
        const element = agendamentosData[id];
        let agendamento = {};
        let chromesAgendados = [];
        Object.entries(element).forEach(element2 => {
            if (element2[0].startsWith("chrome") && element2[1] === "on") {
                chromesAgendados.push(element2[0]);
            } else if (!element2[0].startsWith("chrome")) {
                agendamento[element2[0]] = element2[1];
            }

            agendamento.chromes = chromesAgendados;
            agendamento.id = id;
        });
        agndmnts.push(agendamento);
    }
    return agndmnts;
}

function getArquivos(arquivosData) {
    let arqvs = [];
    for (id = 0; id < arquivosData.length; id++) {
        const element = arquivosData[id];
        let agendamento = {};
        let chromesAgendados = [];
        Object.entries(element).forEach(element2 => {
            if (element2[0].startsWith("chrome") && element2[1] === "on") {
                chromesAgendados.push(element2[0]);
            } else if (!element2[0].startsWith("chrome")) {
                agendamento[element2[0]] = element2[1];
            }

            agendamento.chromes = chromesAgendados;
        });
        arqvs.push(agendamento);
    }
    return arqvs;
}

window.addEventListener("load", function () {
    gapi.load('client', function () {
        gapi.client.init({}).then(function () {
            fetch("https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=" + window.localStorage.getItem("agendamentos_access_token")).then(function (response) {
                if (response.ok) {
                    gapi.client.setToken({ access_token: window.localStorage.getItem("agendamentos_access_token") });
                    showPainel();
                    refreshAgendamentos();
                }
            });
        });
    });
});

/**
* Cria uma linha de tabela para o agendamento especificado
* @param {Object} agendamento O objeto com os dados do agendamento
* @param {boolean} arquivado Verdadeiro caso o agendamento já tenha sido arquivado
*/
function criarLinha(agendamento, arquivado) {
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
    btnChromes.onclick = function (e) { mostrarListaChromes(e.target.id); };
    chromes.appendChild(btnChromes);

    const obs = document.createElement("td");
    obs.textContent = agendamento["obs"];

    const obsdevol = document.createElement("td");
    obsdevol.textContent = agendamento["obsdevolucao"];

    const devolvido = document.createElement("td");
    if (!arquivado) {
        var btnDevolvido = document.createElement("button");
        btnDevolvido.textContent = "Registrar";
        btnDevolvido.classList.add("devolvido");
        btnDevolvido.id = agendamento.id;
        btnDevolvido.onclick = function (e) {
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
    if (arquivado) linha.appendChild(obsdevol);
    if (!arquivado) linha.appendChild(devolvido);
}

/**
* Cria a tabela com os agendamentos ainda não arquivados
*/
function criarTabelaAgendamentos() {
    const firstChild = document.getElementById("agendamentos").firstElementChild;
    document.getElementById("agendamentos").innerHTML = "";
    document.getElementById("agendamentos").append(firstChild);

    // Filtra e ordena os agendamentos para criar uma linha na tabela para cada agendamento
    agendamentos.filter(a => a.devolvido !== "on").forEach(a => criarLinha(a, false));
}

document.getElementById("voltarListaChromes").addEventListener("click", function () {
    document.getElementById('listaChromes').hidden = true;
    document.getElementById("listaChromes").querySelector("ul").innerHTML = "";
});

/**
* Cria uma linha de tabela para o chrome especificado
* @param {Object[]} agendamentos Os agendamentos registrados
* @param {Object} chrome O chrome especificado
*/
function criarLinhaChromes(agendamentos, chrome) {
    const tr = document.createElement("tr");

    const nome = document.createElement("td");
    nome.textContent = "Chrome " + (Number(chrome.id) + 1).toString();

    const status = document.createElement("td")
    status.textContent = getChromeStatusString(getChromeStatus(agendamentos, chrome.id, chrome.ocupado == "on"));

    const agendamentoRecente = agendamentos.sort(ORDENAR_DATE.cre).find(a => a.chromes.includes("chrome" + (Number(chrome.id) + 1).toString()));

    const ultimoAgendDate = document.createElement("td");
    if (agendamentoRecente != null) {
        let date = agendamentoRecente.Date;
        let dmaDateSplit = date.split("T")[0].split("-");
        ultimoAgendDate.textContent = dmaDateSplit[2] + "/" + dmaDateSplit[1] + "/" + dmaDateSplit[0] + " às " + date.split("T")[1]
    } else {
        ultimoAgendDate.textContent = "Nenhum agendamento";
    }

    const ultimoUsuario = document.createElement("td");
    const ultimaDevolucao = agendamentos.sort(ORDENAR_END.cre).find(a => a.chromes.includes("chrome" + (Number(chrome.id) + 1).toString()) && new Date() > new Date(a.emprestimohora));
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
    btnOcupar.onchange = function (e) { ocuparChrome(e.target.id, e.target.checked); }
    btnOcuparWrapper.appendChild(btnOcupar);
    ocupar.appendChild(btnOcuparWrapper);

    tr.appendChild(nome);
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

    for (let id = 0; id < chromes.length; id++) {
        const chrome = chromes[id];
        chrome.id = id;
        criarLinhaChromes(agendamentos, chrome);
    }
}

/**
* Altera o valor de ocupado do chrome para o parâmetro ocupado
* @param {string} id Id do chrome
* @param {boolean} ocupado Verdadeiro caso o usuário tenha definido o chrome como ocupado
*/
async function ocuparChrome(id, ocupado) {
    const range = "Chromes!" + "A" + (Number(id) + 2).toString();
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
function registrarDevolucao(id) {
    document.querySelectorAll(".devolvido").forEach(btn => btn.disabled = true);

    devolverAgendamento(id);
    adicionarAoArquivo(agendamentos.find(a => a.id == id));
    document.getElementById('loading').hidden = false;
}

/**
* Torna visível uma lista com os chromes presentes no agendamento
* @param {number} id O id do agendamento
*/
function mostrarListaChromes(id) {
    console.log(agendamentos.find(a => a.id == id));
    let chrms = agendamentos.find(a => a.id == id).chromes;

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

    for (let id = 0; id < chromes.length; id++) {
        const chrome = chromes[id];
        if (agendValues.chromes.includes("chrome" + id)) {
            values[0].push("on");
        } else {
            values[0].push("");
        }
    }

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
        await getSheetDataCallback("Arquivados", (sheetData) => {
            arquivados = getArquivos(sheetData);
            arquivados.sort(ordenarArquivados);
        });
        await getSheetDataCallback("Agendamentos", (sheetData) => {
            agndmnts = [];
            for (var id = 0; id < sheetData.length; id++) {
                const element = sheetData[id];
                element.id = id;
                agndmnts.push(element);
            }
            agendamentos = getAgendamentos(agndmnts);
            agendamentos.sort(ordenarAgendamentosFunc);
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
async function devolverAgendamento(id) {
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
document.getElementById("devolucaoform").addEventListener("submit", function (e) {
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

    // Ordena a tabela de acordo com a variável ordenarArquivados editável pelo usuário e cria uma linha para cada agendamento arquivado
    arquivados.forEach(a => criarLinha(a, true));
}

async function closeLoading() {
    document.getElementById("devolucaoform-wrapper").hidden = true;
    document.getElementById("devolucaoform").hidden = false;
    document.getElementById("success").hidden = true;
    document.querySelectorAll(".devolvido").forEach(btn => btn.disabled = false);
}

/**
* Abre o painel de administrador caso o usuário possua permissão de editar a planilha com os dados dos agendamentos.
*/
async function showPainel() {
    gapi.client.load('drive', 'v3', function () {
        gapi.client.drive.about.get({
            fields: "user"
        }).then((about) => {
            var userId = about.result.user.permissionId;
            const permissions = gapi.client.drive.permissions.list({
                fileId: '1CJybEPi2DvzoqQjYFjCcbi8AyQlptxlT0uV9aTggFbk',
                supportsAllDrives: true,
                supportsTeamDrives: true
            }).then(async function (response) {

                var permissions = response.result.permissions;
                var userHasPermission = permissions.some(function (permission) {
                    return (permission.id === userId && (permission.role === 'writer' || permission.role === 'owner' || permission.role === 'organizer' || permission.role === 'fileOrganizer'));
                });

                if (!userHasPermission) {
                    console.log('Usuário não tem permissão para editar o arquivo. Redirecionando...');
                    handleSignoutClick(true);
                    location.assign("https://colegiosatelite.com.br/agendamento/painel/acessonegado");
                    return;
                }

                document.getElementById('authorize_button').hidden = true;
                document.getElementById('signout_button').hidden = false;
                document.getElementById("paginaPainel").hidden = false;

                await getSheetDataCallback("Agendamentos", (sheetData) => {
                    agndmnts = [];
                    for (var id = 0; id < sheetData.length; id++) {
                        const element = sheetData[id];
                        element.id = id;
                        agndmnts.push(element);
                    }
                    agendamentos = getAgendamentos(agndmnts);
                    agendamentos.sort(ordenarAgendamentosFunc);
                });
                await getSheetDataCallback("Chromes", (sheetData) => chromes = sheetData);
                await getSheetDataCallback("Arquivados", (sheetData) => {
                    arquivados = getArquivos(sheetData);
                    arquivados.sort(ordenarArquivadosFunc);
                });

                criarTabelaAgendamentos();
                criarTabelaChromes();
                criarTabelaArquivados();
            }, function (error) {
                console.error('Erro ao verificar permissões:', error);
                if (error.status === 403) {
                    console.log('Usuário não tem permissão para editar o arquivo. Redirecionando...');
                    handleSignoutClick(true);
                    location.assign("https://colegiosatelite.com.br/agendamento/painel/acessonegado");
                }

                if (error.status === 404) {
                    console.log('Usuário não tem permissão para acessar o arquivo. Redirecionando...');
                    handleSignoutClick(true);
                    location.assign("https://colegiosatelite.com.br/agendamento/painel/acessonegado");
                }
            });
        });
    });
}

/**
* Implementação de {@link handleAuthorize} para realizar o login e abrir o painel de administrador
*/
async function authorizePainel() {
    await new Promise((resolve, reject) => handleAuthorize(resolve, reject, showPainel)).then(() => { refreshAgendamentos() });
}

function signoutPainel() {
    stopRefresh();
    handleSignoutClick(true);
}


// Variable to store the interval
let intervalId;

function refreshAgendamentos() {
    // check if an interval has already been set up
    if (!intervalId) {
        intervalId = setInterval(refresh, 4000);
    }
}

function refresh() {
    // Check if access is valid
    gapi.client.load('drive', 'v3', function () {
        gapi.client.drive.about.get({
            fields: "user"
        }).then(async function (about) {
            console.log("Refreshed");

            await getSheetDataCallback("Chromes", (sheetData) => chromes = sheetData);
            await getSheetDataCallback("Arquivados", (sheetData) => {
                arquivados = getArquivos(sheetData);
                arquivados.sort(ordenarArquivadosFunc);
            });
            await getSheetDataCallback("Agendamentos", (sheetData) => {
                agndmnts = [];
                for (var id = 0; id < sheetData.length; id++) {
                    const element = sheetData[id];
                    element.id = id;
                    agndmnts.push(element);
                }
                agendamentos = getAgendamentos(agndmnts);
                agendamentos.sort(ordenarAgendamentosFunc);
            });

            criarTabelaAgendamentos();
            criarTabelaChromes();
            criarTabelaArquivados();

        },
            function (error) {
                console.error("Login timed out", error);
                handleSignoutClick(true);
                stopRefresh();
            });
    });
}

function stopRefresh() {
    clearInterval(intervalId);
    // release our interval from the variable
    intervalId = null;
}