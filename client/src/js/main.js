import axios from 'axios';

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
    url = "http://localhost:8000/api";
    try {
      // verifica se o token é válido, se for váçido faz a chamad
      if (main.method.validaToken(login)) {
        const token = main.method.obterValorStorage("token");
        const response = await axios.get(url, {
          headers: { // cabeçalho da requisição
            "Content-Type": "application/json;charset=utf-8",
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
  
  // centraliza as chamadas de POST
  post: async (url, dados, callbackSuccess, callbackError, login = false) => {
    url = "http://localhost:8000/api";
    try {
      // if (main.method.validaToken(login)) {
      //   const token = main.method.obterValorStorage("token");
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
        app.method.logout();
      }
      callbackError(error);
    }
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


  // get: (url, callbackSuccess, callbackError, login = false) => {
  //   try {
  //     if (main.method.validaToken(login)) {
  //       let xhr = new XMLHttpRequest();
  //       //abre a conexão passando o verbo GET e a url da requisição
  //       xhr.open("GET", url);
  //       // seta o cabeçalho da requisição - tipo de conteúdo e token
  //       xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
  //       // seta o token no cabeçalho da requisição - autorização
  //       xhr.setRequestHeader(
  //         "Authorization",
  //         main.method.obterValorStorage("token")
  //       );

  //       // função que é chamda quando a requisição é finalizada - readyState = 4
  //       xhr.onreadystatechange = function () {
  //         if (this.readyState == 4) {
  //           if (this.status == 200) {
  //             // se o retorno for 200, chama o callback de sucesso
  //             return callbackSuccess(JSON.parse(xhr.responseText));
  //           } else {
  //             // se o retorno for não autorizado, redireciona o usuário para o login
  //             if (xhr.status == 401) {
  //               main.method.logout();
  //             }

  //             return callbackError(xhr.responseText);
  //           }
  //         }
  //       };
  //       // envia a requisição
  //       xhr.send();
  //     }
  //   } catch (error) {
  //     return callbackError(error);
  //   }
  // },

  // centraliza as chamadas de POST
  // post: (url, dados, callbackSuccess, callbackError, login = false) => {
  //   try {
  //     if (main.method.validaToken(login)) {
  //       let xhr = new XMLHttpRequest();
  //       xhr.open("POST", url);
  //       xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
  //       xhr.setRequestHeader(
  //         "Authorization",
  //         main.method.obterValorStorage("token")
  //       );

  //       xhr.onreadystatechange = function () {
  //         if (this.readyState == 4) {
  //           if (this.status == 200) {
  //             return callbackSuccess(JSON.parse(xhr.responseText));
  //           } else {
  //             // se o retorno for não autorizado, redireciona o usuário para o login
  //             if (xhr.status == 401) {
  //               main.method.logout();
  //             }

  //             return callbackError(xhr.responseText);
  //           }
  //         }
  //       };
  //       // envia os dados pra servidor
  //       xhr.send(dados);
  //     }
  //   } catch (error) {
  //     return callbackError(error);
  //   }
  // },

  // centraliza as chamadas de upload
  // upload: (url, dados, callbackSuccess, callbackError, login = false) => {
  //   try {
  //     if (main.method.validaToken(login)) {
  //       let xhr = new XMLHttpRequest();
  //       xhr.open("POST", url);
  //       xhr.setRequestHeader("Mime-Type", "multipart/form-data");
  //       xhr.setRequestHeader(
  //         "Authorization",
  //         main.method.obterValorStorage("token")
  //       );

  //       xhr.onreadystatechange = function () {
  //         if (this.readyState == 4) {
  //           if (this.status == 200) {
  //             return callbackSuccess(JSON.parse(xhr.responseText));
  //           } else {
  //             // se o retorno for não autorizado, redireciona o usuário para o login
  //             if (xhr.status == 401) {
  //               main.method.logout();
  //             }

  //             return callbackError(xhr.responseText);
  //           }
  //         }
  //       };
  //       xhr.send(dados);
  //     }
  //   } catch (error) {
  //     return callbackError(error);
  //   }
  // },

  // método para validar se o token existe (local). É chamado em todas as requisições
  
  validaToken: (login = false) => {

    // verifica se existe o token na sessão
    let tokenAtual = main.method.obterValorStorage("token");

    // validação se o token não existe
    if (
      (tokenAtual == undefined ||
        tokenAtual == null ||
        tokenAtual == "" ||
        tokenAtual == "null") &&
      !login
    ) {
      window.location.href = "/login.html";
      return false;
    }
    return true;
  },

  api_: async () => {
    console.log('iniciou')

    const formReserva = document.getElementById('form-reserva');
    const btnReserva = document.getElementById('btn-reserva');
    const reservas = document.getElementById('reservas');

    const baseURL = 'http://localhost:8000/api';
    const tabela = document.querySelector("#tabela-reservas");

    try {
      const response = await axios.get(`${baseURL}/login`);
      let usuario = response.data;

      console.log(usuario);

      usuario.forEach(cliente => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <p>${cliente.id}</p>
          <p>${cliente.nome}</p>
          <p>${cliente.email}</p>
          <p>${cliente.senha}</p>
        `;
        console.log(tr);
      });
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
    }
  },

  login: () => {
    console.log('Chamei login do MAIN')
  },

  // grava valores no localstorage
  gravarValorStorage: (valor, local) => {
    localStorage[local] = valor;
  },

  // obtem um valor do localstorage
  obterValorStorage: (local) => {
    return localStorage[local];
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
  mensagem: (texto, cor = "red", tempo = 3500) => {
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