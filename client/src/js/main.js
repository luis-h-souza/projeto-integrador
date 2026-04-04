import axios from 'axios';
import { API_BASE_URL } from "./apiConfig.js";

document.addEventListener("DOMContentLoaded", function (event) {
  main.event.init();
})

let main = {};

// eventos
main.event = {
  init: () => {
    AOS.init();
  }
}

// métodos
main.method = {

  // centraliza as chamadas de GET - axios
  get: async (url, callbackSuccess, callbackError, login = false) => {
    const fullUrl = `${API_BASE_URL}${url}`;

    try {
      // Temporariamente desabilitado validação de token para teste
      const response = await axios.get(fullUrl, {
        headers: { // cabeçalho da requisição
          "Content-Type": "application/json;charset=utf-8"
        }
      });
      callbackSuccess(response.data);
    } catch (error) {
      console.error('Erro na requisição:', error);
      if (error.response && error.response.status === 401) {
        // main.method.logout();
      }
      callbackError(error);
    }
  },

  // centraliza as chamadas de POST para criação de usuário
  post_criar: async (url, dados, callbackSuccess, callbackError) => {
    const fullUrl = `${API_BASE_URL}${url}`;
    const payload =
      typeof dados === "string" ? JSON.parse(dados) : dados;

    try {
      const response = await axios.post(fullUrl, payload, {
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        }
      });
      callbackSuccess(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        main.method.logout();
      }
      callbackError(error);
    }
  },

  // centraliza as chamadas de upload
  upload: async (url, dados, callbackSuccess, callbackError, login = false) => {
    const targetUrl = `${API_BASE_URL}${url}`;
    try {
      if (main.method.validaToken(login)) {
        const token = main.method.obterValorStorage("token");
        const response = await axios.post(targetUrl, dados, {
          headers: {
            "Mime-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`
          }
        });
        callbackSuccess(response.data);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        main.method.logout();
      }
      callbackError(error);
    }
  },

  validaToken: (login = false) => {

    // verifica se existe o token na sessão
    let tokenAtual = main.method.obterValorStorage('token');
    console.log(tokenAtual)

    // validação se o token não existe
    if (
      (tokenAtual == undefined ||
        tokenAtual == null ||
        tokenAtual == "" ||
        tokenAtual == "null") &&
      !login
    ) {
      // window.location.href = "/src/pages/login.html";
      return false;
    }
    return true;
  },

  // grava valores no localstorage
  gravarValorStorage: (chave, valor) => {
    localStorage.setItem(chave, valor);
  },

  // obtem um valor do localstorage
  obterValorStorage: (chave) => {
    const valor = localStorage.getItem(chave)

    return valor ? valor : null;
  },

  // remove uma sessão
  removerSessao: (local) => {
    localStorage.removeItem(local);
  },

  logout: async () => {
    const token = main.method.obterValorStorage("token");
    if (token) {
      try {
        await fetch(`${API_BASE_URL}/logout`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (_) {}
    }
    localStorage.clear();
    window.location.href = "../index.html";
  },

  // método para criarum toast de resposta
  mensagem: (texto, cor = "red", tempo = 4500) => {
    let container = document.querySelector("#container-mensagens");

    if (container.childElementCount > 2) {
      return;
    }

    // gera um id provisório
    let id = Math.floor(Date.now() * Math.random()).toString();

    let msg = `<div id="msg-${id}" class="toast ${cor}">${texto}</div>`;

    container.insertAdjacentHTML('beforeend', msg);

    setTimeout(() => {
        const element = document.querySelector(`#msg-${id}`);
        if (element) {
            element.remove();
        }
    }, tempo);
  },

}

export default main;