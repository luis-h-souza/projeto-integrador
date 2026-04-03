# LocalCo - Backend API

Este é o backend da aplicação LocalCo, uma API REST desenvolvida com Laravel para gerenciar o sistema de coworking.

## 🎯 Funcionalidades Principais

- ✅ **Sistema de Agendamento Completo** - Criação, edição e cancelamento de agendamentos
- ✅ **Cálculo Automático de Preços** - Baseado em dias × preço base da sala
- ✅ **Verificação de Disponibilidade** - Impede conflitos de agendamento
- ✅ **Calendário Visual** - 60 dias de disponibilidade por sala
- ✅ **Email de Confirmação** - Envio automático após agendamento
- ✅ **Gestão de Agendamentos** - Listagem e filtros para usuários
- ✅ **Autenticação por Token** - Sistema seguro de autenticação
- ✅ **Validações de Negócio** - Regras completas de validação

## 🚀 Tecnologias Utilizadas

- **Laravel 8** - Framework PHP
- **PHP 8.2+** - Linguagem de programação
- **MySQL** - Banco de dados
- **Laravel Sanctum** - Autenticação API
- **Eloquent ORM** - Mapeamento objeto-relacional
- **Composer** - Gerenciador de dependências PHP
- **Carbon** - Manipulação de datas
- **Laravel Mail** - Sistema de envio de emails

## 📁 Estrutura do Projeto

```
api_localco/
├── app/
│   ├── Http/
│   │   ├── Controllers/     # Controladores da API
│   │   │   ├── SalaController.php
│   │   │   ├── UsuarioController.php
│   │   │   ├── PedidoController.php
│   │   │   ├── ClienteController.php
│   │   │   ├── PsFisicaController.php
│   │   │   └── PsJuridicaController.php
│   │   └── Middleware/      # Middlewares
│   ├── Mail/                # Classes de Email
│   │   └── AgendamentoConfirmado.php
│   └── Models/              # Modelos Eloquent
│       ├── Salas.php
│       ├── Usuario.php
│       ├── Pedido.php
│       ├── Cliente.php
│       ├── PsFisica.php
│       └── PsJuridica.php
├── database/
│   ├── migrations/          # Migrações do banco
│   └── seeders/            # Seeders para dados de teste
│       ├── SalasSeeder.php
│       └── UsuarioSeeder.php
├── resources/
│   └── views/
│       └── emails/          # Templates de email
│           └── agendamento-confirmado.blade.php
├── routes/
│   └── api.php             # Rotas da API
├── config/                 # Configurações
├── .env                    # Variáveis de ambiente
└── composer.json
```

## Contrato HTTP com o frontend

Lista de endpoints e autenticação: [`docs/API_CONTRACT.md`](docs/API_CONTRACT.md).

## 🛠️ Instalação e Configuração

### Pré-requisitos
- PHP 8.2 ou superior
- Composer
- MySQL 5.7 ou superior
- Extensões PHP: BCMath, Ctype, Fileinfo, JSON, Mbstring, OpenSSL, PDO, Tokenizer, XML

### Instalação

1. **Instalar dependências**:
```bash
composer install
```

2. **Configurar ambiente**:
```bash
# Copiar arquivo de configuração
cp .env.example .env

# Gerar chave da aplicação
php artisan key:generate
```

3. **Configurar banco de dados**:
Edite o arquivo `.env` com suas credenciais:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=localco
DB_USERNAME=seu_usuario
DB_PASSWORD=sua_senha
```

4. **Executar migrações** (cria tabelas de domínio: `pessoa_fisica`, `pessoa_juridica`, `usuario`, `salas`, `cliente`, `pedido`, além das tabelas Laravel padrão em `database/migrations`):
```bash
php artisan migrate
```

5. **Popular banco com dados de teste**:
```bash
php artisan db:seed --class=SalasSeeder
php artisan db:seed --class=UsuarioSeeder
```

### Execução
```bash
# Iniciar servidor de desenvolvimento
php artisan serve
```

A API estará disponível em `http://localhost:8000`

## 📊 Estrutura do Banco de Dados

