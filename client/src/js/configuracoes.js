import main from "./main";
import { API_BASE_URL } from "./apiConfig.js";

const configuracoes = {
    event: {
        init: () => {
            configuracoes.method.carregarDadosPerfil();

            document.getElementById('formPerfil').addEventListener('submit', (e) => {
                e.preventDefault();
                configuracoes.method.salvarPerfil();
            });
        }
    },

    method: {
        carregarDadosPerfil: async () => {
            const token = main.method.obterValorStorage('token');

            if (!token) {
                window.location.href = './login.html';
                return;
            }

            try {
                const response = await fetch(`${API_BASE_URL}/perfil`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json'
                    }
                });

                if (response.status === 401) {
                    main.method.removerSessao('token');
                    window.location.href = './login.html';
                    return;
                }

                const data = await response.json();

                if (data.cliente) {
                    document.getElementById('nome').value = data.cliente.nome || '';
                    document.getElementById('email').value = data.cliente.email || '';
                    document.getElementById('telefone').value = data.cliente.telefone || '';
                    document.getElementById('celular').value = data.cliente.celular || '';
                    document.getElementById('rua').value = data.cliente.rua || '';
                    document.getElementById('numero').value = data.cliente.numero || '';
                    document.getElementById('bairro').value = data.cliente.bairro || '';
                    document.getElementById('cidade').value = data.cliente.cidade || '';
                    document.getElementById('estado').value = data.cliente.estado || '';
                    document.getElementById('pais').value = data.cliente.pais || 'Brasil';
                }
            } catch (error) {
                console.error("Erro ao carregar perfil:", error);
            }
        },

        salvarPerfil: async () => {
            const token = main.method.obterValorStorage('token');
            const form = document.getElementById('formPerfil');
            const formData = new FormData(form);

            try {
                const response = await fetch(`${API_BASE_URL}/perfil/update`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json'
                    },
                    body: formData
                });

                if (response.ok) {
                    main.method.mensagem("Perfil atualizado com sucesso!", "green");
                } else {
                    const data = await response.json();
                    main.method.mensagem(data.message || "Erro ao salvar perfil.");
                }
            } catch (error) {
                console.error("Erro ao salvar perfil:", error);
                main.method.mensagem("Erro de rede ao salvar perfil.");
            }
        }
    }
};

document.addEventListener("DOMContentLoaded", () => {
    configuracoes.event.init();
});

export default configuracoes;
