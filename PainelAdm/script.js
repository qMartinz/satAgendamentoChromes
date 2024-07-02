const ORDERNAR_ID = function(a, b) {
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

// Não funciona
const ORDENAR_CHROMES = function(a, b) {
    let agendamentoA = {};
    let chromes = [];
    Object.entries(a).forEach(element2 => {
        if (element2[0].startsWith("chrome") && element2[1] == "on") {
            chromes.push(element2[0]);
        } else if (!element2[0].startsWith("chrome")) {
            agendamentoA[element2[0]] = element2[1];
        }
        agendamentoA.chromes = chromes;
    });
    agendamentoA.id = id;

    let agendamentoB = {};
    chromes = [];
    Object.entries(b).forEach(element2 => {
        if (element2[0].startsWith("chrome") && element2[1] == "on") {
            chromes.push(element2[0]);
        } else if (!element2[0].startsWith("chrome")) {
            agendamentoB[element2[0]] = element2[1];
        }
        agendamentoB.chromes = chromes;
    });
    agendamentoB.id = id;

    return agendamentoB.chromes.length - agendamentoA.chromes.length;
}

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

function criarLinha(agendamento){
    const linha = document.createElement("tr");
    document.getElementById("agendamentos").appendChild(linha);
    
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

    const chromes = document.createElement("td");
    var btnChromes = document.createElement("button");
    btnChromes.textContent = agendamento.chromes.length + " Chromes";
    btnChromes.classList.add("chromes");
    btnChromes.id = agendamento.id;
    btnChromes.onclick = function(e) { mostrarListaChromes(e.target.id); };
    chromes.appendChild(btnChromes);

    const obs = document.createElement("td");
    obs.textContent = agendamento.obs;

    const devolvido = document.createElement("td");
    var btnDevolvido = document.createElement("button");
    btnDevolvido.textContent = "Registrar";
    btnDevolvido.classList.add("devolvido");
    btnDevolvido.id = agendamento.id;
    btnDevolvido.onclick = function(e) { 
        document.getElementById("devolucaoform").hidden = false;
        document.getElementById("devolucaoform").querySelector('button[type="submit"]').id = e.target.id;
    };
    devolvido.appendChild(btnDevolvido);

    linha.appendChild(id);
    linha.appendChild(data);
    linha.appendChild(horainicio);
    linha.appendChild(horafim);
    linha.appendChild(turma);
    linha.appendChild(nome);
    linha.appendChild(email);
    linha.appendChild(chromes);
    linha.appendChild(obs);
    linha.appendChild(devolvido);
}

function criarTabelaAgendamentos() {
    const sheetDataHandler = (sheetData) => {
        document.getElementById("agendamentos").innerHTML = document.getElementById("falseAgendamentos").innerHTML;

        let agendamentos = [];

        for (id = 0; id < sheetData.length; id++){
            const element = sheetData[id];
            let agendamento = {};
            let chromes = [];
            Object.entries(element).forEach(element2 => {
                if (element2[0].startsWith("chrome") && element2[1] == "on") {
                    chromes.push(element2[0]);
                } else if (!element2[0].startsWith("chrome")) {
                    agendamento[element2[0]] = element2[1];
                }

                agendamento.chromes = chromes;
            });
            agendamento.id = id;
            agendamentos.push(agendamento);
        }
        
        agendamentos.filter(a => a.devolvido !== "on").sort(ORDENAR_DATE).forEach(a => criarLinha(a));
    }
    getSheetData({
        sheetID: "1XUVqK59o1nPMhZTG_eh8ghd0SArB2fZyk1pnOf_ne7A",
        sheetName: "Agendamentos",
        callback: sheetDataHandler,
    });
}

document.getElementById("voltarListaChromes").addEventListener("click", function(){
    document.getElementById('listaChromes').hidden = true;
    document.getElementById("listaChromes").querySelector("ul").innerHTML = "";
});

function criarLinhaChromes(agendamentos, chrome){
    const tr = document.createElement("tr");
    
    const nome = document.createElement("td");
    nome.textContent = "Chrome " + (Number(chrome.id) + 1).toString();

    const modelo = document.createElement("td");
    modelo.textContent = chrome.modelo;

    const status = document.createElement("td");
    let statusString = "Disponível";

    agendamentos.forEach(agendamento => {
        if (agendamento.devolvido == "on") return;
        if (!agendamento.chromes.includes("chrome" + (Number(chrome.id) + 1).toString())) return;

        var pastEmprestimo = new Date() >= new Date(agendamento.emprestimohora);
        var pastDevolucao = new Date() > new Date(agendamento.devolucaohora);

        if (pastDevolucao) {
            statusString = "Aguardando devolução";
        }

        if (!pastDevolucao && pastEmprestimo) {
            statusString = "Em uso";
        }
        
        if (!pastEmprestimo && statusString != "Em uso" && statusString != "Aguardando devolução") {
            statusString = "Agendado";
        }
    });

    if (chrome.ocupado == "on") statusString = "Ocupado";
    status.textContent = statusString;

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
    const btnOcupar = document.createElement("input");
    btnOcupar.id = chrome.id;
    btnOcupar.type = "checkbox";
    btnOcupar.checked = chrome.ocupado == "on";
    btnOcupar.onchange = function (e){ ocuparChrome(e.target.id, e.target.checked); }
    ocupar.appendChild(btnOcupar);
    btnOcupar.textContent = "Ocupar";

    tr.appendChild(nome);
    tr.appendChild(modelo);
    tr.appendChild(status);
    tr.appendChild(ultimoAgendDate);
    tr.appendChild(ultimoUsuario);
    tr.appendChild(ocupar);

    document.getElementById("chromes").appendChild(tr);
}

function criarTabelaChromes() {
    const sheetDataHandler = (sheetData) => {
        const chromeSheetDataHandler = (chromeSheetData) => {
            const chromeTabela = document.getElementById("chromes");
            chromeTabela.innerHTML = document.getElementById("falseChromes").innerHTML;

            let agendamentos = [];    
            for (id = 0; id < sheetData.length; id++){
                const element = sheetData[id];
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
                agendamento.id = id;
                agendamentos.push(agendamento);
            }
            agendamentos = agendamentos.sort(ORDENAR_DATE);

            let chromes = [];
            for (id = 0; id < chromeSheetData.length; id++){
                const element = chromeSheetData[id];
                let chrome = {};
                Object.entries(element).forEach(element2 => chrome[element2[0]] = element2[1]);
                chrome.id = id;
                chromes.push(chrome);
            }

            chromes.forEach(chrome => criarLinhaChromes(agendamentos, chrome));
        }

        getSheetData({
            sheetID: "1XUVqK59o1nPMhZTG_eh8ghd0SArB2fZyk1pnOf_ne7A",
            sheetName: "Chromes",
            callback: chromeSheetDataHandler,
        });
    }

    getSheetData({
        sheetID: "1XUVqK59o1nPMhZTG_eh8ghd0SArB2fZyk1pnOf_ne7A",
        sheetName: "Agendamentos",
        callback: sheetDataHandler,
    });
}

async function ocuparChrome(id, ocupado){
    const spreadsheetId = '1XUVqK59o1nPMhZTG_eh8ghd0SArB2fZyk1pnOf_ne7A';
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
        spreadsheetId: spreadsheetId,
        range: range,
        valueInputOption: 'RAW',
        resource,
        });

        await new Promise(() => criarTabelaChromes());
    } catch (err) {
        console.error('Erro ao adicionar dados:', err);
    } finally {
        document.querySelectorAll("#chromes input").forEach(e => e.disabled = false);
    }
}