### Tabela `salas`
- `id_sala_pk` (PK) - ID único da sala
- `tipo_sala` - Tipo da sala (ex: "Sala Compartilhada")
- `descricao_sala` - Descrição detalhada
- `capac_pessoas` - Capacidade máxima
- `preco_base` - Preço base por dia
- `foto` - URL da foto da sala

### Tabela `usuario`
- `id` (PK) - ID único do usuário
- `nome` - Nome completo
- `email` - Email único
- `senha` - Senha criptografada
- `api_token` - Token de autenticação
- `created_at` - Data de criação
- `updated_at` - Data de atualização

### Tabela `cliente`
- `id_cliente_pk` (PK) - ID único do cliente
- `id_usuario_fk` (FK) - Referência ao usuário
- `telefone` - Telefone de contato
- `celular` - Celular de contato
- `rua`, `bairro`, `numero`, `complemento` - Endereço
- `cidade`, `estado`, `pais` - Localização
- `id_fisico_fk` (FK) - Referência a pessoa física (opcional)
- `id_juridico_fk` (FK) - Referência a pessoa jurídica (opcional)

### Tabela `pessoa_fisica`
- `id_fisico_pk` (PK) - ID único
- `cpf` - CPF da pessoa física

### Tabela `pessoa_juridica`
- `id_juridico_pk` (PK) - ID único
- `cnpj` - CNPJ da pessoa jurídica

### Tabela `pedido`
- `id_pedido` (PK) - ID único do agendamento
- `id_sala_fk` (FK) - Referência à sala
- `id_cliente_fk` (FK) - Referência ao cliente
- `forma_pg` - Forma de pagamento
- `data_entrada` - Data de início do agendamento
- `data_saida` - Data de término do agendamento

## 🔌 Endpoints da API

### Autenticação
```
POST /api/register       # Registrar novo usuário
POST /api/login          # Login e obter token
POST /api/logout         # Logout (protegido)
```

### Salas
```
GET  /api/salas                          # Listar todas as salas (público)
GET  /api/salas/{id}                     # Detalhes de uma sala específica (público)
POST /api/salas/{id}/verificar-disponibilidade  # Verificar disponibilidade (público)
GET  /api/salas/{id}/calendario          # Calendário de disponibilidade (público)
POST /api/salas                          # Criar nova sala (protegido)
PUT  /api/salas/{id}                     # Atualizar sala (protegido)
DELETE /api/salas/{id}                   # Deletar sala (protegido)
```

### Agendamentos (Pedidos)
```
GET    /api/pedido                       # Listar agendamentos (protegido - retorna apenas do usuário logado)
GET    /api/pedido/{id}                  # Detalhes de um agendamento (protegido)
POST   /api/pedido                       # Criar novo agendamento (protegido)
PUT    /api/pedido/{id}                  # Atualizar agendamento (protegido - apenas do próprio usuário)
DELETE /api/pedido/{id}                  # Cancelar agendamento (protegido - apenas do próprio usuário)
GET    /api/meus-agendamentos            # Listar agendamentos do usuário logado (protegido)
```

### Clientes e Pessoas
```
GET    /api/cliente                      # Listar clientes (protegido)
POST   /api/cliente                      # Criar cliente (protegido)
GET    /api/cliente/{id}                 # Detalhes do cliente (protegido)
PUT    /api/cliente/{id}                 # Atualizar cliente (protegido)
DELETE /api/cliente/{id}                 # Deletar cliente (protegido)

GET    /api/psfisica                     # Listar pessoas físicas (protegido)
POST   /api/psfisica                     # Criar pessoa física (protegido)
# ... (CRUD completo)

GET    /api/juridico                     # Listar pessoas jurídicas (protegido)
POST   /api/juridico                     # Criar pessoa jurídica (protegido)
# ... (CRUD completo)
```

### Exemplos de Requisições

#### Login
```bash
curl -X POST http://localhost:8000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"joao@teste.com","senha":"123456"}'
```

**Resposta:**
```json
{
  "token": "abc123...",
  "email": "joao@teste.com",
  "nome": "João Silva"
}
```

#### Listar Salas
```bash
curl -X GET http://localhost:8000/api/salas
```

#### Detalhes da Sala
```bash
curl -X GET http://localhost:8000/api/salas/1
```

