/* exported gapiLoaded */
      /* exported gisLoaded */
      /* exported handleAuthClick */
      /* exported handleSignoutClick */

      // TODO(developer): Set to client ID and API key from the Developer Console
      const CLIENT_ID = '724174214980-3dm3l4fah5kbi5670fp53rn0rcqqtf5f.apps.googleusercontent.com';
      const API_KEY = 'AIzaSyDhpSghX25j4I771ylBVisI31nX5FWe3eA';

      // Discovery doc URL for APIs used by the quickstart
      const DISCOVERY_DOC = 'https://sheets.googleapis.com/$discovery/rest?version=v4';

      // Authorization scopes required by the API; multiple scopes can be
      // included, separated by spaces.
      const SCOPES = 'https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid';

      let tokenClient;
      let gapiInited = false;
      let gisInited = false;

      if (document.getElementById('authorize_button') != null) document.getElementById('signout_button').style.visibility = 'hidden';

      /**
       * Callback after api.js is loaded.
       */
      function gapiLoaded() {
        gapi.load('client', initializeGapiClient);
      }

      /**
       * Callback after the API client is loaded. Loads the
       * discovery doc to initialize the API.
       */
      async function initializeGapiClient() {
        await gapi.client.init({
          apiKey: API_KEY,
          discoveryDocs: [DISCOVERY_DOC],
        });
        gapiInited = true;
        maybeEnableButtons();
      }

      /**
       * Callback after Google Identity Services are loaded.
       */
      function gisLoaded() {
        tokenClient = google.accounts.oauth2.initTokenClient({
          client_id: CLIENT_ID,
          scope: SCOPES,
          callback: '', // defined later
        });
        gisInited = true;
        maybeEnableButtons();
      }

      /**
       * Enables user interaction after all libraries are loaded.
       */
      function maybeEnableButtons() {
        if (gapiInited && gisInited && document.getElementById('authorize_button') != null) {
          document.getElementById('authorize_button').style.visibility = 'visible';
        }
      }

      /**
       *  Sign in the user upon button click.
       */
      function handleAuthorize(resolve, reject, painel){
        tokenClient.callback = async (resp) => {
          if (resp.error !== undefined) {
              reject(resp);
          }
          
          if (painel) showPainel();
          resolve();
        };

        if (gapi.client.getToken() === null) {
          // Prompt the user to select a Google Account and ask for consent to share their data
          // when establishing a new session.
          tokenClient.requestAccessToken({prompt: 'consent'});
        } else {
          // Skip display of account chooser and consent dialog for an existing session.
          tokenClient.requestAccessToken({prompt: ''});
        }
      }

      async function showPainel(){        
        gapi.client.load('drive', 'v3', function () {
          const permissions = gapi.client.drive.permissions.list({
            fileId: "1XUVqK59o1nPMhZTG_eh8ghd0SArB2fZyk1pnOf_ne7A"
          }).then(function(response) {
            console.log('Login permitido');

            document.getElementById('authorize_button').style.visibility = 'hidden';
            document.getElementById('signout_button').style.visibility = 'visible';
            document.getElementById("paginaPainel").hidden = false;
            criarTabelaAgendamentos();
            criarTabelaChromes();
            criarTabelaArquivados();
          }, function(error) {
              console.error('Erro ao verificar permissões:', error);
              if (error.status === 403) {
                console.log('Usuário não tem permissão para editar o arquivo. Redirecionando...');
                location.assign("https://qmartinz.github.io/satAgendamentoChromes/PainelAdm/AcessoNegado");
              }
          });
        });
      }

      /**
       *  Sign out the user upon button click.
       */
      function handleSignoutClick() {
        const token = gapi.client.getToken();
        if (token !== null) {
          google.accounts.oauth2.revoke(token.access_token);
          gapi.client.setToken('');
          document.getElementById('signout_button').style.visibility = 'hidden';
          document.getElementById('authorize_button').style.visibility = 'visible';
          document.getElementById("paginaPainel").hidden = true;
        }
      }