function registrarDevolucao(id){
    document.querySelectorAll(".devolvido").forEach(btn => btn.disabled = true);

    const sheetDataHandler = (sheetData) => {

        let agendamentos = [];

        for (i = 0; i < sheetData.length; i++){
            const element = sheetData[i];
            let agendamento = {};
            Object.entries(element).forEach(element2 => agendamento[element2[0]] = element2[1]);
            agendamento.id = i;
            agendamentos.push(agendamento);
        }

        devolverAgendamento(id);
        adicionarAoArquivo(agendamentos[id]);
    }
    
    getSheetData({
        sheetID: "1XUVqK59o1nPMhZTG_eh8ghd0SArB2fZyk1pnOf_ne7A",
        sheetName: "Agendamentos",
        callback: sheetDataHandler,
    });
}

function mostrarListaChromes(id){
    const sheetDataHandler = (sheetData) => {
        let chromes = [];
        
        Object.entries(sheetData[id]).forEach(element2 => {
            if (element2[0].startsWith("chrome") && element2[1] == "on") {
                chromes.push(element2[0]);
            }
        });
        
        const listaDiv = document.getElementById("listaChromes")
        listaDiv.hidden = false;

        const lista = listaDiv.querySelector("ul");
        lista.innerHTML = "";
        chromes.forEach(chrome => {
            const item = document.createElement("li");
            item.textContent = "Chrome " + chrome.replace("chrome", "");
            lista.appendChild(item);
        });
    }

    getSheetData({
        sheetID: "1XUVqK59o1nPMhZTG_eh8ghd0SArB2fZyk1pnOf_ne7A",
        sheetName: "Agendamentos",
        callback: sheetDataHandler,
    });
    
}

