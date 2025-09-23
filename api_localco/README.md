# LocalCo - Backend API

Este é o backend da aplicação LocalCo, uma API REST desenvolvida com Laravel para gerenciar o sistema de coworking.

## 🚀 Tecnologias Utilizadas

- **Laravel 8** - Framework PHP
- **PHP 8.2+** - Linguagem de programação
- **MySQL** - Banco de dados
- **Laravel Sanctum** - Autenticação API
- **Eloquent ORM** - Mapeamento objeto-relacional
- **Composer** - Gerenciador de dependências PHP

## 📁 Estrutura do Projeto

```
api_localco/
├── app/
│   ├── Http/
│   │   ├── Controllers/     # Controladores da API
│   │   │   ├── SalaController.php
│   │   │   └── UsuarioController.php
│   │   └── Middleware/      # Middlewares
│   └── Models/              # Modelos Eloquent
│       ├── Salas.php
│       ├── Usuario.php
│       └── ...
├── database/
│   ├── migrations/          # Migrações do banco
│   └── seeders/            # Seeders para dados de teste
│       ├── SalasSeeder.php
│       └── UsuarioSeeder.php
├── routes/
│   └── api.php             # Rotas da API
├── config/                 # Configurações
├── .env                    # Variáveis de ambiente
└── composer.json
```

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

4. **Executar migrações**:
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
- `preco_base` - Preço base por período
- `foto` - URL da foto da sala

### Tabela `usuario`
- `id` (PK) - ID único do usuário
- `nome` - Nome completo
- `email` - Email único
- `senha` - Senha criptografada
- `created_at` - Data de criação
- `updated_at` - Data de atualização

## 🔌 Endpoints da API

### Autenticação
```
POST /api/register
POST /api/login
POST /api/logout
```

### Salas
```
GET /api/salas          # Listar todas as salas
GET /api/salas/{id}     # Detalhes de uma sala específica
POST /api/salas         # Criar nova sala (protegido)
PUT /api/salas/{id}     # Atualizar sala (protegido)
DELETE /api/salas/{id}  # Deletar sala (protegido)
```

### Exemplos de Requisições

#### Login
```bash
curl -X POST http://localhost:8000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"joao@teste.com","senha":"123456"}'
```

#### Listar Salas
```bash
curl -X GET http://localhost:8000/api/salas
```

#### Detalhes da Sala
```bash
curl -X GET http://localhost:8000/api/salas/1
```

## 🔐 Autenticação

A API utiliza Laravel Sanctum para autenticação via tokens:

1. **Login**: Retorna token de acesso
2. **Requisições autenticadas**: Incluir header `Authorization: Bearer {token}`
3. **Logout**: Invalida o token

### Exemplo de Uso
```javascript
// Login
const response = await fetch('/api/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'user@example.com', senha: 'password' })
});

const data = await response.json();
const token = data.token;

// Requisição autenticada
const salas = await fetch('/api/salas', {
  headers: { 'Authorization': `Bearer ${token}` }
});
```

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

## 📞 Suporte

Para dúvidas ou problemas:
1. Verificar logs em `storage/logs/`
2. Consultar documentação do Laravel
3. Entrar em contato com a equipe de desenvolvimento

## 🔄 Versionamento

- **v1.0.0** - Versão inicial com funcionalidades básicas
- Autenticação de usuários
- CRUD de salas
- API REST completa
