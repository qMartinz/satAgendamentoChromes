// new Date("01/01/1970 " + horafim) < new Date("01/01/1970 " + horainicio)

function desabilitarChromes(v, p, sheetData){
  const agendados = sheetData.filter(e => e[v] == "on");
  console.log("sheetdata", sheetData);
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

    document.querySelectorAll(".chrome").forEach(chrome => {
      chrome.disabled = false;
      const agendados = sheetData.filter(e => e[chrome.id] == "on");

      agendados.forEach(element => {
        let fimAgendado = element.devolucaohora;
        let splitFimAgendado = fimAgendado.split("T");

        let inicioAgendado = element.emprestimohora;
        let splitInicioAgendado = inicioAgendado.split("T");

        const horafimAgendado = new Date(splitFimAgendado[0] + " " + splitFimAgendado[1]);
        const horainicioAgendado = new Date(splitInicioAgendado[0] + " " + splitInicioAgendado[1]);

        chrome.disabled = horarioIncompativel(horainicio, horafim, horainicioAgendado, horafimAgendado);
      });
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

    document.querySelectorAll(".chrome").forEach(chrome => {
      chrome.disabled = false;
      const agendados = sheetData.filter(e => e[chrome.id] == "on");

      agendados.forEach(element => {
        let fimAgendado = element.devolucaohora;
        let splitFimAgendado = fimAgendado.split("T");

        let inicioAgendado = element.emprestimohora;
        let splitInicioAgendado = inicioAgendado.split("T");

        const horafimAgendado = new Date(splitFimAgendado[0] + " " + splitFimAgendado[1]);
        const horainicioAgendado = new Date(splitInicioAgendado[0] + " " + splitInicioAgendado[1]);

        chrome.disabled = horarioIncompativel(horainicio, horafim, horainicioAgendado, horafimAgendado);
      });
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
  agendamento.addEventListener("submit", function(e) {
    e.preventDefault();

    if (!(document.querySelectorAll(".chrome:checked").length>0)){
      alert("Selecione ao menos um Chrome para realizar o agendamento!");
      return false;
    }

    const data = new FormData(agendamento);
      const action = e.target.action;
      fetch(action, {
      method: 'POST',
      body: data,
      })
      .then(() => {
        alert("Agendamento feito!");
        location.reload();
      });
  });

  const sheetDataHandler = (sheetData) => {
    let chromesOcupados = [];
    const agendados = sheetData.filter(e => e["outro"] == "on");
    agendados.forEach(element => {
      Object.entries(element).forEach(item => {
        if (!chromesOcupados.includes(item[0]) && item[0].toString().startsWith("chrome") && item[1] == "on") {
          chromesOcupados.push(item[0]);
        }
      });
    });

    chromesOcupados = chromesOcupados.flat();

    console.log("Chromes ocupados no horário selecionado:", chromesOcupados);

    chromesOcupados.forEach(chrome => {
      document.getElementById(chrome).disabled = true;
    });
  }

  getSheetData({
    sheetID: "1XUVqK59o1nPMhZTG_eh8ghd0SArB2fZyk1pnOf_ne7A",
    sheetName: "Agendamentos",
    callback: sheetDataHandler,
  });
});

function horarioIncompativel(inicio, fim, inicioAgendado, fimAgendado){
  var fimEstaEntreAgendamento = fimAgendado >= fim && fim > inicioAgendado;
  var inicioEstaEntreAgendamento = inicio >= inicioAgendado && fimAgendado > inicio;

  if (fimEstaEntreAgendamento && inicioEstaEntreAgendamento) return true;
  if (!fimEstaEntreAgendamento && inicioEstaEntreAgendamento) return true;
  if (fimEstaEntreAgendamento && !inicioEstaEntreAgendamento) return true;
  if (fimAgendado == fim && inicio == inicioAgendado) return true;
  return false;
}