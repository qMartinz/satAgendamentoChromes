/**
 * Desabilita as checkboxes correspondentes aos chromes indisponíveis no horário selecionado
 * @param {Object[]} sheetData array com os agendamentos já feitos
 * @param {Object[]} chromeSheetData array com os chromes registrados
 */
function desabilitarChromes(sheetData, chromeSheetData){
  let horainicio = new Date(document.getElementById("emprestimohora").value);
  let horafim = new Date(document.getElementById("devolucaohora").value);
  if (isNaN(horafim) || isNaN(horainicio)) return; // Retorna o código caso algum dos dois inputs estiver vazio

  document.querySelectorAll(".chrome").forEach(chrome => {
    chrome.disabled = false;
    const agendados = sheetData.filter(e => e["chrome" + (Number(chrome.id) + 1).toString()] == "on");

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
 * Evento para desabilitar chromes quando #emprestimohora for alterado
 */
document.getElementById("emprestimohora").addEventListener('change', function(e) {
  getSheetDataCallback("Agendamentos", (sheetData) => getSheetDataCallback("Chromes", (chromeSheetData) => {
    desabilitarChromes(sheetData, chromeSheetData)
  }));
});

/**
 * Evento para desabilitar chromes quando #devolucaohora for alterado
 */
document.getElementById("devolucaohora").addEventListener('change', function(e) {
  getSheetDataCallback("Agendamentos", (sheetData) => getSheetDataCallback("Chromes", (chromeSheetData) => {
    desabilitarChromes(sheetData, chromeSheetData)
  }));
});

async function agendar(e) {
  let submitButton = agendamento.querySelector("[type='submit']");
  document.getElementById("overlay").hidden = false;

  e.preventDefault();

  // Cancela o agendamento caso o usuário não tenha selecionado um chrome
  if (!(document.querySelectorAll(".chrome:checked").length>0)){
    alert("Selecione ao menos um Chrome para realizar o agendamento!");
    submitButton.disabled = false;
    return false;
  }

  // Cancela o agendamento caso o usuário tenha colocado um horário inválido
  const horainicio = new Date(document.getElementById("emprestimohora").value);
  const horafim = new Date(document.getElementById("devolucaohora").value);
  if (horafim <= horainicio || (horafim < new Date() || horainicio < new Date())){
    alert("Horário de empréstimo e devolução inválidos!\r\nO horário de devolução deve ser após o horário de emprestimo e os horário não podem ser alguma data anterior ao dia de hoje.");
    submitButton.disabled = false;
    return false;
  }

  // Realiza o agendamento
  await gapi.client.load('people', 'v1', function() {
    gapi.client.people.people.get({
      resourceName: "people/me",
      personFields: "emailAddresses,names"
    }).then(async function(response) {
      const email = response.result.emailAddresses[0].value;
      const domain = email.split('@')[1];

      // Cancela o agendamento se o usuário não possuir permissão
      if (!(domain === 'colegiosatelite.com.br')) {
        alert("Sua conta institucional não possui permissão para realizar agendamentos!");
        submitButton.disabled = false;
        return;
      }
      
      // Adiciona o agendamento à planilha
      const data = new FormData(agendamento);
      data.append("email", email);
      data.append("nome", response.result.names[0].displayName);
      data.append("accesstoken", gapi.client.getToken().access_token);
      const action = e.target.action;
      await fetch(action, {
      method: 'POST',
      body: data,
      }).then((r) => {
        alert("Agendamento feito!");
        agendamento.reset();
        getSheetDataCallback("Chromes", (chromeData) => createChromeCheckboxes(chromeData));
        document.getElementById("overlay").hidden = true;
      }, function(err) {
        console.error("Erro ao adicionar agendamento", err);
      });
    });
  });
}

/**
 * Cria os checkboxes para cada chrome
 * @param {Object[]} chromeData Dados da planilha de Chromes 
 */
function createChromeCheckboxes(chromeData){
  document.getElementById("chrome").innerHTML = "";
  for (col = 0; col < chromeData.length/10; col++){
    const divCol = document.createElement("div");
    divCol.classList.add("chromeCol");
    document.getElementById("chrome").appendChild(divCol);

    for (id = 0 + (10 * col); id < 10 + 10 * col; id++) {
      const wrapper = document.createElement("div");
      wrapper.classList.add('checkbox-wrapper-4');
      wrapper.innerHTML = '<label class="cbx" for="' + id + '"><span><svg width="12px" height="10px"><use xlink:href="#check-4"></use></svg></span><span>' + "Chrome " + (Number(id) + 1).toString() + '</span></label><svg class="inline-svg"><symbol id="check-4" viewBox="0 0 12 10"><polyline points="1.5 6 4.5 9 10.5 1"></polyline></symbol></svg>'

      const input = document.createElement("input");
  
      input.type = "checkbox";
      input.classList.add("chrome", "inp-cbx");
      input.name = "chrome" + (Number(id) + 1).toString();
      input.id = id;

      wrapper.insertBefore(input, wrapper.childNodes[0]);
      divCol.appendChild(wrapper);
      if (chromeData[id].ocupado == "on") input.disabled = true;
    }
  }
}

/**
 * Evento para fazer o que é necessário quando a página for aberta
 */
window.addEventListener("DOMContentLoaded", function() {
  const agendamento = document.getElementById('agendamento');

  // Evento acionado quando o usuário tenta realizar um agendamento
  agendamento.addEventListener("submit", (e) => agendar(e));
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
  if (fimEstaEntreAgendamento && inicioEstaEntreAgendamento) return true;
  if (!fimEstaEntreAgendamento && inicioEstaEntreAgendamento) return true;
  if (fimEstaEntreAgendamento && !inicioEstaEntreAgendamento) return true;
  if (fimAgendado < fim && fim > inicioAgendado && inicioAgendado > inicio && inicio < fimAgendado) return true;
  if (fimAgendado == fim && inicio == inicioAgendado) return true;
  return false;
}

/**
 * Implementação de {@link handleAuthorize} para realizar o login e abrir o painel de administrador
 */
async function authorizeAgendamentos() {
  await new Promise((resolve, reject) => handleAuthorize(resolve, reject, false));
}