#### Verificar Disponibilidade
```bash
curl -X POST http://localhost:8000/api/salas/1/verificar-disponibilidade \
  -H "Content-Type: application/json" \
  -d '{
    "data_entrada": "2024-12-15",
    "data_saida": "2024-12-20"
  }'
```

**Resposta:**
```json
{
  "disponivel": true,
  "mensagem": "A sala está disponível para este período.",
  "preco_total": 500.00,
  "dias": 5
}
```

#### Calendário de Disponibilidade
```bash
curl -X GET http://localhost:8000/api/salas/1/calendario
```

**Resposta:**
```json
{
  "sala": {
    "id": 1,
    "tipo": "Sala Compartilhada"
  },
  "calendario": [
    {
      "data": "2024-12-07",
      "disponivel": true,
      "dia_semana": "sábado"
    },
    ...
  ],
  "periodo": {
    "inicio": "2024-12-07",
    "fim": "2025-02-05"
  }
}
```

#### Criar Agendamento
```bash
curl -X POST http://localhost:8000/api/pedido \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {token}" \
  -d '{
    "id_sala_fk": 1,
    "forma_pg": "PIX",
    "data_entrada": "2024-12-15",
    "data_saida": "2024-12-20"
  }'
```

**Resposta:**
```json
{
  "message": "Agendamento realizado com sucesso!",
  "pedido": {
    "id_pedido": 1,
    "id_sala_fk": 1,
    "id_cliente_fk": 1,
    "forma_pg": "PIX",
    "data_entrada": "2024-12-15",
    "data_saida": "2024-12-20",
    "salas": {...},
    "cliente": {...}
  },
  "preco_total": 500.00,
  "dias_reservados": 5
}
```

#### Meus Agendamentos
```bash
curl -X GET http://localhost:8000/api/meus-agendamentos \
  -H "Authorization: Bearer {token}"
```

**Resposta:**
```json
{
  "agendamentos": [
    {
      "id_pedido": 1,
      "data_entrada": "2024-12-15",
      "data_saida": "2024-12-20",
      "preco_total": 500.00,
      "dias_reservados": 5,
      "status": "Agendado",
      "salas": {...},
      "cliente": {...}
    }
  ],
  "total": 1
}
```

## 🔐 Autenticação

A API utiliza autenticação via tokens (api_token no modelo Usuario):

1. **Login**: Retorna token de acesso
2. **Requisições autenticadas**: Incluir header `Authorization: Bearer {token}`
3. **Logout**: Invalida o token

### Exemplo de Uso
```javascript
// Login
const response = await fetch('http://localhost:8000/api/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'user@example.com', senha: 'password' })
});

const data = await response.json();
const token = data.token;

// Requisição autenticada
const agendamentos = await fetch('http://localhost:8000/api/meus-agendamentos', {
  headers: { 
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});
```

## 📡 Códigos de Resposta HTTP

- **200 OK** - Requisição bem-sucedida
- **201 Created** - Recurso criado com sucesso
- **204 No Content** - Sucesso sem conteúdo de retorno
- **401 Unauthorized** - Token inválido ou ausente
- **403 Forbidden** - Sem permissão para acessar o recurso
- **404 Not Found** - Recurso não encontrado
- **409 Conflict** - Conflito (ex: sala já reservada no período)
- **422 Unprocessable Entity** - Erro de validação
- **500 Internal Server Error** - Erro interno do servidor

## 🗃️ Seeders

### SalasSeeder
Popula a tabela `salas` com 4 salas de exemplo:
- Sala Compartilhada
- Sala Privada
- Sala de Reunião
- Sala de Eventos

### UsuarioSeeder
Cria usuários de teste:
- joao@teste.com / 123456
- maria@teste.com / 123456

## 🧪 Testes

```bash
# Executar testes
php artisan test

# Executar testes específicos
php artisan test --filter=SalaControllerTest
```

## 📝 Logs

Os logs da aplicação são salvos em:
- `storage/logs/laravel.log`

Para monitorar logs em tempo real:
```bash
tail -f storage/logs/laravel.log
```

## 🔧 Configurações Importantes

### CORS
Configurado em `config/cors.php` para permitir requisições do frontend.

### Sanctum
Configurado em `config/sanctum.php` para autenticação de API.

