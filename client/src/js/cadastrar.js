import axios, { AxiosHeaders } from "axios";
import main from "./main";

let cadastrar = {};

// chamada para cadastra o usuário
document.getElementById('cadastrarLogin').addEventListener('click', function (e) {
  e.preventDefault();

  const criarNome = document.getElementById('criarNome').value.trim();
  const criarEmail = document.getElementById('criarEmail').value.trim();
  const criarSenha = document.getElementById('criarSenha').value.trim();

  cadastrar.method.criarLogin(criarNome, criarEmail, criarSenha);
})

cadastrar.method = {

  // método para criar usuário (via API)
  criarLogin: () => {

    const criarNome = document.getElementById('criarNome').value.trim();
    const criarEmail = document.getElementById('criarEmail').value.trim();
    const criarSenha = document.getElementById('criarSenha').value.trim();

    // valida se os campos estão preenchidos
    if (criarNome.length == 0) {
      main.method.mensagem("Informe um nome, por favor.");
      document.querySelector("#criarNome").focus();
      return;
    }
    if (criarEmail.length == 0) {
      main.method.mensagem("Informe um e-mail, por favor.");
      document.querySelector("#criarEmail").focus();
      return;
    }
    if (criarSenha.length == 0) {
      main.method.mensagem("Informe uma senha, por favor.");
      document.querySelector("#criarSenha").focus();
      return;
    }

    main.method.post_criar(
      "/register",
      {
        nome: criarNome,
        email: criarEmail,
        senha: criarSenha,
      },
      (response) => {
        console.log(response);

        // Auto-login se o token for retornado
        if (response.token) {
          main.method.gravarValorStorage('token', response.token);
          main.method.gravarValorStorage('nome', response.nome);
          main.method.gravarValorStorage('email', response.email);

          main.method.mensagem("Cadastro realizado com sucesso! Redirecionando...", "green");

          setTimeout(() => {
            window.location.href = '/src/pages/galeria-salas.html';
          }, 1000);
        } else {
          main.method.mensagem("Cadastro realizado! Faça login para continuar.", "green");
          setTimeout(() => {
            window.location.href = './login.html';
          }, 2000);
        }
      },
      (error) => {
        console.error(error);
      }
    )
    return;
  },

}

export default cadastrar;