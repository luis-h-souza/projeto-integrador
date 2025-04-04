import main from "./main";

document.addEventListener("DOMContentLoaded", function (event) {
  main.event.init();
  galerias.event.init();

  document.getElementById('logout').addEventListener('click', () => {
    main.method.logout();
  })
})

console.log(main.method.obterValorStorage("token"))

let galerias = {};

// eventos de inicialização
galerias.event = {

  init: () => {
    main.method.validaToken();
    galerias.method.buscarSalas();
    galerias.method.dropdowm()
  },
}

// métodos
galerias.method = {

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
                            <a class='tipo_sala'><p class="h5 card-title text-start">${dados.tipo_sala}</p></a>
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

  dropdowm: () => {
    const profileInfo = document.getElementById('profileInfo');
    const storageEmail = main.method.obterValorStorage('email');
    const storageNome = main.method.obterValorStorage('nome');
    storageEmail.replace(/"/g,"")
    storageNome.replaceAll("\"", "")
    
    profileInfo.innerHTML = `
      <h2 id="profile__name" class="profile__name">${storageNome}</h2>
      <p id="profile__email" class="profile__email">${storageEmail}</p>
    `
  },
}

export default galerias;