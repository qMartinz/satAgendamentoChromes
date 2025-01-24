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
    const obsP = document.createElement("div");
    obs.appendChild(obsP);
    obsP.textContent = agendamento["obs"];

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

    const editar = document.createElement("td");
    editar.innerHTML = `
        <svg id="${agendamento.id}" class="edit" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path id="${agendamento.id}" fill="#ffffff" d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"/></svg>
    `

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
    if (!arquivado) linha.appendChild(editar);
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
    document.querySelectorAll('.edit').forEach(element => element.addEventListener('click', (e) => {
        openEditWindow(Number(e.target.id));
    }));
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

    const obs = document.createElement("td");
    const obsInput = document.createElement("textarea");
    obsInput.classList.add("chromeObs");
    obsInput.value = chrome.obs == undefined ? "" : chrome.obs;
    obsInput.id = chrome.id;
    obsInput.autocomplete = "off";
    obs.appendChild(obsInput);

    tr.appendChild(nome);
    tr.appendChild(status);
    tr.appendChild(ultimoAgendDate);
    tr.appendChild(ultimoUsuario);
    tr.appendChild(ocupar);
    tr.appendChild(obs);

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

    document.querySelectorAll('.chromeObs').forEach(input => input.addEventListener('change', async function (e) {
        console.log("evemt fired!!!")
        const range = "Chromes!" + "B" + (Number(e.target.id) + 2).toString();

        let value = e.target.value;

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
        } catch (err) {
            console.error('Erro ao adicionar dados:', err);
        } finally {
            document.querySelectorAll("#chromes input").forEach(e => e.disabled = false);
        }
    }));
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
            if (!document.activeElement.classList.contains('chromeObs')) criarTabelaChromes();
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

/**
* Desabilita as checkboxes correspondentes aos chromes indisponíveis no horário selecionado
* @param {Object[]} agendamentos array com os agendamentos já feitos
* @param {Object[]} chromeSheetData array com os chromes registrados
*/
function desabilitarChromes(agendamentos, chromeSheetData){
    let horainicio = new Date(document.getElementById("emprestimohora").value);
    let horafim = new Date(document.getElementById("devolucaohora").value);
    if (isNaN(horafim) || isNaN(horainicio)) return; // Retorna o código caso algum dos dois inputs estiver vazio
    
    document.querySelectorAll(".chrome").forEach(chrome => {
      chrome.disabled = false;
      const agendados = agendamentos.filter(e => e.chromes.includes('chrome' + (Number(chrome.id) + 1)));
      
      // Desabilita checkbox para cada agendamento já feito
      agendados.forEach(element => {
        let fimAgendado = element.devolucaohora;
        let splitFimAgendado = fimAgendado.split("T");
        
        let inicioAgendado = element.emprestimohora;
        let splitInicioAgendado = inicioAgendado.split("T");
        
        const horafimAgendado = new Date(splitFimAgendado[0] + " " + splitFimAgendado[1]);
        const horainicioAgendado = new Date(splitInicioAgendado[0] + " " + splitInicioAgendado[1]);
        
        if (horarioIncompativel(horainicio, horafim, horainicioAgendado, horafimAgendado, element.devolvido)) chrome.disabled = true;
      });
      
      // Desabilita checkbox caso o chrome esteja marcado como Ocupado
      if (chromeSheetData[Number(chrome.id)].ocupado == "on") chrome.disabled = true;
    });
  }

/**
* Cria os checkboxes para cada chrome
* @param {Object[]} chromeData Dados da planilha de Chromes 
*/
function checkboxes(chromeData) {
    document.getElementById("chrome").innerHTML = "";
    for (id = 0; id < chromeData.length; id++) {
        const wrapper = document.createElement("div");
        wrapper.classList.add('checkbox-wrapper-5');
        wrapper.innerHTML = '<label class="cbx" for="' + id + '"><span><svg width="12px" height="10px"><use xlink:href="#check-4"></use></svg></span><span>' + "Chrome " + (Number(id) + 1).toString() + '</span></label><svg class="inline-svg"><symbol id="check-4" viewBox="0 0 12 10"><polyline points="1.5 6 4.5 9 10.5 1"></polyline></symbol></svg>'

        const input = document.createElement("input");

        input.type = "checkbox";
        input.classList.add("chrome", "inp-cbx");
        input.name = "chrome" + (Number(id) + 1).toString();
        input.id = id;

        wrapper.insertBefore(input, wrapper.childNodes[0]);
        if (chromeData[id].ocupado == "on") input.disabled = true;
        document.getElementById("chrome").appendChild(wrapper);
    }
}

