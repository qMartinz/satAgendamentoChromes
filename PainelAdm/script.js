window.addEventListener("DOMContentLoaded", function() {
    const login = document.getElementById('login');

    const sheetDataHandler = (sheetData) => {
        if (sessionStorage.getItem("sessionID") == sheetData[0].session) {
            document.getElementById("paginaLogin").hidden = true;
            document.getElementById("paginaPainel").hidden = false;
            console.log("Login automático permitido")
        } else if (sessionStorage.getItem("sessionID") !== sheetData[0].session && sessionStorage.getItem("sessionID") !== null) {
            document.getElementById("loginInfo").textContent = "Sessão expirada, repita o login.";
            document.getElementById("loginInfo").hidden = false;
            document.getElementById("paginaLogin").hidden = false;
            document.getElementById("paginaPainel").hidden = true;
            console.log("Sessão expirada")
        } else if (sessionStorage.getItem("sessionID")  == null) {
            document.getElementById("paginaLogin").hidden = false;
            document.getElementById("paginaPainel").hidden = true;
            console.log("Sessão não iniciada")
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
                if (sheetData[0].usuario == usuario && sheetData[0].senha == senha) {
                    sessionStorage.setItem("sessionID", sheetData[0].session);
                    document.getElementById("paginaLogin").hidden = true;
                    document.getElementById("paginaPainel").hidden = false;
                    console.log("Login permitido")
                } else {
                    document.getElementById("loginInfo").textContent = "Usuário ou senha incorreto.";
                    document.getElementById("loginInfo").hidden = false;
                    console.log("Login inválido")
                    login.reset();
                }
            }
            
            getSheetData({
            sheetID: "1XUVqK59o1nPMhZTG_eh8ghd0SArB2fZyk1pnOf_ne7A",
            sheetName: "Login",
            callback: sheetDataHandler,
            });
        });
    });
});