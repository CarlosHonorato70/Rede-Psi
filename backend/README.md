# Backend - Rede Psi

API REST para a Rede Psi (Mental Health Social Network).

## Tecnologias
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT para autenticação
- bcrypt para hash de senhas

## Estrutura
- `server.js` - Arquivo principal do servidor
- `models/` - Modelos do MongoDB (User, Post, Comment)
- `routes/` - Rotas da API (users, posts)

## Endpoints
- `/api/users` - Gestão de usuários
- `/api/posts` - Gestão de posts

## Como Executar
```bash
npm install
npm start
```

Para desenvolvimento com auto-reload:
```bash
npm run dev
```