async function openEditWindow(id) {
    let agendamento = agendamentos.find(e => Number(e.id) == id);
    console.log(agendamento, id);
    document.getElementById("editar").style.visibility = "visible";
    document.getElementById("edit").setAttribute("agendamento", agendamento.id);
    document.getElementById('emprestimohora').value = agendamento.emprestimohora;
    document.getElementById('devolucaohora').value = agendamento.devolucaohora;
    checkboxes(chromes);
    desabilitarChromes(agendamentos.filter(agendamento1 => id != agendamento1.id), chromes);
    document.querySelectorAll(".chrome").forEach(item => {
        item.checked = agendamento.chromes.some(chrome => Number(chrome.replace("chrome", "")) === Number(item.id) + 1);
    });
    document.getElementById('turma').value = agendamento.turma;
    document.getElementById('obs').value = agendamento.obs == undefined ? "" : agendamento.obs;
    document.getElementById("edit").style.visibility = "visible";
}

function closeEditWindow() {
    document.getElementById("editar").style.visibility = "hidden";
    document.getElementById("edit").style.visibility = "hidden";
}

document.getElementById('edit').addEventListener('submit', async (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);

    // Cria um array organizado com os valores a serem enviados para a planilha
    var id = document.getElementById("edit").getAttribute("agendamento");
    let agendamento = agendamentos.find(e => Number(e.id) == id);

    const sheetrange = `Agendamentos!A${Number(id) + 2}`;

    console.log(agendamento);

    const values = [
        [agendamento.devolvido, agendamento.Date, formData.get("emprestimohora"), formData.get("devolucaohora"), formData.get("turma"), agendamento.nome, agendamento.email]
    ];

    for (let id = 1; id < 31; id++) {
        values[0].push(formData.get(`chrome${id}`) === "on" ? "on" : " ");
    }

    values[0].push(formData.get('obs'));

    const resource = {
        values,
    };


    document.getElementById("edit").style.visibility = "hidden";

    try {
        const result = await gapi.client.sheets.spreadsheets.values.append({
            spreadsheetId: '1CJybEPi2DvzoqQjYFjCcbi8AyQlptxlT0uV9aTggFbk',
            range: sheetrange,
            valueInputOption: 'RAW',
            resource,
        });

        console.log("trying", result, values);
    } catch (err) {
        console.error('Erro ao adicionar dados:', err);
    } finally {
        // Atualiza as tabelas
        await getSheetDataCallback("Chromes", (sheetData) => chromes = sheetData);
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
    }

    closeEditWindow();
});

/**
* Realiza a verificação do horário para o agendamento para cada chrome
* @param {Date} inicio Horário de empréstimo colocado
* @param {Date} fim Horário de devolução colocado
* @param {Date} inicioAgendado Horário de empréstimo do agendamento
* @param {Date} fimAgendado Horário de devolução do agendamento
* @param {boolean} devolvido Verdadeiro caso o agendamento já tenha sido devolvido
* @returns Verdadeiro caso o chrome esteja indisponível para o horário colocado
*/
function horarioIncompativel(inicio, fim, inicioAgendado, fimAgendado, devolvido){
    var fimEstaEntreAgendamento = fimAgendado >= fim && fim > inicioAgendado;
    var inicioEstaEntreAgendamento = inicio >= inicioAgendado && fimAgendado > inicio;
    
    if (fimAgendado < inicio && fimAgendado < new Date() && !devolvido) return true;
    if (fimEstaEntreAgendamento && inicioEstaEntreAgendamento && !devolvido) return true;
    if (!fimEstaEntreAgendamento && inicioEstaEntreAgendamento && !devolvido) return true;
    if (fimEstaEntreAgendamento && !inicioEstaEntreAgendamento && !devolvido) return true;
    if (fimAgendado < fim && fim > inicioAgendado && inicioAgendado > inicio && inicio < fimAgendado && !devolvido) return true;
    if (fimAgendado == fim && inicio == inicioAgendado && !devolvido) return true;
    return false;
  }

/**
* Evento para desabilitar chromes quando #emprestimohora for alterado
*/
document.getElementById("emprestimohora").addEventListener('change', async function (e) {
    document.getElementById('edit').querySelector("[type='submit']").disabled = true;
    await getSheetDataCallback("Chromes", (chromeSheetData) => {
        desabilitarChromes(agendamentos.filter(agendamento => document.getElementById('edit').getAttribute('agendamento') != agendamento.id), chromeSheetData);
    });
    document.getElementById('edit').querySelector("[type='submit']").disabled = false;
});

/**
* Evento para desabilitar chromes quando #devolucaohora for alterado
*/
document.getElementById("devolucaohora").addEventListener('change', async function (e) {
    document.getElementById('edit').querySelector("[type='submit']").disabled = true;
    await getSheetDataCallback("Chromes", (chromeSheetData) => {
        desabilitarChromes(agendamentos.filter(agendamento => document.getElementById('edit').getAttribute('agendamento') != agendamento.id), chromeSheetData);
    });
    document.getElementById('edit').querySelector("[type='submit']").disabled = false;
});