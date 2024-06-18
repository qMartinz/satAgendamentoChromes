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
            criarTabela();
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
        case "jd":
            turma.textContent = "Jardim";
            break;
        case "pre":
            turma.textContent = "Pré";
            break;
        case "1":
            turma.textContent = "1º Ano";
            break;
        case "2":
            turma.textContent = "2º Ano";
            break;
        case "3":
            turma.textContent = "3º Ano";
            break;
        case "4":
            turma.textContent = "4º Ano";
            break;
        case "5":
            turma.textContent = "5º Ano";
            break;
        case "6":
            turma.textContent = "6º Ano";
            break;
        case "7":
            turma.textContent = "7º Ano";
            break;
        case "8":
            turma.textContent = "8º Ano";
            break;
        case "9":
            turma.textContent = "9º Ano";
            break;
        case "1m":
            turma.textContent = "1º Médio";
            break;
        case "2m":
            turma.textContent = "2º Médio";
            break;
        case "3m":
            turma.textContent = "3º Médio";
            break;
        case "bil":
            turma.textContent = "Bilíngue";
            break;
        case "up":
            turma.textContent = "Uso Próprio";
            break;
        default:
            turma.textContent = "Turma Inválida";
            break;
    }

    const nome = document.createElement("td");
    nome.textContent = agendamento.nome;

    const chromes = document.createElement("td");
    chromes.classList.add("chromes");

    const devolvido = document.createElement("button");
    devolvido.textContent = "Registrar Devolução"
    devolvido.classList.add("devolvido");

    linha.appendChild(data);
    linha.appendChild(horainicio);
    linha.appendChild(horafim);
    linha.appendChild(turma);
    linha.appendChild(nome);
    linha.appendChild(chromes);
    linha.appendChild(devolvido);
}

function criarTabela() {
    const sheetDataHandler = (sheetData) => {
        if (sessionStorage.getItem("sessionID")  == null || usuario == null) return;

        let agendamentos = [];
        sheetData.forEach(element => {
            let agendamento = {};
            let chromes = [];
            Object.entries(element).forEach(element2 => {
                if (element2[0].startsWith("chrome")) {
                    chromes.push(element2[0]);
                }
            });
        });

        sheetData.forEach(agendamento => criarLinha(agendamento));
    }
    
    getSheetData({
    sheetID: "1XUVqK59o1nPMhZTG_eh8ghd0SArB2fZyk1pnOf_ne7A",
    sheetName: "Agendamentos",
    callback: sheetDataHandler,
    });
}