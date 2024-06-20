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

let usuario = null;
let sessionID = null;

window.addEventListener("DOMContentLoaded", function() {
    const login = document.getElementById('login');

    const sheetDataHandler = (sheetData) => {
        if (sessionStorage.getItem("sessionID")  == null) {
            document.getElementById("paginaLogin").hidden = false;
            document.getElementById("paginaPainel").hidden = true;
            console.log("Sessão não iniciada");
            return;
        }

        sessionId = sessionStorage.getItem("sessionID");

        sheetData.forEach(user => {
            if (user.session == sessionId) {
                sessionStorage.setItem("user", user.usuario);
                usuario = user.usuario;
            }

            if (user.usuario == sessionStorage.getItem("user")) {
                document.getElementById("ola").textContent += user.nome;
            }
        });

        if (usuario !== null) {
            document.getElementById("paginaLogin").hidden = true;
            document.getElementById("paginaPainel").hidden = false;
            console.log("Login automático permitido");
            criarTabelaAgendamentos();
            criarTabelaChromes();
        } else {
            document.getElementById("loginInfo").textContent = "Sessão expirada, repita o login.";
            document.getElementById("loginInfo").hidden = false;
            document.getElementById("paginaLogin").hidden = false;
            document.getElementById("paginaPainel").hidden = true;
            console.log("Sessão expirada");
        }
    }
    
    getSheetData({
    sheetID: "1XUVqK59o1nPMhZTG_eh8ghd0SArB2fZyk1pnOf_ne7A",
    sheetName: "Login",
    callback: sheetDataHandler,
    });

    login.addEventListener("submit", function(e) {
    e.preventDefault();
    const data = new FormData(login);
        const action = e.target.action;
        fetch(action, {
        method: 'POST',
        body: data,
        })
        .then(() => {
            let usuario = document.getElementById("usuario").value;
            let senha = document.getElementById("senha").value;
        
            const sheetDataHandler = (sheetData) => {
                sheetData.forEach(user => {
                    if (user.usuario == usuario && user.senha == senha) {
                        sessionStorage.setItem("sessionID", user.session);
                        sessionStorage.setItem("user", user.usuario);
                        location.reload();
                        return true;
                    } else {
                        document.getElementById("loginInfo").textContent = "Usuário ou senha incorreto.";
                        document.getElementById("loginInfo").hidden = false;
                        console.log("Login inválido")
                        login.reset();
                        return false;
                    }
                });
            }
            
            getSheetData({
            sheetID: "1XUVqK59o1nPMhZTG_eh8ghd0SArB2fZyk1pnOf_ne7A",
            sheetName: "Login",
            callback: sheetDataHandler,
            });
        });
    });
});

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
    switch (agendamento.turma){
        case 0:
            turma.textContent = "Maternal";
            break;
        case 1:
            turma.textContent = "Jardim";
            break;
        case 2:
            turma.textContent = "Pré";
            break;
        case 3:
            turma.textContent = "1º Ano";
            break;
        case 4:
            turma.textContent = "2º Ano";
            break;
        case 5:
            turma.textContent = "3º Ano";
            break;
        case 6:
            turma.textContent = "4º Ano";
            break;
        case 7:
            turma.textContent = "5º Ano";
            break;
        case 8:
            turma.textContent = "6º Ano";
            break;
        case 9:
            turma.textContent = "7º Ano";
            break;
        case 10:
            turma.textContent = "8º Ano";
            break;
        case 11:
            turma.textContent = "9º Ano";
            break;
        case 12:
            turma.textContent = "1º Médio";
            break;
        case 13:
            turma.textContent = "2º Médio";
            break;
        case 14:
            turma.textContent = "3º Médio";
            break;
        case 15:
            turma.textContent = "Bilíngue";
            break;
        case 16:
            turma.textContent = "Uso Próprio";
            break;
        default:
            turma.textContent = "Turma Inválida";
            break;
    }

    const nome = document.createElement("td");
    nome.textContent = agendamento.nome;

    const chromes = document.createElement("td");
    var btnChromes = document.createElement("button");
    btnChromes.textContent = agendamento.chromes.length + " Chromes";
    btnChromes.classList.add("chromes");
    btnChromes.id = agendamento.id;
    chromes.appendChild(btnChromes);

    const obs = document.createElement("td");
    obs.textContent = agendamento.obs;

    const devolvido = document.createElement("td");
    var btnDevolvido = document.createElement("button");
    btnDevolvido.textContent = "Registrar";
    btnDevolvido.classList.add("devolvido");
    btnDevolvido.id = agendamento.id;
    devolvido.appendChild(btnDevolvido);

    linha.appendChild(id);
    linha.appendChild(data);
    linha.appendChild(horainicio);
    linha.appendChild(horafim);
    linha.appendChild(turma);
    linha.appendChild(nome);
    linha.appendChild(chromes);
    linha.appendChild(obs);
    linha.appendChild(devolvido);
}