### Database
Configurações em `config/database.php`.

### Email
Configurado em `config/mail.php`. Para desenvolvimento, use o driver `log`:
```env
MAIL_MAILER=log
```

Para produção, configure SMTP:
```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=seu-email@gmail.com
MAIL_PASSWORD=sua-senha
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=noreply@localco.com
MAIL_FROM_NAME="LocalCo"
```

## ✨ Funcionalidades Implementadas

### Sistema de Agendamento
- ✅ **Criação de agendamentos** com validação de conflitos
- ✅ **Cálculo automático de preço** baseado em dias × preço base
- ✅ **Verificação de disponibilidade** em tempo real
- ✅ **Calendário visual** de disponibilidade (60 dias)
- ✅ **Validações de negócio**:
  - Impede agendamentos em períodos já ocupados
  - Valida que data de saída é posterior à entrada
  - Impede agendamentos em datas passadas
- ✅ **Autorização**: Usuários só podem editar/cancelar seus próprios agendamentos

### Sistema de Email
- ✅ **Email de confirmação** enviado automaticamente após agendamento
- ✅ Template HTML responsivo e profissional
- ✅ Inclui todas as informações do agendamento e preço total

### Gestão de Agendamentos
- ✅ **Listagem de agendamentos** do usuário logado
- ✅ **Status automático**: Agendado, Em andamento, Finalizado
- ✅ **Filtros por status** no frontend
- ✅ **Cancelamento de agendamentos** com validação de permissão

### Cálculo de Preços
- ✅ **Cálculo automático** baseado em:
  - Preço base da sala (por dia)
  - Número de dias do período
  - Fórmula: `preco_total = preco_base × dias`
- ✅ **Exibição em tempo real** no formulário de agendamento
- ✅ **Resumo detalhado** com período, dias e total

## 🚀 Deploy

### Produção
1. Configurar variáveis de ambiente
2. Executar migrações: `php artisan migrate --force`
3. Limpar cache: `php artisan config:cache`
4. Otimizar: `php artisan optimize`

### Docker (Opcional)
```bash
# Usando Laravel Sail
./vendor/bin/sail up -d
```

## 📊 Monitoramento

### Health Check
```bash
curl http://localhost:8000/api/health
```

### Métricas
- Logs de requisições
- Performance de queries
- Uso de memória

## 🛡️ Segurança

- Validação de dados de entrada
- Sanitização de inputs
- Rate limiting (configurável)
- CORS configurado
- Tokens de autenticação seguros
- Autorização baseada em tokens (usuários só acessam seus próprios dados)
- Validação de conflitos de agendamento
- Proteção contra agendamentos duplicados

## 🎯 Funcionalidades Principais

### 1. Sistema de Agendamento
- Criação de agendamentos com validação completa
- Verificação automática de conflitos de horário
- Cálculo automático de preços
- Status automático (Agendado, Em andamento, Finalizado)

### 2. Calendário de Disponibilidade
- Visualização de 60 dias de disponibilidade
- Endpoint público para consulta
- Integração com frontend para exibição visual

### 3. Gestão de Agendamentos
- Listagem de agendamentos do usuário
- Filtros por status
- Cancelamento de agendamentos
- Edição de agendamentos (com validação de conflitos)

### 4. Sistema de Email
- Envio automático de confirmação
- Template HTML responsivo
- Configurável para desenvolvimento e produção

### 5. Cálculo de Preços
- Cálculo automático baseado em dias
- Exibição em tempo real no frontend
- Validação de preços na API

## 🐛 Troubleshooting

### Erro ao enviar email
- Verifique as configurações de email no `.env`
- Em desenvolvimento, use `MAIL_MAILER=log` para salvar emails em logs
- Verifique os logs em `storage/logs/laravel.log`

### Erro de conflito de agendamento
- O sistema impede agendamentos em períodos já ocupados
- Verifique a disponibilidade antes de criar o agendamento
- Use o endpoint `/api/salas/{id}/verificar-disponibilidade`

### Erro de autenticação
- Verifique se o token está sendo enviado no header `Authorization: Bearer {token}`
- Tokens expiram ao fazer logout
- Faça login novamente para obter um novo token

