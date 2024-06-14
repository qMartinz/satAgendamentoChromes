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

document.querySelectorAll(".aula").forEach(element => {
  element.addEventListener('change', function(e) {
    const sheetDataHandler = (sheetData) => {
      document.querySelectorAll(".chrome").forEach(chrome => chrome.disabled = false);

      let chromesOcupados = [];
      document.querySelectorAll(".aula").forEach(aula => {
        document.querySelector("label[for=" + aula.id + "].teste").hidden = true;

        if (aula.checked){
          let chromesOcupadosNaAula = desabilitarChromes(aula.name, document.getElementById("periodo").value, sheetData);
          chromesOcupados.push(chromesOcupadosNaAula);

          if (chromesOcupadosNaAula.length>0){
            document.querySelector("label[for=" + aula.id + "].teste").hidden = false;
          }
        }
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
});

document.getElementById("periodo").addEventListener("change", function(e) {
  const sheetDataHandler = (sheetData) => {
    document.querySelectorAll(".chrome").forEach(chrome => chrome.disabled = false);

    let chromesOcupados = [];
    document.querySelectorAll(".aula").forEach(aula => {
      document.querySelector("label[for=" + aula.id + "].teste").hidden = true;

      if (aula.checked){
        let chromesOcupadosNaAula = desabilitarChromes(aula.name, document.getElementById("periodo").value, sheetData);
        chromesOcupados.push(chromesOcupadosNaAula);

        if (chromesOcupadosNaAula.length>0){
          document.querySelector("label[for=" + aula.id + "].teste").hidden = false;
        }
      }
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

window.addEventListener("DOMContentLoaded", function() {
  const agendamento = document.getElementById('agendamento');
  agendamento.addEventListener("submit", function(e) {
    e.preventDefault();

    if (!(document.querySelectorAll(".chrome:checked").length>0)){
      alert("Selecione ao menos um Chrome para realizar o agendamento!");
      return false;
    }

    if (!(document.querySelectorAll(".aula:checked").length>0)){
      alert("Selecione ao menos um horário de aula para fazer o agendamento!");
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
});

function painelAdm(){
  location.assign("https://qmartinz.github.io/satAgendamentoChromes/PainelAdm");
}