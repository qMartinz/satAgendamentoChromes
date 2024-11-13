async function showMe(){
    document.getElementById('authorize_button').hidden = true;
    document.getElementById('signout_button').hidden = false;
    document.getElementById("content").hidden = false;

    gapi.client.load('people', 'v1', function() {
      gapi.client.people.people.get({
        resourceName: "people/me",
        personFields: "emailAddresses,names,photos,coverPhotos"
      }).then(async function(response) {
        console.log(response.result)
        document.getElementById('photo').src = response.result.photos[0].url;
        document.getElementById('user').innerHTML = `Olá, ${response.result.names[0].displayName}`;

        getSheetDataCallback('Agendamentos', (agendados) => {
          let count = agendados.filter(agend => agend.devolvido != "on" && agend.email === response.result.emailAddresses[0].value).length;

          document.getElementById('count').innerHTML = `Você possui ${count} agendamentos pendentes.`;
        });
      });
    });
  }

async function authorizeMe() {
    await new Promise((resolve, reject) => handleAuthorize(resolve, reject, showMe));
}