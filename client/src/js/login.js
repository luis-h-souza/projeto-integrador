import main from "./main";

document.addEventListener("DOMContentLoaded", function (event) {
  main.event.init();
})

let login = {};

login.event = {
  init: () => {
    AOS.init();
  }
}

login.method = {

  // Valida os campos
  validarLogin: () => {
    let email = document.querySelector("#txtEmailLogin").value.trim();
    let senha = document.querySelector("#txtSenhaLogin").value.trim();

    // valida se os campos estão preenchidos
    if (email.length == 0) {
      app.method.mensagem("Informe o e-mail, por favor.");
      document.querySelector("#txtEmailLogin").focus();
      return;
    }
    if (senha.length == 0) {
      app.method.mensagem("Informe a senha, por favor.");
      document.querySelector("#txtSenhaLogin").focus();
      return;
    }

    // chamada ao método de login
    login.method.login(email, senha);
  },

  // método que faz o login (via API)
  login: (email, senha) => {
    //objeto JSON
    var dados = {
      email: email,
      senha: senha,
    };

    // chamada ao método POST - API
    app.method.post(
      "/login", // rota
      JSON.stringify(dados), // dados - tem que ser string
      (response) => { // callback - sucesso
        if (response.status == "error") { // se o status for erro, exibe a mensagem
          app.method.mensagem(response.message);
          return;
        }

        // se o status for sucesso, grava os dados no storage e redireciona para a home
        if (response.status == 'success') {
          app.method.gravarValorStorage(response.TokenAcesso, 'token')
          app.method.gravarValorStorage(response.Nome, 'Nome')
          app.method.gravarValorStorage(response.Email, 'Email')
          app.method.gravarValorStorage(response.Logo, 'Logo')

          window.location.href = '/painel/home.html'
        }
      },
      (error) => {
        console.error(error);
      },
      true // com token
    );
  },

}

// botão de logar
const login = document.getElementById('criarLogin');
login.addEventListener('click', () => {
  login.method.login();
  main.method.mensagem('logar')
})