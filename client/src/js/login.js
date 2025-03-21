import axios, { AxiosHeaders } from "axios";
import main from "./main";

let login = {};

document.addEventListener("DOMContentLoaded", function (event) {
  main.event.init();
})

// chamada para cadastra o usuário
document.getElementById('cadastrarLogin').addEventListener('DOMContentLoaded', function () {
const cadastrarLogin = 
  cadastrarLogin.addEventListener('click', (e) => {
    e.preventDefault();
    login.method.criarLogin();
  })
})

// chamada para logar
// document.getElementById('logar').addEventListener('click', (e) => {
//   e.preventDefault();
//   const EmailLogin = document.getElementById('EmailLogin').value.trim();
//   const SenhaLogin = document.getElementById('SenhaLogin').value.trim();

//   login.method.login(EmailLogin, SenhaLogin);

// });


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
  login: (EmailLogin, SenhaLogin) => {

    const formData = new FormData();
    formData.append('email', EmailLogin);
    formData.append('senha', SenhaLogin);

    fetch('http://localhost:8000/api/login', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
      },
      body: formData
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(data);

        main.method.gravarValorStorage(data.api_token, 'token');
        main.method.gravarValorStorage(data.Nome, 'Nome');
        main.method.gravarValorStorage(data.Email, 'Email');

        return data, window.location.href = '../pages/galeria-salas.html';

      })
      .catch(error => {
        console.error('Error:', error);
        main.method.mensagem("Login failed. Please check your credentials.");
      });

      return formData;
  },

  // método para criar usuário (via API)
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

export default login;