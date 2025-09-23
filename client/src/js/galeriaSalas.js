import main from "./main";

document.addEventListener("DOMContentLoaded", function (event) {
  main.event.init();
  galerias.event.init();

  document.getElementById('logout').addEventListener('click', () => {
    main.method.logout();
  })
})

// console.log(main.method.obterValorStorage("token"))

let galerias = {};

// eventos de inicialização
galerias.event = {

  init: () => {
    // main.method.validaToken(); // Temporariamente desabilitado para teste
    galerias.method.dropdowm()
    galerias.method.buscarSalas();
  },
}

// métodos
galerias.method = {

  // Função para limpar dados do localStorage
  limparDados: (dados) => {
    if (!dados) return null;
    // Remove aspas duplas, simples e espaços extras
    return dados.toString()
      .replace(/^["']|["']$/g, '') // Remove aspas do início e fim
      .replace(/["']/g, '') // Remove aspas do meio
      .trim(); // Remove espaços extras
  },

  // Função para navegar para a página de agendamento
  irParaAgendamento: (idSala) => {
    // Validação básica
    if (!idSala) {
      alert('Erro: ID da sala não encontrado');
      return;
    }
    
    try {
      // Salva o ID da sala no localStorage para usar na página de agendamento
      localStorage.setItem('salaSelecionada', idSala);
      
      // Navega para a página de agendamento
      window.location.href = './agendamento.html';
    } catch (error) {
      console.error('Erro ao navegar para agendamento:', error);
      alert('Erro ao navegar para a página de agendamento: ' + error.message);
    }
  },

  buscarSalas: () => {
    main.method.get(
      "/salas",
      (response) => {
        const cards = document.getElementById('card')
        if (response != null) {
          cards.innerHTML = '';
          response.map((dados) => {
            // Criar elementos dinamicamente
            const colDiv = document.createElement('div');
            colDiv.className = 'col-6';
            
            const cardDiv = document.createElement('div');
            cardDiv.className = `card h-100 shadow ${dados.id_sala_pk}`;
            
            const img = document.createElement('img');
            img.src = dados.foto;
            img.className = 'card-img-top';
            img.alt = '...';
            
            const cardBody = document.createElement('div');
            cardBody.className = 'card-body';
            
            const link = document.createElement('a');
            link.className = 'tipo_sala';
            link.href = '#';
            link.style.textDecoration = 'none';
            link.style.color = 'inherit';
            link.style.cursor = 'pointer';
            
            const title = document.createElement('p');
            title.className = 'h5 card-title text-start';
            title.textContent = dados.tipo_sala;
            
            const description = document.createElement('p');
            description.className = 'card-text text-description text-start py-3';
            description.textContent = dados.descricao_sala;
            
            const cardFooter = document.createElement('div');
            cardFooter.className = 'card-footer text-end d-flex justify-content-between py-3';
            
            const capacity = document.createElement('small');
            capacity.className = 'text-muted';
            capacity.textContent = `Capacidade para ${dados.capac_pessoas}`;
            
            const price = document.createElement('small');
            price.className = 'text-muted';
            price.textContent = `R$ ${dados.preco_base}`;
            
            // Adicionar event listeners
            link.addEventListener('click', (e) => {
              e.preventDefault();
              galerias.method.irParaAgendamento(dados.id_sala_pk);
            });
            
            link.addEventListener('mouseover', () => {
              link.style.color = '#007bff';
            });
            
            link.addEventListener('mouseout', () => {
              link.style.color = 'inherit';
            });
            
            // Montar a estrutura
            link.appendChild(title);
            cardBody.appendChild(link);
            cardBody.appendChild(description);
            
            cardFooter.appendChild(capacity);
            cardFooter.appendChild(price);
            
            cardDiv.appendChild(img);
            cardDiv.appendChild(cardBody);
            cardDiv.appendChild(cardFooter);
            
            colDiv.appendChild(cardDiv);
            cards.appendChild(colDiv);
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
    
    // Limpa os dados usando a função específica
    const nome = galerias.method.limparDados(storageNome) || 'Usuário';
    const email = galerias.method.limparDados(storageEmail) || 'email@exemplo.com';
    
    profileInfo.innerHTML = `
      <h2 id="profile__name" class="profile__name">${nome}</h2>
      <p id="profile__email" class="profile__email">${email}</p>
    `
  },
}

export default galerias;