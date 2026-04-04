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
    main.method.exibirMenuUsuario();
    
    // Configura o evento de logout globalmente se o botão existir
    const logoutBtn = document.getElementById('logout');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        main.method.logout();
      });
    }
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
    
    // Redireciona para o index.html da raiz
    // Se estiver em uma subpasta (ex: src/pages/), volta um nível e vai para index.html
    // Se estiver na raiz, apenas recarrega ou vai para index.html
    if (window.location.pathname.includes('/src/pages/')) {
        window.location.href = "../../index.html";
    } else {
        window.location.href = "index.html";
    }
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

  // Exibe o menu do usuário logado e oculta o botão de login
  exibirMenuUsuario: () => {
    const profileInfo = document.getElementById('profileInfo');
    const loginBtn = document.getElementById('login');
    const userGroup = document.querySelector('.navigation__group');

    const token = main.method.obterValorStorage('token');
    const nome = main.method.obterValorStorage('nome');
    const email = main.method.obterValorStorage('email');

    // Função para limpar dados do localStorage
    const limparDados = (dados) => {
        if (!dados) return null;
        return dados.toString()
            .replace(/^["']|["']$/g, '')
            .replace(/["']/g, '')
            .trim();
    };

    if (token && (nome || email)) {
        // Se estiver logado, oculta o botão de login e mostra o grupo do usuário
        if (loginBtn) loginBtn.classList.add('d-none');
        if (userGroup) userGroup.classList.remove('d-none');

        if (profileInfo) {
            profileInfo.innerHTML = `
                <h5>${limparDados(nome) || 'Usuário'}</h5>
                <p>${limparDados(email) || ''}</p>
            `;
        }
    } else {
        // Se não estiver logado, faz o contrário
        if (loginBtn) loginBtn.classList.remove('d-none');
        if (userGroup) userGroup.classList.add('d-none');
    }
  },

}

export default main;