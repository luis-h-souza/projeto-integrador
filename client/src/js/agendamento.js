import main from "./main";
import { API_BASE_URL } from "./apiConfig.js";

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
        agendamento.method.configurarFormulario();
        agendamento.method.carregarCalendario();
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

    // Configura o formulário de agendamento
    configurarFormulario: () => {
        const form = document.getElementById('formAgendamento');
        if (!form) return;

        // Adiciona listeners para os campos de data
        const dataEntrada = document.getElementById('dataEntradaImagem');
        const dataSaida = document.getElementById('dataSaidaImagem');

        if (dataEntrada && dataSaida) {
            dataEntrada.addEventListener('change', () => agendamento.method.calcularPreco());
            dataSaida.addEventListener('change', () => agendamento.method.calcularPreco());
        }

        // Adiciona listener para o submit do formulário
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (form.checkValidity()) {
                agendamento.method.submeterAgendamento();
            }
            form.classList.add('was-validated');
        });
    },

    // Submete o agendamento
    submeterAgendamento: () => {
        const idSala = main.method.obterValorStorage('salaSelecionada');
        const dataEntrada = document.getElementById('dataEntradaImagem')?.value;
        const dataSaida = document.getElementById('dataSaidaImagem')?.value;
        const horaEntrada = document.getElementById('horaEntrada')?.value;
        const horaSaida = document.getElementById('horaSaida')?.value;
        const formaPg = document.getElementById('formaPg')?.value;
        const observacoes = document.getElementById('observacoes')?.value || '';

        if (!idSala || !dataEntrada || !dataSaida || !horaEntrada || !horaSaida || !formaPg) {
            main.method.mensagem('Por favor, preencha todos os campos obrigatórios.', 'red');
            return;
        }

        const token = main.method.obterValorStorage('token');
        if (!token) {
            main.method.mensagem('Você precisa estar logado para fazer um agendamento.', 'red');
            setTimeout(() => {
                window.location.href = './login.html';
            }, 2000);
            return;
        }

        const dados = {
            id_sala_fk: idSala,
            data_entrada: `${dataEntrada} ${horaEntrada}`,
            data_saida: `${dataSaida} ${horaSaida}`,
            forma_pg: formaPg,
            observacoes: observacoes
        };

        agendamento.method.enviarAgendamento(
            dados,
            token,
            (response) => {
                main.method.mensagem('Agendamento realizado com sucesso!', 'green');
                setTimeout(() => {
                    window.location.href = './meus-agendamentos.html';
                }, 2000);
            },
            (error) => {
                let mensagemErro = 'Erro ao realizar agendamento. Tente novamente.';
                if (error.response && error.response.data && error.response.data.error) {
                    mensagemErro = error.response.data.error;
                } else if (error.response && error.response.status === 401) {
                    mensagemErro = 'Sessão expirada. Por favor, faça login novamente.';
                    setTimeout(() => {
                        window.location.href = './login.html';
                    }, 2000);
                } else if (error.response && error.response.status === 409) {
                    mensagemErro = error.response.data.error || 'A sala já está reservada para este período.';
                }
                main.method.mensagem(mensagemErro, 'red');
            }
        );
    },

    // Envia o agendamento para a API
    enviarAgendamento: async (dados, token, callbackSuccess, callbackError) => {
        const url = `${API_BASE_URL}/pedido`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(dados)
            });

            const data = await response.json();

            if (!response.ok) {
                throw { response: { status: response.status, data: data } };
            }

            callbackSuccess(data);
        } catch (error) {
            callbackError(error);
        }
    },

    // Calcula o preço do agendamento
    calcularPreco: () => {
        const idSala = main.method.obterValorStorage('salaSelecionada');
        const dataEntrada = document.getElementById('dataEntradaImagem')?.value;
        const dataSaida = document.getElementById('dataSaidaImagem')?.value;
        const dadosSala = JSON.parse(main.method.obterValorStorage('dadosSalaAtual') || '{}');

        if (!idSala || !dataEntrada || !dataSaida || !dadosSala.preco_base) {
            agendamento.method.atualizarResumo('-', '-', '-', 'R$ 0,00');
            return;
        }

        // Valida datas
        const entrada = new Date(dataEntrada);
        const saida = new Date(dataSaida);

        if (saida <= entrada) {
            agendamento.method.atualizarResumo('-', '-', '-', 'R$ 0,00');
            return;
        }

        // Calcula dias
        const dias = Math.ceil((saida - entrada) / (1000 * 60 * 60 * 24)) || 1;

        // Calcula preço total
        const precoBase = parseFloat(dadosSala.preco_base);
        const precoTotal = precoBase * dias;

        // Formata datas
        const dataEntradaFormatada = entrada.toLocaleDateString('pt-BR');
        const dataSaidaFormatada = saida.toLocaleDateString('pt-BR');

        // Atualiza o resumo
        agendamento.method.atualizarResumo(
            `${dataEntradaFormatada} a ${dataSaidaFormatada}`,
            `${dias} ${dias === 1 ? 'dia' : 'dias'}`,
            `R$ ${precoBase.toFixed(2).replace('.', ',')}`,
            `R$ ${precoTotal.toFixed(2).replace('.', ',')}`
        );
    },

    // Atualiza o resumo do agendamento
    atualizarResumo: (periodo, dias, precoDia, total) => {
        document.getElementById('resumoPeriodo').textContent = periodo;
        document.getElementById('resumoDias').textContent = dias;
        document.getElementById('resumoPrecoDia').textContent = precoDia;
        document.getElementById('resumoTotal').textContent = total;
    },

    // Carrega o calendário de disponibilidade
    carregarCalendario: () => {
        const idSala = main.method.obterValorStorage('salaSelecionada');
        if (!idSala) {
            return;
        }

        fetch(`${API_BASE_URL}/salas/${idSala}/calendario`)
            .then(response => response.json())
            .then(data => {
                agendamento.method.exibirCalendario(data.calendario || []);
            })
            .catch(error => {
                console.error('Erro ao carregar calendário:', error);
                document.getElementById('calendarioDisponibilidade').innerHTML =
                    '<div class="alert alert-warning">Não foi possível carregar o calendário de disponibilidade.</div>';
            });
    },

    // Exibe o calendário na página
    exibirCalendario: (calendario) => {
        const container = document.getElementById('calendarioDisponibilidade');
        if (!container) return;

        const hoje = new Date().toISOString().split('T')[0];

        // Agrupa por semanas
        const semanas = [];
        let semanaAtual = [];

        calendario.forEach((dia, index) => {
            semanaAtual.push(dia);

            // A cada 7 dias ou no final, cria uma nova semana
            if (semanaAtual.length === 7 || index === calendario.length - 1) {
                semanas.push([...semanaAtual]);
                semanaAtual = [];
            }
        });

        let html = '<div class="calendario-container">';

        // Cabeçalho dos dias da semana
        html += '<div class="calendario-header">';
        html += '<div class="calendario-dia-header">Dom</div>';
        html += '<div class="calendario-dia-header">Seg</div>';
        html += '<div class="calendario-dia-header">Ter</div>';
        html += '<div class="calendario-dia-header">Qua</div>';
        html += '<div class="calendario-dia-header">Qui</div>';
        html += '<div class="calendario-dia-header">Sex</div>';
        html += '<div class="calendario-dia-header">Sáb</div>';
        html += '</div>';

        // Dias do calendário
        semanas.forEach(semana => {
            html += '<div class="calendario-semana">';
            semana.forEach(dia => {
                const isHoje = dia.data === hoje;
                const classe = isHoje
                    ? 'calendario-dia hoje'
                    : dia.disponivel
                        ? 'calendario-dia disponivel'
                        : 'calendario-dia indisponivel';

                // FIX: Parse date string manually to avoid timezone issues
                // Split the date string (format: YYYY-MM-DD)
                const [ano, mes, diaNumero] = dia.data.split('-').map(Number);

                html += `<div class="${classe}" title="${dia.data} - ${dia.disponivel ? 'Disponível' : 'Indisponível'}">
          <div class="calendario-dia-numero">${diaNumero}</div>
        </div>`;
            });
            html += '</div>';
        });

        html += '</div>';
        container.innerHTML = html;
    },
}

export default agendamento;