function criarTabelaAgendamentos() {
    const sheetDataHandler = (sheetData) => {
        if (sessionStorage.getItem("sessionID")  == null || usuario == null) return;

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
        agendamentos.sort(ORDENAR_DATE).forEach(agendamento => criarLinha(agendamento));
    }
    getSheetData({
    sheetID: "1XUVqK59o1nPMhZTG_eh8ghd0SArB2fZyk1pnOf_ne7A",
    sheetName: "Agendamentos",
    callback: sheetDataHandler,
    });
}

document.querySelectorAll(".chromes").forEach(btn => btn.addEventListener("click", function(){
        console.log(btn.id);
}));

document.getRootNode().addEventListener("click", function(e){
    const sheetDataHandler = (sheetData) => {
        if (sessionStorage.getItem("sessionID")  == null || usuario == null) return;

        const btn = e.target;
        let chromes = [];
        
        Object.entries(sheetData[btn.id]).forEach(element2 => {
            if (element2[0].startsWith("chrome") && element2[1] == "on") {
                chromes.push(element2[0]);
            }
        });
        
        if (btn.classList.contains("chromes")) {
            const listaDiv = document.getElementById("listaChromes")
            listaDiv.hidden = false;

            const lista = listaDiv.querySelector("ul");
            lista.innerHTML = "";
            chromes.forEach(chrome => {
                console.log(chrome);
                const item = document.createElement("li");
                item.textContent = "Chrome " + chrome.replace("chrome", "");
                lista.appendChild(item);
            });
        }
    }
    
    getSheetData({
    sheetID: "1XUVqK59o1nPMhZTG_eh8ghd0SArB2fZyk1pnOf_ne7A",
    sheetName: "Agendamentos",
    callback: sheetDataHandler,
    });
});

document.getElementById("voltarListaChromes").addEventListener("click", function(){
    document.getElementById('listaChromes').hidden = true;
    document.getElementById("listaChromes").querySelector("ul").innerHTML = "";
});

function criarTabelaChromes() {
    const sheetDataHandler = (sheetData) => {
        if (sessionStorage.getItem("sessionID")  == null || usuario == null) return;

        let agendamentos = [];
        let chromeRows = document.querySelectorAll(".chromeRow");

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

        

        chromeRows.forEach(tr => {
            const nome = document.createElement("td");
            nome.textContent = "Chrome " + tr.id;

            const status = document.createElement("td");
            let statusString = "Disponível";

            agendamentos.forEach(agendamento => {
                console.log(agendamento);
                console.log();

                if ((new Date() <= new Date(agendamento.devolucaohora) && new Date() >= new Date(agendamento.emprestimohora)) && agendamento.chromes.includes("chrome" + tr.id)) {
                    statusString = "Em uso";
                } 
                
                if (new Date() < new Date(agendamento.emprestimohora) && agendamento.chromes.includes("chrome" + tr.id) && statusString != "Em uso") {
                    statusString = "Agendado";
                }
            });

            status.textContent = statusString;

            const agendamentoRecente = agendamentos.sort(ORDENAR_DATE).find(a => a.chromes.includes("chrome" + tr.id));

            const ultimoAgendDate = document.createElement("td");
            if (agendamentoRecente != null) {
                let date = agendamentoRecente.Date;
                let dmaDateSplit = date.split("T")[0].split("-");
                ultimoAgendDate.textContent = dmaDateSplit[2] + "/" + dmaDateSplit[1] + "/" + dmaDateSplit[0] + " às " + date.split("T")[1]
            } else {
                ultimoAgendDate.textContent = "Nenhum agendamento";
            }

            const ultimoUsuario = document.createElement("td");
            const ultimaDevolucao = agendamentos.sort(ORDENAR_END).find(a => a.chromes.includes("chrome" + tr.id) && new Date() > new Date(a.emprestimohora));
            if (ultimaDevolucao != null) {
                ultimoUsuario.textContent = ultimaDevolucao.nome;
            } else {
                ultimoUsuario.textContent = "Nenhum usuário";
            }

            const ocupar = document.createElement("td");
            const btnOcupar = document.createElement("button");
            ocupar.appendChild(btnOcupar);
            btnOcupar.textContent = "Ocupar";

            tr.appendChild(nome);
            tr.appendChild(status);
            tr.appendChild(ultimoAgendDate);
            tr.appendChild(ultimoUsuario);
            tr.appendChild(ocupar);
        });
    }

    getSheetData({
    sheetID: "1XUVqK59o1nPMhZTG_eh8ghd0SArB2fZyk1pnOf_ne7A",
    sheetName: "Agendamentos",
    callback: sheetDataHandler,
    });
}