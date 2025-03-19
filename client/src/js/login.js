import { AxiosHeaders } from "axios";
import main from "./main";

document.addEventListener("DOMContentLoaded", function (event) {
  main.event.init();
})

let login = {};

// chamada para cadastra o usuário
const cadastrarLogin = document.getElementById('cadastrarLogin');
cadastrarLogin.addEventListener('click', (e) => {
  // e.preventDefault();
  login.method.criarLogin();
})

// chamada para logar
const logar = document.getElementById('logar');
logar.addEventListener('click', (e) => {
  // e.preventDefault();
  login.method.login();
})

login.event = {
  init: () => {
    AOS.init();
  },
}

login.method = {

  // Valida os campos
  validarLogin: () => {

    let email = document.querySelector("#EmailLogin").value.trim();
    let senha = document.querySelector("#SenhaLogin").value.trim();

    // valida se os campos estão preenchidos
    if (email.length == 0) {
      main.method.mensagem("Informe o e-mail, por favor.");
      document.querySelector("#EmailLogin").focus();
      return;
    }
    if (senha.length == 0) {
      main.method.mensagem("Informe a senha, por favor.");
      document.querySelector("#SenhaLogin").focus();
      return;
    }

    // chamada ao método de login
    login.method.login(email, senha);
  },

  // método que faz o login (via API)
  login: (email, senha) => {
    //objeto JSON
    let dados = {
      email: email,
      senha: senha,
    };

    // chamada ao método POST - API
    main.method.post_logar(
      "/login", // rota
      JSON.stringify(dados), // dados - tem que ser string
      (response) => { // callback - sucesso
        if (response.status == "error") { // se o status for erro, exibe a mensagem
          console.log(response.message)
          console.log(response)
          main.method.mensagem(response.message);
          return;
        }
        // se o status for sucesso, grava os dados no storage e redireciona para a home
        if (response.status == 'success') {
          // main.method.gravarValorStorage(response.TokenAcesso, 'token')
          main.method.gravarValorStorage(response.Nome, 'Nome')
          main.method.gravarValorStorage(response.Email, 'Email')
          main.method.gravarValorStorage(response.Logo, 'Logo')

          window.location.href = '/pages/login.html'
        }
      },
      (error) => {
        console.error(error);
      },
      true // com token
    );
  },

  criarLogin: () => {

    const criarNome = document.getElementById('criarNome').value.trim();
    const criarEmail = document.getElementById('criarEmail').value.trim();
    const criarSenha = document.getElementById('criarSenha').value.trim();

    main.method.post_criar(
      "/register",
      JSON.stringify({
        nome: criarNome,
        email: criarEmail,
        senha: criarSenha,
      }),
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error(error);
      }
    )

  },

}