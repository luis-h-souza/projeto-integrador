import axios from 'axios';

document.addEventListener("DOMContentLoaded", function (event) {
  main.event.init();
})

let main = {};


main.event = {
  init: () => {
    AOS.init();
  }
}


main.method = {

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