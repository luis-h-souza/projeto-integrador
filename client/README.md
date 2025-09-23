# LocalCo - Frontend

Este é o frontend da aplicação LocalCo, um sistema de coworking desenvolvido com tecnologias modernas.

## 🚀 Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Estilização com variáveis CSS customizadas
- **JavaScript (ES6+)** - Lógica da aplicação
- **Bootstrap 5.3.2** - Framework CSS para responsividade
- **Vite** - Build tool e servidor de desenvolvimento
- **Axios** - Cliente HTTP para comunicação com a API

## 📁 Estrutura do Projeto

```
client/
├── src/
│   ├── assets/          # Imagens, ícones e recursos estáticos
│   ├── css/             # Arquivos de estilo
│   │   ├── style.css    # Estilos principais
│   │   └── dropdown.css # Estilos do dropdown de perfil
│   ├── js/              # Arquivos JavaScript
│   │   ├── main.js      # Utilitários e funções principais
│   │   ├── login.js     # Lógica de autenticação
│   │   ├── galeriaSalas.js # Galeria de salas
│   │   └── agendamento.js  # Página de agendamento
│   └── pages/           # Páginas HTML
│       ├── index.html
│       ├── galeria-salas.html
│       ├── agendamento.html
│       └── ...
├── package.json
├── vite.config.js
└── README.md
```

## 🎨 Design System

### Cores Principais
- **Primary**: `#fc6648` (Laranja)
- **Gradient**: `linear-gradient(to bottom, #d94c30, #fc8971)`
- **Background**: `#f4f4f4`
- **Text**: `#393e45`

### Tipografia
- **Primary Font**: Poppins (400, 600, 700)
- **Secondary Font**: Questrial (300, 400)

## 🛠️ Instalação e Execução

### Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou yarn

### Instalação
```bash
# Instalar dependências
npm install
```

### Execução
```bash
# Iniciar servidor de desenvolvimento
npm run dev
```

O servidor será iniciado em `http://localhost:5173`

### Build para Produção
```bash
# Gerar build de produção
npm run build
```

## 🔧 Funcionalidades

### Autenticação
- Login de usuários
- Gerenciamento de sessão com localStorage
- Dropdown de perfil com informações do usuário

### Galeria de Salas
- Listagem de salas disponíveis
- Cards interativos com informações das salas
- Navegação para página de agendamento

### Agendamento
- Visualização detalhada da sala selecionada
- Formulário de agendamento com validação
- Interface responsiva e intuitiva

## 🌐 Integração com API

O frontend se comunica com a API Laravel através de:
- **Base URL**: `http://localhost:8000/api`
- **Endpoints principais**:
  - `GET /salas` - Listar salas
  - `GET /salas/{id}` - Detalhes da sala
  - `POST /login` - Autenticação
  - `POST /register` - Registro de usuário

## 📱 Responsividade

O projeto é totalmente responsivo, adaptando-se a:
- **Desktop**: Layout completo com sidebar
- **Tablet**: Layout intermediário
- **Mobile**: Layout otimizado para telas pequenas

## 🎯 Páginas Principais

1. **Home** (`index.html`) - Página inicial com apresentação
2. **Galeria de Salas** (`galeria-salas.html`) - Lista de salas disponíveis
3. **Agendamento** (`agendamento.html`) - Formulário de agendamento
4. **Contato** (`contato.html`) - Informações de contato
5. **Planos** (`planos.html`) - Planos de assinatura

## 🔍 Desenvolvimento

### Estrutura de Arquivos JavaScript
- **main.js**: Funções utilitárias e comunicação com API
- **login.js**: Gerenciamento de autenticação
- **galeriaSalas.js**: Lógica da galeria de salas
- **agendamento.js**: Funcionalidades de agendamento

### Padrões de Código
- Uso de módulos ES6
- Funções assíncronas para requisições HTTP
- Manipulação do DOM com JavaScript vanilla
- Validação de formulários com Bootstrap

## 🚀 Deploy

Para fazer deploy do frontend:

1. Execute o build de produção:
```bash
npm run build
```

2. Os arquivos estáticos serão gerados na pasta `dist/`

3. Faça upload dos arquivos para seu servidor web

## 📞 Suporte

Para dúvidas ou problemas relacionados ao frontend, consulte a documentação da API ou entre em contato com a equipe de desenvolvimento.