### Erro ao calcular preço
- Verifique se a sala existe e tem `preco_base` definido
- Certifique-se de que as datas são válidas
- O cálculo considera: `preco_base × número_de_dias`

## 📞 Suporte

Para dúvidas ou problemas:
1. Verificar logs em `storage/logs/laravel.log`
2. Consultar documentação do Laravel
3. Verificar se todas as dependências estão instaladas: `composer install`
4. Verificar configurações no arquivo `.env`
5. Entrar em contato com a equipe de desenvolvimento

## 🎨 Frontend (Client)

O frontend está localizado em `../client/` e inclui:

### Páginas Implementadas
- **Galeria de Salas** (`galeria-salas.html`) - Lista todas as salas disponíveis
- **Agendamento** (`agendamento.html`) - Formulário de agendamento com:
  - Calendário visual de disponibilidade
  - Cálculo de preço em tempo real
  - Resumo do agendamento
  - Validações client-side
- **Meus Agendamentos** (`meus-agendamentos.html`) - Lista agendamentos do usuário:
  - Cards com informações completas
  - Filtros por status
  - Cancelamento de agendamentos
- **Login/Registro** - Autenticação de usuários

### Funcionalidades Frontend
- ✅ Integração completa com a API
- ✅ Cálculo de preço em tempo real
- ✅ Calendário visual de disponibilidade
- ✅ Validações de formulário
- ✅ Feedback visual (toasts)
- ✅ Gerenciamento de tokens de autenticação
- ✅ Navegação entre páginas

## 🔄 Versionamento

### v2.0.0 - Sistema de Agendamento Completo (Atual)
- ✅ Sistema completo de agendamento de salas
- ✅ Cálculo automático de preços
- ✅ Verificação de conflitos e disponibilidade
- ✅ Calendário visual de disponibilidade (60 dias)
- ✅ Envio de email de confirmação
- ✅ Gestão de agendamentos do usuário
- ✅ Validações de negócio e segurança
- ✅ Endpoints para clientes e pessoas (física/jurídica)
- ✅ Frontend completo com todas as funcionalidades
- ✅ Página "Meus Agendamentos"
- ✅ Integração frontend-backend completa

### v1.0.0 - Versão inicial
- Autenticação de usuários
- CRUD de salas
- API REST básica

## 📋 Validações e Regras de Negócio

### Agendamentos
1. **Conflitos de Data**: Sistema impede agendamentos em períodos já ocupados
2. **Validação de Datas**: Data de saída deve ser posterior à data de entrada
3. **Datas Passadas**: Não permite agendamentos em datas passadas (exceto hoje)
4. **Autorização**: Usuários só podem gerenciar seus próprios agendamentos
5. **Cálculo de Preço**: Automático baseado em dias × preço base da sala
6. **Cliente Automático**: O cliente é obtido automaticamente do token de autenticação
7. **Validação de Sala**: Verifica se a sala existe antes de criar agendamento

### Disponibilidade
- Verifica sobreposição de períodos
- Considera agendamentos existentes
- Retorna preço calculado junto com disponibilidade
- Calendário mostra 60 dias à frente

### Cálculo de Preços
- **Fórmula**: `preco_total = preco_base × número_de_dias`
- **Mínimo**: 1 dia (mesmo que entrada e saída sejam no mesmo dia)
- **Arredondamento**: 2 casas decimais
- **Atualização**: Recalcula automaticamente ao editar agendamento

## 📧 Sistema de Email

### Email de Confirmação
Enviado automaticamente após criar um agendamento com:
- Informações da sala (tipo, descrição, capacidade)
- Período de reserva (entrada e saída)
- Duração em dias
- Preço total calculado
- Número do agendamento
- Forma de pagamento
- Template HTML responsivo e profissional

### Configuração
**Desenvolvimento:**
```env
MAIL_MAILER=log
```
Emails são salvos em `storage/logs/laravel.log`

**Produção:**
```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=seu-email@gmail.com
MAIL_PASSWORD=sua-senha-app
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=noreply@localco.com
MAIL_FROM_NAME="LocalCo"
```

### Tratamento de Erros
- Se o envio de email falhar, o agendamento ainda é criado
- Erros são registrados em `storage/logs/laravel.log`
- Não bloqueia a criação do agendamento em caso de falha no email
