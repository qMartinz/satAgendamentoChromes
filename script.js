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
document.getElementById("emprestimohora").addEventListener('change', async function(e) {
  agendamento.querySelector("[type='submit']").disabled = true;
  await getSheetDataCallback("Agendamentos", (sheetData) => getSheetDataCallback("Chromes", (chromeSheetData) => {
    desabilitarChromes(sheetData, chromeSheetData)
  }));
  agendamento.querySelector("[type='submit']").disabled = false;
});

/**
* Evento para desabilitar chromes quando #devolucaohora for alterado
*/
document.getElementById("devolucaohora").addEventListener('change', async function(e) {
  agendamento.querySelector("[type='submit']").disabled = true;
  await getSheetDataCallback("Agendamentos", (sheetData) => getSheetDataCallback("Chromes", (chromeSheetData) => {
    desabilitarChromes(sheetData, chromeSheetData)
  }));
  agendamento.querySelector("[type='submit']").disabled = false;
});

async function agendar(e) {
  document.getElementById("overlay").hidden = false;
  
  e.preventDefault();
  
  await new Promise(async (res, rej) => {
    // Cancela o agendamento caso o usuário não tenha selecionado um chrome
    if (!(document.querySelectorAll(".chrome:checked:not([disabled])").length>0)){
      rej(1);
    }
    
    // Cancela o agendamento caso o usuário tenha colocado um horário inválido
    const horainicio = new Date(document.getElementById("emprestimohora").value);
    const horafim = new Date(document.getElementById("devolucaohora").value);
    if (horafim <= horainicio){
      rej(2);
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
          rej(3);
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
          res();
        }, function(err) {
          console.error("Erro ao adicionar agendamento", err);
          rej(4);
        });
      });
    });
  }).then(
    () => {successAgendamento()}, (err) => {errorAgendamento(err)}
  );
}

function successAgendamento() {
  document.getElementById("loading").hidden = true;
  document.getElementById("success").hidden = false;
  agendamento.reset();
  getSheetDataCallback("Chromes", (chromeData) => createChromeCheckboxes(chromeData));
}

function errorAgendamento(error) {
  document.getElementById("loading").hidden = true;
  document.getElementById("error").hidden = false;
  switch(error){
    case 1:
    document.getElementById("error_reason").textContent = "É preciso selecionar ao menos um Chromebook disponível.";
    break;
    case 2:
    document.getElementById("error_reason").textContent = "Horário de empréstimo e devolução inválidos.";
    break;
    case 3:
    document.getElementById("error_reason").textContent = "Sua conta não possui permissão para realizar um agendamento.";
    break;
    case 4:
    document.getElementById("error_reason").textContent = "Por favor, contate o email de suporte.";
    break;
  }
}

function closeLoading(){
  document.getElementById("overlay").hidden = true;
  document.getElementById("loading").hidden = false;
  document.getElementById("success").hidden = true;
  document.getElementById("error").hidden = true;
}

/**
* Cria os checkboxes para cada chrome
* @param {Object[]} chromeData Dados da planilha de Chromes 
*/
function createChromeCheckboxes(chromeData){
  document.getElementById("chrome").innerHTML = "";
  for (id = 0; id < chromeData.length; id++) {
    const wrapper = document.createElement("div");
    wrapper.classList.add('checkbox-wrapper-4');
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

/**
* Evento para fazer o que é necessário quando a página for aberta
*/
window.addEventListener("DOMContentLoaded", function() {
  const agendamento = document.getElementById('agendamento');
  gapi.load('client', function(){
    gapi.client.init({}).then(function(){
      fetch("https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=" + window.sessionStorage.getItem("access_token")).then(function(response){
        if (response.ok){
          gapi.client.setToken({access_token:window.sessionStorage.getItem("access_token")});
          showAgendamentos();
        }
      });
    });
  });
  
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