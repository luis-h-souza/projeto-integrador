# Contrato da API (uso pelo frontend)

Referência: ficheiros em `client/src/js/`. Base URL: variável de ambiente `VITE_API_URL` no cliente (ver `client/.env.example`; por omissão `http://localhost:8000/api`).

## Rotas públicas (sem Bearer)

| Método | Caminho | Controlador | Uso no cliente |
|--------|---------|-------------|----------------|
| POST | `/register` | UsuarioController@register | cadastrar.js |
| POST | `/login` | UsuarioController@login | login.js, main.js |
| GET | `/salas` | SalaController@index | galeriaSalas.js |
| GET | `/salas/{id}` | SalaController@show | agendamento.js |
| GET | `/salas/{id}/calendario` | PedidoController@calendarioDisponibilidade | agendamento.js |

## Rotas autenticadas (header `Authorization: Bearer {api_token}`)

| Método | Caminho | Controlador | Uso no cliente |
|--------|---------|-------------|----------------|
| POST | `/logout` | UsuarioController@logout | main.js (logout) |
| POST | `/pedido` | PedidoController@store | agendamento.js |
| DELETE | `/pedido/{id}` | PedidoController@destroy | meus-agendamentos.js |
| GET | `/meus-agendamentos` | PedidoController@meusAgendamentos | meus-agendamentos.js |

## Não expostas ao cliente web atual

- CRUD de `cliente`, `psfisica`, `juridico`, mutação de `salas` — removidas da API pública (ver `routes/api.php`).
- `GET /user` (Sanctum) — removido; autenticação é por `api_token` na tabela `usuario`.

## Autenticação

Modelo único: coluna `usuario.api_token` (guard `api` em `config/auth.php`), sem tokens Sanctum para o fluxo atual.
