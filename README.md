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

### Pré-requisitos
- Node.js instalado
- MongoDB Atlas account (ou MongoDB local)
- Conta no MongoDB Atlas com um cluster criado

### Configuração Inicial

1. **Instale as dependências do backend:**
   ```bash
   npm install
   ```

2. **Configure as variáveis de ambiente:**
   
   Crie um arquivo `.env` na raiz do projeto baseado no `.env.example`:
   ```bash
   cp .env.example .env
   ```
   
   Edite o arquivo `.env` e configure:
   ```
   MONGODB_URI=sua_string_de_conexao_mongodb_atlas
   JWT_SECRET=sua_chave_secreta_jwt
   ```

3. **Instale as dependências do frontend:**
   ```bash
   cd frontend
   npm install
   ```

4. **Configure as variáveis de ambiente do frontend:**
   
   Crie um arquivo `.env` no diretório `frontend` baseado no `.env.example`:
   ```bash
   cp .env.example .env
   ```
   
   Para desenvolvimento local, use:
   ```
   REACT_APP_API_URL=http://localhost:5000
   ```

### Executando o Projeto

**Backend:**
```bash
# Na raiz do projeto
npm start
```

Para desenvolvimento com auto-reload:
```bash
npm run dev
```

**Frontend:**
```bash
# No diretório frontend
cd frontend
npm start
```

O backend rodará em `http://localhost:5000` e o frontend em `http://localhost:3000`.