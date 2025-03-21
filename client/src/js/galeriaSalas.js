import main from "./main";

document.addEventListener("DOMContentLoaded", function (event) {
  main.event.init();
  galerias.event.init();

  document.getElementById('logout').addEventListener('click', () => {
    galerias.method.sair();
  })
})

let galerias = {};

// eventos de inicialização
galerias.event = {

  init: () => {
    galerias.method.tokenStorage();
    galerias.method.buscarSalas();
  },
}

// métodos
galerias.method = {

  sair: () => {
    main.method.removerSessao("token");
    main.method.removerSessao("Nome");
    main.method.removerSessao("Email");

    main.method.logout();
  },

  tokenStorage: () => {
    main.method.obterValorStorage("token");
  },

  buscarSalas: () => {
    main.method.get(
      "/salas",
      (response) => {
        const cards = document.getElementById('card')
        if (response != null) {
          cards.innerHTML = '';
          response.map((dados) => {
            const cartao =`
                <div class="col-6">
                  <div class="card h-100 shadow ${dados.id_sala_pk}">
                      <img src="${dados.foto}" class="card-img-top" alt="...">
                          <div class="card-body">
                            <p class="h5 card-title text-start">${dados.tipo_sala}</p>
                            <p class="card-text text-description text-start py-3">${dados.descricao_sala}</p>
                          </div>
                        <div class="card-footer text-end d-flex justify-content-between py-3>
                            <small class="text-muted">Capaciade para ${dados.capac_pessoas}</small>
                            <small class="text-muted">R$ ${dados.preco_base}</small>
                        </div>
                    </div>
                  </div>`
          cards.innerHTML += cartao
          })
        }
      },
      (error) => {
        console.error(error);
      }
    )

  },
}

export default galerias;