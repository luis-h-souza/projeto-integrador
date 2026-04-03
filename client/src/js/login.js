import main from "./main";
import { API_BASE_URL } from "./apiConfig.js";

let login = {};

document.addEventListener("DOMContentLoaded", function (event) {
  main.event.init();
})

// chamada para logar
document.getElementById('logar').addEventListener('click', (e) => {
  e.preventDefault();

  login.method.validarLogin();
});

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
      main.method.mensagem("Informe seu e-mail, por favor.");
      document.querySelector("#EmailLogin").focus();
      return;
    }
    if (senha.length == 0) {
      main.method.mensagem("Informe sua senha, por favor.");
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

    fetch(`${API_BASE_URL}/login`, {
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
        console.log('Resposta da API:', data);
        console.log('Nome da API:', JSON.stringify(data.nome));
        console.log('Email da API:', JSON.stringify(data.email));

        main.method.gravarValorStorage('token', data.token);
        main.method.gravarValorStorage('nome', data.nome);
        main.method.gravarValorStorage('email', data.email);

        console.log('Token salvo:', data.token);

        return data, window.location.href = '/src/pages/galeria-salas.html';

      })
      .catch(error => {
        console.error('Error:', error);
        main.method.mensagem("Falha no login, tente novamente.");
      });

      return formData;
  },

}

export default login;