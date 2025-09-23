import axios from 'axios';

document.addEventListener("DOMContentLoaded", function (event) {
  main.event.init();
})

const BASE = 'src/pages'

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
    const baseUrl = "http://localhost:8000/api";
    const fullUrl = `${baseUrl}${url}`;
    
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
  
  // centraliza as chamadas de POST
  post_criar: async (url, dados, callbackSuccess, callbackError) => {
    url = "http://localhost:8000/api/register";
    try {
        const response = await axios.post(url, dados, {
          headers: {
            "cors": false,
            "Content-Type": "application/json;charset=utf-8",
            "Authorization": ""//token
          }
        });
        callbackSuccess(response.data);
      
    } catch (error) {
      if (error.response && error.response.status === 401) {
        main.method.logout();
      }
      callbackError(error);
    }
    window.location.href = `/src/pages/login.html`
  },

  post: async (url, dados, callbackSuccess, callbackError, login = false) => {
    url = "http://localhost:8000/api/login";
    try {
      // if (main.method.validaToken(login)) {
      //   const token = main.method.obterValorStorage("token");
        const response = await axios.post(url, dados, {
          headers: {
            "cors": false,
            "Content-Type": "application/json;charset=utf-8",
            "Authorization": ""   //token
          }
        });
        callbackSuccess(response.data);
      
    } catch (error) {
      if (error.response && error.response.status === 401) {
        app.method.logout();
      }
      callbackError(error);
    }
    window.location.href = `${BASE}/galeria-salas.html`
  },

  // centraliza as chamadas de upload
  upload: async (url, dados, callbackSuccess, callbackError, login = false) => {
    url = "http://localhost:8000/api";
    try {
      if (main.method.validaToken(login)) {
        const token = main.method.obterValorStorage("token");
        const response = await axios.post(url, dados, {
          headers: {
            "Mime-Type": "multipart/form-data",
            "Authorization": token
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

  // método que limpa todo o localstorage e redireciona pro login
  logout: () => {
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

    container.innerHTML += msg;

    setTimeout(() => {
      document.querySelector(`#msg-${id}`).remove();
    }, tempo);
  },

}

export default main;