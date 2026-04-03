import axios, { AxiosHeaders } from "axios";
import main from "./main";

let cadastrar = {};

// Evento para alternar entre CPF e CNPJ
document.querySelectorAll('input[name="tipo_pessoa"]').forEach(input => {
  input.addEventListener('change', function() {
    if (this.value === 'fisica') {
      document.getElementById('containerCPF').classList.remove('d-none');
      document.getElementById('containerCNPJ').classList.add('d-none');
      document.getElementById('criarCNPJ').value = '';
    } else {
      document.getElementById('containerCPF').classList.add('d-none');
      document.getElementById('containerCNPJ').classList.remove('d-none');
      document.getElementById('criarCPF').value = '';
    }
  });
});

// chamada para cadastra o usuário
document.getElementById('cadastrarLogin').addEventListener('click', function (e) {
  e.preventDefault();
  cadastrar.method.criarLogin();
})

cadastrar.method = {

  // método para criar usuário (via API)
  criarLogin: () => {

    const nome = document.getElementById('criarNome').value.trim();
    const email = document.getElementById('criarEmail').value.trim();
    const senha = document.getElementById('criarSenha').value.trim();
    
    const cpf = document.getElementById('criarCPF').value.trim();
    const cnpj = document.getElementById('criarCNPJ').value.trim();
    const telefone = document.getElementById('criarTelefone').value.trim();
    const celular = document.getElementById('criarCelular').value.trim();
    const rua = document.getElementById('criarRua').value.trim();
    const numero = document.getElementById('criarNumero').value.trim();
    const bairro = document.getElementById('criarBairro').value.trim();
    const complemento = document.getElementById('criarComplemento').value.trim();
    const cidade = document.getElementById('criarCidade').value.trim();
    const estado = document.getElementById('criarEstado').value.trim();
    const pais = document.getElementById('criarPais').value.trim();

    // valida se os campos básicos estão preenchidos
    if (nome.length == 0) {
      main.method.mensagem("Informe um nome, por favor.");
      document.querySelector("#criarNome").focus();
      return;
    }
    if (email.length == 0) {
      main.method.mensagem("Informe um e-mail, por favor.");
      document.querySelector("#criarEmail").focus();
      return;
    }
    if (senha.length == 0) {
      main.method.mensagem("Informe uma senha, por favor.");
      document.querySelector("#criarSenha").focus();
      return;
    }

    const payload = {
      nome,
      email,
      senha,
      cpf: cpf || null,
      cnpj: cnpj || null,
      telefone: telefone || null,
      celular: celular || null,
      rua: rua || null,
      numero: numero || null,
      bairro: bairro || null,
      complemento: complemento || null,
      cidade: cidade || null,
      estado: estado || null,
      pais: pais || "Brasil"
    };

    main.method.post_criar(
      "/register",
      payload,
      (response) => {
        console.log(response);

        // Auto-login se o token for retornado
        if (response.token) {
          main.method.gravarValorStorage('token', response.token);
          main.method.gravarValorStorage('nome', response.nome);
          main.method.gravarValorStorage('email', response.email);

          main.method.mensagem("Cadastro realizado com sucesso! Redirecionando...", "green");

          setTimeout(() => {
            window.location.href = './galeria-salas.html';
          }, 1000);
        } else {
          main.method.mensagem("Cadastro realizado! Faça login para continuar.", "green");
          setTimeout(() => {
            window.location.href = './login.html';
          }, 2000);
        }
      },
      (error) => {
        console.error(error);
        const msg = error.response?.data?.message || "Erro ao realizar cadastro.";
        main.method.mensagem(msg, "red");
      }
    )
    return;
  },

}

export default cadastrar;