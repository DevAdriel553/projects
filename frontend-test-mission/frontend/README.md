# 🛒 Frontend Test Mission – Loja Virtual (React + Chakra UI)

Este projeto é uma aplicação de e-commerce desenvolvida com foco em testes técnicos para frontend. Ele simula uma loja virtual simples, onde é possível visualizar produtos, adicioná-los ao carrinho, ajustar quantidades e finalizar a compra através de um formulário de checkout.

## 📌 Proposta

A ideia central do projeto foi criar uma loja fictícia com as seguintes funcionalidades:

- Listagem de produtos consumidos de uma API (mockada via JSON Server)
- Visualização de detalhes individuais dos produtos
- Sistema de carrinho de compras com:
  - Adição de itens
  - Incremento/decremento de quantidade
  - Cálculo automático do total
  - Limpeza de carrinho
- Tela de checkout com validação de dados de envio
- Interface leve, responsiva e agradável, construída com Chakra UI

Este projeto foi desenvolvido com o objetivo de demonstrar conhecimentos em React, gerenciamento de estado com Context API, rotas com React Router, e boas práticas de organização e semântica.

---

## 🚀 Tecnologias e ferramentas utilizadas

- [React]
- [Chakra UI] (componentes de UI acessíveis e estilizados)
- [React Router DOM] (navegação entre páginas)
- [React Hook Form] (formulários e validação)
- [Axios] (requisições HTTP)
- [JSON Server] (API fake local)

---

## 🧱 Estrutura do projeto


├── public/
├── src/
│   ├── components/        # Componentes reutilizáveis (ex: CartPanel, CartIcon)
│   ├── context/           # Context API (ex: CartContext)
│   ├── pages/             # Páginas da aplicação (Home, ProductPage, Checkout)
│   ├── services/          # Configuração da API (axios)
│   ├── App.jsx            # Definição das rotas
│   ├── index.js           # Entrada da aplicação
├── mock/                
│   ├── product.json       # Mock de produtos (JSON Server)
├── README.md
└── package.json

## ⚙️ Como rodar o projeto localmente
1. Clone o repositório
    - git clone https://github.com/DevAdriel553/projects.git

2. Inicie o servidor do API fake (Lista de Produtos)
    - cd frontend-test-mission
    - npm run api
    - Acesse em: http://localhost:3001 

3. Instale as dependências:
    - cd frontend
    - npm install

4. Inicie o frontend
    - npm run dev
    - Acesse em: http://localhost:3000
 

👤 Autor
Desenvolvido por Adriel Santos Oliveira

✉️ Email: [adriel.oliveira553@outlook.com]
💼 LinkedIn: [https://www.linkedin.com/in/adriel-oliveira-developer/]
💻 GitHub: [https://github.com/DevAdriel553/]