async function adicionarAoArquivo(agendamento) {
    const spreadsheetId = '1XUVqK59o1nPMhZTG_eh8ghd0SArB2fZyk1pnOf_ne7A';
    const sheet = 'Arquivados';

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
        spreadsheetId,
        range: sheet,
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        resource,
        });
    } catch (err) {
        console.error('Erro ao adicionar dados:', err);
    } finally {
        criarTabelaAgendamentos();
        criarTabelaChromes();
        criarTabelaArquivados();
        document.querySelectorAll(".devolvido").forEach(btn => btn.disabled = false);
        alert("Devolução registrada!");
    }
  }

async function devolverAgendamento(id){
    const spreadsheetId = '1XUVqK59o1nPMhZTG_eh8ghd0SArB2fZyk1pnOf_ne7A';
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
        spreadsheetId,
        range: range,
        valueInputOption: 'RAW',
        resource,
        });
    } catch (err) {
        console.error('Erro ao adicionar dados:', err);
    }
}

document.getElementById("devolucaoform").addEventListener("submit", function(e){
    let form = document.getElementById("devolucaoform");
    let submitButton = form.querySelector("[type='submit']");
    if (submitButton) submitButton.disabled = true;

    e.preventDefault();

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

function criarLinhaArquivados(arquivado){
    const linha = document.createElement("tr");
    document.getElementById("arquivados").appendChild(linha);
    
    const id = document.createElement("td");
    id.textContent = arquivado.id;

    const data = document.createElement("td");
    let dmadata = arquivado.Date.split("T")[0].split("-");
    data.textContent = dmadata[2] + "/" + dmadata[1] + "/" + dmadata[0] + " às " + arquivado.Date.split("T")[1];

    const horainicio = document.createElement("td");
    let dmahorainicio = arquivado.emprestimohora.split("T")[0].split("-");
    horainicio.textContent = dmahorainicio[2] + "/" + dmahorainicio[1] + "/" + dmahorainicio[0] + " às " + arquivado.emprestimohora.split("T")[1];

    const horafim = document.createElement("td");
    let dmahorafim = arquivado.devolucaohora.split("T")[0].split("-");
    horafim.textContent = dmahorafim[2] + "/" + dmahorafim[1] + "/" + dmahorafim[0] + " às " + arquivado.devolucaohora.split("T")[1];

    const turma = document.createElement("td");
    turma.textContent = getTurma(arquivado.turma);

    const nome = document.createElement("td");
    nome.textContent = arquivado.nome;

    const email = document.createElement("td");
    email.textContent = arquivado.email;

    const chromes = document.createElement("td");
    var btnChromes = document.createElement("button");
    btnChromes.textContent = arquivado.chromes.length + " Chromes";
    btnChromes.classList.add("chromes");
    btnChromes.id = arquivado.id + "";
    btnChromes.onclick = function(e) { mostrarListaChromes(e.target.id); };
    chromes.appendChild(btnChromes);

    const obsdevolucao = document.createElement("td");
    obsdevolucao.textContent = arquivado.obsdevolucao;

    linha.appendChild(id);
    linha.appendChild(data);
    linha.appendChild(horainicio);
    linha.appendChild(horafim);
    linha.appendChild(turma);
    linha.appendChild(nome);
    linha.appendChild(email);
    linha.appendChild(chromes);
    linha.appendChild(obsdevolucao);
}

function criarTabelaArquivados() {
    const sheetDataHandler = (sheetData) => {
        document.getElementById("arquivados").innerHTML = document.getElementById("falseArquivados").innerHTML;

        let arquivo = [];

        for (id = 0; id < sheetData.length; id++){
            const element = sheetData[id];
            let arquivado = {};
            let chromes = [];
            Object.entries(element).forEach(element2 => {
                if (element2[0].startsWith("chrome") && element2[1] == "on") {
                    chromes.push(element2[0]);
                } else if (!element2[0].startsWith("chrome")) {
                    arquivado[element2[0]] = element2[1];
                }

                arquivado.chromes = chromes;
            });
            arquivado.id = sheetData[id]["id"];
            arquivo.push(arquivado);
        }
        
        arquivo.sort(ORDENAR_DATE).forEach(a => criarLinhaArquivados(a));
    }
    getSheetData({
        sheetID: "1XUVqK59o1nPMhZTG_eh8ghd0SArB2fZyk1pnOf_ne7A",
        sheetName: "Arquivados",
        callback: sheetDataHandler,
    });
}

async function authorizePainel() {
    await new Promise((resolve, reject) => handleAuthorize(resolve, reject, true));
}