# Rede Psi

Rede Social de Saúde Mental (Mental Health Social Network)

## 📋 Descrição

Rede Psi é uma plataforma de rede social focada em saúde mental, conectando usuários e profissionais verificados (terapeutas).

## 🚀 Tecnologias

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT para autenticação
- bcrypt para hash de senhas

### Frontend
- React.js
- React Router
- Context API
- CSS

## 📁 Estrutura

### Backend
- `server.js` - Arquivo principal do servidor
- `models/` - Modelos do MongoDB (User, Post, Comment)
- `routes/` - Rotas da API (users, posts)

### Frontend
- `frontend/src/` - Código-fonte da aplicação React
- `frontend/public/` - Arquivos públicos e HTML

## 🔌 Endpoints da API

- `/api/users` - Gestão de usuários
- `/api/posts` - Gestão de posts

## 💻 Como Executar

### Backend

```bash
# Instalar dependências
npm install

# Executar servidor
npm start

# Desenvolvimento com auto-reload
npm run dev
```

### Frontend

```bash
# Navegar para o diretório do frontend
cd frontend

# Instalar dependências
npm install

# Executar em modo de desenvolvimento
npm start

# Criar build de produção
npm run build
```

## 🌐 Deploy no GitHub Pages

O frontend está configurado para deploy automático no GitHub Pages:

```bash
cd frontend
npm run build
npm run deploy
```

A aplicação estará disponível em: `https://[seu-usuario].github.io/Rede-Psi`

### Configuração do GitHub Pages

O projeto utiliza uma solução para suportar React Router em GitHub Pages:

1. **404.html Redirect**: Quando uma rota é acessada diretamente (ex: `/Rede-Psi/login`), o GitHub Pages não encontra o arquivo e serve o `404.html`
2. **Path Preservation**: O `404.html` redireciona para `index.html` preservando o caminho original como parâmetro de query
3. **History Restoration**: Um script no `index.html` restaura a URL original usando `window.history.replaceState`
4. **Router Basename**: O React Router está configurado com `basename={process.env.PUBLIC_URL}` para funcionar corretamente no subdiretório

Esta solução permite:
- Navegação direta para qualquer rota
- Refresh da página em qualquer rota
- Funcionamento correto de todos os links internos

## 📝 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto backend:

```env
MONGODB_URI=sua_connection_string_mongodb
PORT=5000
JWT_SECRET=sua_chave_secreta
```

Para o frontend, crie `.env` em `frontend/`:

```env
REACT_APP_API_URL=url_do_backend
```