function desabilitarChromes(v, p, sheetData){
  const agendados = sheetData.filter(e => e[v] == "on");
  let chromesOcupados = [];

  agendados.forEach(element => {
    Object.entries(element).forEach(item => {
      if (!chromesOcupados.includes(item[0]) && item[0].toString().startsWith("chrome") && item[1] == "on" && element["periodo"] == p) {
        chromesOcupados.push(item[0]);
      }
    });
  });
  
  return chromesOcupados;
}

function myFunction() {
  var currentLocation = window.location;
  document.getElementById('url').value = currentLocation;
}

document.getElementById("emprestimohora").addEventListener('change', function(e) {
  let horainicio = new Date(e.target.value);
  let horafim = new Date(document.getElementById("devolucaohora").value);
  if (isNaN(horafim)) return;

  const sheetDataHandler = (sheetData) => {
    const chromeSheetDataHandler = (chromeSheetData) => {
      document.querySelectorAll(".chrome").forEach(chrome => {
        chrome.disabled = false;
        const agendados = sheetData.filter(e => e["chrome" + (Number(chrome.id) + 1).toString()] == "on");

        agendados.forEach(element => {
          let fimAgendado = element.devolucaohora;
          let splitFimAgendado = fimAgendado.split("T");

          let inicioAgendado = element.emprestimohora;
          let splitInicioAgendado = inicioAgendado.split("T");

          const horafimAgendado = new Date(splitFimAgendado[0] + " " + splitFimAgendado[1]);
          const horainicioAgendado = new Date(splitInicioAgendado[0] + " " + splitInicioAgendado[1]);

          if (horarioIncompativel(horainicio, horafim, horainicioAgendado, horafimAgendado, element.devolvido)) chrome.disabled = true;
        });

        if (chromeSheetData[Number(chrome.id)].ocupado == "on") chrome.disabled = true;
      });
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
});

document.getElementById("devolucaohora").addEventListener('change', function(e) {
  let horainicio = new Date(document.getElementById("emprestimohora").value);
  let horafim = new Date(e.target.value);
  if (isNaN(horainicio)) return;

  const sheetDataHandler = (sheetData) => {
    const chromeSheetDataHandler = (chromeSheetData) => {
      document.querySelectorAll(".chrome").forEach(chrome => {
        chrome.disabled = false;
        const agendados = sheetData.filter(e => e["chrome" + (Number(chrome.id) + 1).toString()] == "on");
  
        agendados.forEach(element => {
          let fimAgendado = element.devolucaohora;
          let splitFimAgendado = fimAgendado.split("T");
  
          let inicioAgendado = element.emprestimohora;
          let splitInicioAgendado = inicioAgendado.split("T");
  
          const horafimAgendado = new Date(splitFimAgendado[0] + " " + splitFimAgendado[1]);
          const horainicioAgendado = new Date(splitInicioAgendado[0] + " " + splitInicioAgendado[1]);
  
          if (horarioIncompativel(horainicio, horafim, horainicioAgendado, horafimAgendado, element.devolvido)) chrome.disabled = true;
        });

        if (chromeSheetData[Number(chrome.id)].ocupado == "on") chrome.disabled = true;
      });
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
});

window.addEventListener("DOMContentLoaded", function() {
  const agendamento = document.getElementById('agendamento');
  agendamento.addEventListener("submit", async function(e) {
    let submitButton = agendamento.querySelector("[type='submit']");
    if (submitButton) submitButton.disabled = true;

    e.preventDefault();

    await new Promise((resolve, reject) => handleAuthorize(resolve, reject, false));

    if (!(document.querySelectorAll(".chrome:checked").length>0)){
      alert("Selecione ao menos um Chrome para realizar o agendamento!");
      submitButton.disabled = false;
      return false;
    }

    const horainicio = new Date(document.getElementById("emprestimohora").value);
    const horafim = new Date(document.getElementById("devolucaohora").value);
    if (horafim <= horainicio || (horafim < new Date() || horainicio < new Date())){
      alert("Horário de empréstimo e devolução inválidos!\r\nO horário de devolução deve ser após o horário de emprestimo e os horário não podem ser alguma data anterior ao dia de hoje.");
      submitButton.disabled = false;
      return false;
    }

    await gapi.client.load('people', 'v1', function() {
      gapi.client.people.people.get({
        resourceName: "people/me",
        personFields: "emailAddresses,names"
      }).then(async function(response) {
        const email = response.result.emailAddresses[0].value;
        const domain = email.split('@')[1];
        if (domain === 'colegiosatelite.com.br') {
          const data = new FormData(agendamento);
          data.append("email", email);
          data.append("nome", response.result.names[0].displayName);
          const action = e.target.action;
          await fetch(action, {
          method: 'POST',
          body: data,
          }).then(() => {
            alert("Agendamento feito!");
            location.reload();
          });
        } else {
          alert("Sua conta institucional não possui permissão para realizar agendamentos!");
          submitButton.disabled = false;
          return false;
        }
      });
    });
  });

  const sheetDataHandler = (sheetData) => {
    const chromeSheetDataHandler = (chromeSheetData) => {
      for (id = 0; id < chromeSheetData.length; id++) {
        const div = document.createElement("div");
        const input = document.createElement("input");

        input.type = "checkbox";
        input.classList.add("chrome");
        input.name = "chrome" + (Number(id) + 1).toString();
        input.id = id;
        
        const label = document.createElement("label");
        label.htmlFor = input.id;
        label.textContent = "Chrome " + (Number(id) + 1).toString();

        div.appendChild(input);
        div.appendChild(label);
        document.getElementById("chrome").appendChild(div);
        if (chromeSheetData[id].ocupado == "on") input.disabled = true;
      }
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
});

function horarioIncompativel(inicio, fim, inicioAgendado, fimAgendado, devolvido){
  var fimEstaEntreAgendamento = fimAgendado >= fim && fim > inicioAgendado;
  var inicioEstaEntreAgendamento = inicio >= inicioAgendado && fimAgendado > inicio;

  if (fimAgendado < inicio && fimAgendado < new Date() && !devolvido) return true;
  if (fimEstaEntreAgendamento && inicioEstaEntreAgendamento) return true;
  if (!fimEstaEntreAgendamento && inicioEstaEntreAgendamento) return true;
  if (fimEstaEntreAgendamento && !inicioEstaEntreAgendamento) return true;
  if (fimAgendado < fim && fim > inicioAgendado && inicioAgendado > inicio && inicio < fimAgendado) return true;
  if (fimAgendado == fim && inicio == inicioAgendado) return true;
  return false;
}