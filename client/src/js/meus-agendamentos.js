import main from "./main";
import { API_BASE_URL } from "./apiConfig.js";

document.addEventListener("DOMContentLoaded", function (event) {
    main.event.init();
    agendamentos.event.init();

    document.getElementById("logout").addEventListener("click", () => {
        main.method.logout();
    });
});

let agendamentos = {};
window.agendamentos = agendamentos;

// eventos de inicialização
agendamentos.event = {
    init: () => {
        agendamentos.method.dropdowm();
        agendamentos.method.carregarAgendamentos();

        // Adiciona listener ao filtro
        document
            .getElementById("filtroStatus")
            ?.addEventListener("change", () => {
                agendamentos.method.carregarAgendamentos();
            });
    },
};

// métodos
agendamentos.method = {
    // Função do dropdown
    dropdowm: () => {
        const profileInfo = document.getElementById("profileInfo");
        const storageEmail = main.method.obterValorStorage("email");
        const storageNome = main.method.obterValorStorage("nome");

        const nome = agendamentos.method.limparDados(storageNome) || "Usuário";
        const email =
            agendamentos.method.limparDados(storageEmail) ||
            "email@exemplo.com";

        profileInfo.innerHTML = `
    <h2 id="profile__name" class="profile__name">${nome}</h2>
    <p id="profile__email" class="profile__email">${email}</p>
    `;
    },

    // Função para limpar dados do localStorage
    limparDados: (dados) => {
        if (!dados) return null;
        return dados
            .toString()
            .replace(/^["']|["']$/g, "")
            .replace(/["']/g, "")
            .trim();
    },

    // Carrega os agendamentos do usuário
    carregarAgendamentos: () => {
        const token = main.method.obterValorStorage("token");
        if (!token) {
            main.method.mensagem(
                "Você precisa estar logado para ver seus agendamentos.",
                "red"
            );
            setTimeout(() => {
                window.location.href = "./login.html";
            }, 2000);
            return;
        }

        const listaAgendamentos = document.getElementById("listaAgendamentos");
        const semAgendamentos = document.getElementById("semAgendamentos");

        // Mostra loading
        listaAgendamentos.innerHTML = `
        <div class="col-12 text-center py-5">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Carregando...</span>
            </div>
        </div>
        `;
        semAgendamentos.classList.add("d-none");

        // Busca agendamentos
        fetch(`${API_BASE_URL}/meus-agendamentos`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    if (response.status === 401) {
                        throw new Error(
                            "Sessão expirada. Faça login novamente."
                        );
                    }
                    throw new Error("Erro ao carregar agendamentos.");
                }
                return response.json();
            })
            .then((data) => {
                const agendamentosList = data.agendamentos || [];
                const filtroStatus =
                    document.getElementById("filtroStatus")?.value || "";

                // Filtra por status se houver filtro
                let agendamentosFiltrados = agendamentosList;
                if (filtroStatus) {
                    agendamentosFiltrados = agendamentosList.filter(
                        (a) => a.status === filtroStatus
                    );
                }

                if (agendamentosFiltrados.length === 0) {
                    listaAgendamentos.innerHTML = "";
                    semAgendamentos.classList.remove("d-none");
                    return;
                }

                semAgendamentos.classList.add("d-none");
                agendamentos.method.exibirAgendamentos(agendamentosFiltrados);
            })
            .catch((error) => {
                console.error("Erro:", error);
                listaAgendamentos.innerHTML = `
        <div class="col-12">
            <div class="alert alert-danger">
                <i class="bi bi-exclamation-triangle me-2"></i>
                ${error.message}
            </div>
        </div>
        </div>
    `;

                if (error.message.includes("Sessão expirada")) {
                    setTimeout(() => {
                        window.location.href = "./login.html";
                    }, 2000);
                }
            });
    },

    // Exibe os agendamentos na página
    exibirAgendamentos: (agendamentosList) => {
        const listaAgendamentos = document.getElementById("listaAgendamentos");

        listaAgendamentos.innerHTML = agendamentosList
            .map((agendamento) => {
                const sala = agendamento.salas || {};
                const dataEntrada = new Date(agendamento.data_entrada);
                const dataSaida = new Date(agendamento.data_saida);

                // Formata datas
                const dataEntradaFormatada =
                    dataEntrada.toLocaleDateString("pt-BR");
                const dataSaidaFormatada =
                    dataSaida.toLocaleDateString("pt-BR");

                // Define cor do badge de status
                let badgeClass = "bg-secondary";
                if (agendamento.status === "Agendado")
                    badgeClass = "bg-primary";
                if (agendamento.status === "Em andamento")
                    badgeClass = "bg-warning";
                if (agendamento.status === "Finalizado")
                    badgeClass = "bg-success";

                // Formata preço
                const precoTotal = agendamento.preco_total || 0;
                const precoFormatado = `R$ ${precoTotal
                    .toFixed(2)
                    .replace(".", ",")}`;

                return `
        <div class="col-md-6 col-lg-4 mb-4">
            <div class="card h-100 shadow-sm">
            ${
                sala.foto
                    ? `
                <img src="${sala.foto}" class="card-img-top" alt="${sala.tipo_sala}" style="height: 200px; object-fit: cover;">
            `
                    : ""
            }
            <div class="card-body">
                <h5 class="card-title">${sala.tipo_sala || "Sala"}</h5>
                <p class="card-text text-muted small">${
                    sala.descricao_sala || ""
                }</p>

                <div class="mb-3">
                    <span class="badge ${badgeClass}">${agendamento.status}</span>
                </div>

                <div class="mb-2">
                    <i class="bi bi-calendar-event me-2"></i>
                    <strong>Entrada:</strong> ${dataEntradaFormatada}
                </div>
                <div class="mb-2">
                    <i class="bi bi-calendar-check me-2"></i>
                    <strong>Saída:</strong> ${dataSaidaFormatada}
                </div>
                <div class="mb-2">
                    <i class="bi bi-clock me-2"></i>
                    <strong>Duração:</strong> ${agendamento.dias_reservados || 1} ${
                        agendamento.dias_reservados === 1 ? "dia" : "dias"
                    }
                </div>
                <div class="mb-2">
                    <i class="bi bi-currency-dollar me-2"></i>
                    <strong>Forma de Pagamento:</strong> ${
                        agendamento.forma_pg || "Não informado"
                    }
                </div>
                <hr>
                <div class="d-flex justify-content-between align-items-center">
                    <span class="fw-bold fs-5">Total:</span>
                    <span class="fw-bold fs-4 text-success">${precoFormatado}</span>
                </div>
                </div>
                <div class="card-footer bg-transparent">
                ${
                    agendamento.status !== "Finalizado"
                        ? `
                    <button class="btn btn-sm btn-danger w-100" onclick="agendamentos.method.cancelarAgendamento(${agendamento.id_pedido})">
                    <i class="bi bi-x-circle me-2"></i>Cancelar
                    </button>
                `
                        : ""
                }
                </div>
            </div>
            </div>
        `;
            })
            .join("");
    },

    // Cancela um agendamento
    cancelarAgendamento: (idPedido) => {
        if (!confirm("Tem certeza que deseja cancelar este agendamento?")) {
            return;
        }

        const token = main.method.obterValorStorage("token");
        if (!token) {
            main.method.mensagem("Você precisa estar logado.", "red");
            return;
        }

        fetch(`${API_BASE_URL}/pedido/${idPedido}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((data) => {
                        throw new Error(
                            data.error || "Erro ao cancelar agendamento."
                        );
                    });
                }
                return response.json();
            })
            .then((data) => {
                main.method.mensagem(
                    data.message || "Agendamento cancelado com sucesso!",
                    "green"
                );
                agendamentos.method.carregarAgendamentos();
            })
            .catch((error) => {
                console.error("Erro:", error);
                main.method.mensagem(error.message, "red");
            });
    },
};

export default agendamentos;
