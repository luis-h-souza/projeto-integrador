import main from "./main";

document.addEventListener("DOMContentLoaded", function (event) {
  main.event.init();
  agendamento.event.init();

  document.getElementById('logout').addEventListener('click', () => {
    main.method.logout();
  })
})

let agendamento = {};

// eventos de inicialização
agendamento.event = {
  init: () => {
    // main.method.validaToken(); // Temporariamente desabilitado para teste
    agendamento.method.dropdowm();
    agendamento.method.carregarDadosSala();
  },
}

// métodos
agendamento.method = {

  // Função para limpar dados do localStorage
  limparDados: (dados) => {
    if (!dados) return null;
    // Remove aspas duplas, simples e espaços extras
    return dados.toString()
      .replace(/^["']|["']$/g, '') // Remove aspas do início e fim
      .replace(/["']/g, '') // Remove aspas do meio
      .trim(); // Remove espaços extras
  },

  // Carrega os dados da sala selecionada
  carregarDadosSala: () => {
    const idSala = main.method.obterValorStorage('salaSelecionada');
    
    if (!idSala) {
      agendamento.method.mostrarSalaPadrao();
      return;
    }

    // Busca os dados da sala específica
    main.method.get(
      `/salas/${idSala}`,
      (response) => {
        agendamento.method.exibirDadosSala(response);
      },
      (error) => {
        console.error('Erro ao carregar dados da sala:', error);
        agendamento.method.mostrarSalaPadrao();
      }
    );
  },

  // Exibe os dados da sala na página
  exibirDadosSala: (dadosSala) => {
    // Atualiza a imagem da sala
    const imgSala = document.querySelector('.container-img img');
    if (imgSala && dadosSala.foto) {
      imgSala.src = dadosSala.foto;
      imgSala.alt = dadosSala.tipo_sala;
    }

    // Atualiza o título da sala
    const tituloSala = document.getElementById('tituloSala');
    if (tituloSala) {
      tituloSala.textContent = dadosSala.tipo_sala;
    }

    // Atualiza a descrição da sala
    const descricaoSala = document.getElementById('descricaoSala');
    if (descricaoSala) {
      descricaoSala.textContent = dadosSala.descricao_sala;
    }

    // Atualiza a capacidade da sala
    const capacidadeSala = document.getElementById('capacidadeSala');
    if (capacidadeSala) {
      capacidadeSala.textContent = dadosSala.capac_pessoas;
    }

    // Atualiza o preço da sala
    const precoSala = document.getElementById('precoSala');
    if (precoSala) {
      precoSala.textContent = `R$ ${dadosSala.preco_base}`;
    }

    // Salva os dados da sala para uso posterior
    main.method.gravarValorStorage('dadosSalaAtual', JSON.stringify(dadosSala));
  },

  // Mostra dados padrão quando não há sala selecionada
  mostrarSalaPadrao: () => {
    // Mantém os dados padrão que já estão no HTML
  },

  // Função do dropdown (reutilizada da galeria)
  dropdowm: () => {
    const profileInfo = document.getElementById('profileInfo');
    const storageEmail = main.method.obterValorStorage('email');
    const storageNome = main.method.obterValorStorage('nome');
    
    // Limpa os dados usando a função específica
    const nome = agendamento.method.limparDados(storageNome) || 'Usuário';
    const email = agendamento.method.limparDados(storageEmail) || 'email@exemplo.com';
    
    profileInfo.innerHTML = `
      <h2 id="profile__name" class="profile__name">${nome}</h2>
      <p id="profile__email" class="profile__email">${email}</p>
    `
  },
}

export default agendamento;
