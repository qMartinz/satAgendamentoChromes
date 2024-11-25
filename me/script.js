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

async function showMe() {
  document.getElementById('authorize_button').hidden = true;
  document.getElementById('signout_button').hidden = false;
  document.getElementById("content").hidden = false;

  gapi.client.load('people', 'v1', function () {
    gapi.client.people.people.get({
      resourceName: "people/me",
      personFields: "emailAddresses,names,photos,coverPhotos"
    }).then(async function (response) {
      console.log(response.result)
      document.getElementById('photo').src = response.result.photos[0].url;
      document.getElementById('user').innerHTML = `Olá, ${response.result.names[0].displayName}`;
      const email = response.result.emailAddresses[0].value;

      getSheetDataCallback('Agendamentos', (agendados) => {
        let count = agendados.filter(agend => agend.devolvido != "on" && agend.email === response.result.emailAddresses[0].value).length;

        document.getElementById('count').innerHTML = `Você possui ${count} agendamentos pendentes.`;

        console.log(agendados);
        getAgendamentos(agendados).filter(agendamento => agendamento.devolvido != "on" && email == agendamento.email).forEach(agendamento => document.getElementById('myappointments').append(createAppointment(agendamento)));

        document.querySelectorAll('.item .title *').forEach(element => element.addEventListener('click', (e) => {
          if (e.target.classList.contains('expanded')) {e.target.classList.remove('expanded')} else {e.target.classList.add('expanded')};
        
          console.log(e.target.parentElement.parentElement);
        
          if (e.target.parentElement.parentElement.querySelector('.info').classList.contains('expanded')) {e.target.parentElement.parentElement.querySelector('.info').classList.remove('expanded')} else {e.target.parentElement.parentElement.querySelector('.info').classList.add('expanded')};
        }));
      });
    });
  });
}

async function authorizeMe() {
  await new Promise((resolve, reject) => handleAuthorize(resolve, reject, showMe));
}

function createAppointment(appointment) {
  console.log(appointment);
  let item = document.createElement('div');

  let emprestimoarr = appointment.emprestimohora.split("T")[0].split("-");
  let emprestimo = emprestimoarr[2] + "/" + emprestimoarr[1] + "/" + emprestimoarr[0] + " às " + appointment.emprestimohora.split("T")[1];

  let devolucaoarr = appointment.devolucaohora.split("T")[0].split("-");
  let devolucao = devolucaoarr[2] + "/" + devolucaoarr[1] + "/" + devolucaoarr[0] + " às " + appointment.devolucaohora.split("T")[1];

  item.innerHTML = `<div class="title">
                        <h3>${getTurma(appointment.turma)} - ${appointment.chromes.length} Chromes</h3>
                    </div>
                    <div class="info">
                        <p>Empréstimo: ${emprestimo}</p>
                        <p>Devolução: ${devolucao}</p>
                        <p>Observação: ${appointment.obs}</p>
                        <ul class="chromes">

                        </ul>
                    </div>`;

  item.classList.add('item');

  appointment.chromes.forEach(chrome => {
    let listitem = document.createElement('li');
    listitem.textContent = `Chrome ${chrome.replace('chrome', '')}`;
    item.querySelector('.chromes').append(listitem);
  });

  return item;
}

window.addEventListener("load", function() {
  gapi.load('client', function(){
    gapi.client.init({}).then(function(){
      fetch("https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=" + window.localStorage.getItem("agendamentos_access_token")).then(function(response){
        if (response.ok){
          gapi.client.setToken({access_token:window.localStorage.getItem("agendamentos_access_token")});
          showMe();
        }
      });
    });
  });
});