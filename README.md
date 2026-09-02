# 📚 DonaTeca

Uma aplicação Full Stack para gerenciamento de uma coleção de livros.

O DonaTeca permite cadastrar, visualizar, editar, excluir e pesquisar livros, além de acompanhar o status de leitura de cada item da coleção.

O projeto foi desenvolvido como parte da minha jornada de aprendizado em desenvolvimento web, com o objetivo de praticar conceitos fundamentais de aplicações Full Stack, incluindo React, criação e consumo de APIs, operações CRUD e persistência de dados.

🚀 Acesse o projeto

🌐 Aplicação: https://dona-teca.vercel.app

🔗 Repositório: https://github.com/karen-riboli/DonaTeca

«⚠️ Este é um projeto de demonstração para portfólio. Os livros cadastrados ficam visíveis para todos os visitantes.»

---

✨ Funcionalidades

- 📚 Visualização dos livros cadastrados
- ➕ Cadastro de novos livros
- ✏️ Edição das informações de um livro
- 🗑️ Exclusão de livros com confirmação
- 🔖 Atualização do status de leitura
- 🔍 Busca por título ou autor
- 🔄 Atualização dinâmica da interface
- ⏳ Feedback durante operações assíncronas
- ⚠️ Tratamento de erros durante as operações
- 💾 Persistência dos dados em banco de dados

---

🛠️ Tecnologias utilizadas

Frontend

- React
- JavaScript
- JSX
- HTML
- CSS
- Vite

Backend

- Node.js
- Express

Banco de dados

- Supabase

Deploy

- Vercel — Frontend
- Render — Backend

---

🏗️ Arquitetura

A aplicação utiliza uma arquitetura cliente-servidor:

React
   │
   │ Requisições HTTP
   ▼
API REST
Node.js + Express
   │
   ▼
Supabase

O frontend é responsável pela interface e interação com o usuário, enquanto o backend gerencia as operações da API e a comunicação com o banco de dados.

---

📂 Estrutura do projeto

DonaTeca
│
├── server
│   ├── database
│   │   └── supabase.js
│   └── index.js
│
├── src
│   ├── components
│   │   ├── BookCard.jsx
│   │   ├── BookForm.jsx
│   │   ├── BookList.jsx
│   │   ├── EditBookForm.jsx
│   │   ├── NewBookForm.jsx
│   │   └── SearchBar.jsx
│   │
│   ├── styles
│   │   ├── App.css
│   │   ├── BookCard.css
│   │   ├── BookForm.css
│   │   ├── SearchBar.css
│   │   └── index.css
│   │
│   ├── api.js
│   ├── App.jsx
│   └── main.jsx
│
├── .env.example
├── package.json
└── vite.config.js

---

⚙️ Como executar o projeto localmente

Pré-requisitos

Antes de começar, você precisará ter instalado:

- Node.js
- npm

1. Clone o repositório

git clone https://github.com/karen-riboli/DonaTeca.git

2. Acesse a pasta do projeto

cd DonaTeca

3. Instale as dependências

npm install

4. Configure as variáveis de ambiente

Crie um arquivo ".env" utilizando o ".env.example" como referência:

SUPABASE_URL=
SUPABASE_KEY=
VITE_API_URL=

Preencha as variáveis com as informações do seu ambiente.

5. Execute o projeto

npm run dev

A aplicação será iniciada localmente.

---

🔌 API

A API possui os seguintes endpoints:

Método| Endpoint| Descrição
GET| "/api/books"| Retorna todos os livros
POST| "/api/books"| Cadastra um novo livro
PATCH| "/api/books/:id"| Atualiza um livro
DELETE| "/api/books/:id"| Remove um livro

---

🎯 Conceitos praticados

Durante o desenvolvimento do DonaTeca, pratiquei:

- Componentização com React
- Reutilização de componentes
- Gerenciamento de estado com Hooks
- Comunicação entre frontend e backend
- Consumo de API REST
- Operações CRUD
- Requisições HTTP
- Estados de carregamento
- Tratamento de erros
- Manipulação de formulários
- Persistência de dados
- Variáveis de ambiente
- Deploy de aplicações

---

🔮 Possíveis melhorias futuras

Algumas funcionalidades que poderiam ser adicionadas futuramente:

- 🏷️ Categorias ou gêneros literários
- ⭐ Sistema de avaliação
- 📊 Filtros por status de leitura
- 📅 Data de início e conclusão da leitura