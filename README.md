# Rede Psi - Mental Health Social Network

🧠 Uma rede social focada em saúde mental, conectando usuários e profissionais da área de psicologia.

## 🚀 Status do Projeto

✅ **Projeto funcionando!** Aplicação backend e frontend totalmente operacionais.

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- npm (geralmente vem com Node.js)
- MongoDB Atlas (gratuito) ou MongoDB local (opcional)

## ⚡ Início Rápido

Quer começar imediatamente? Veja o [**QUICKSTART.md**](QUICKSTART.md) para ter a aplicação rodando em 2 minutos!

## 🔧 Instalação e Configuração

### 1. Clonar o Repositório

```bash
git clone https://github.com/CarlosHonorato70/Rede-Psi.git
cd Rede-Psi
```

### 2. Instalar Dependências

```bash
# Backend
npm install

# Frontend
cd frontend
npm install
cd ..
```

### 3. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
MONGODB_URI=sua_string_de_conexao_mongodb
JWT_SECRET=sua_chave_secreta_aqui
PORT=5000
```

**Nota:** Um arquivo `.env` básico já foi criado para desenvolvimento.

## 🎮 Como Executar

### Opção 1: Servidor Mock (Desenvolvimento Rápido - Recomendado para Teste)

⚠️ **Apenas para desenvolvimento/teste** - Não use em produção

Use o servidor mock com banco de dados em memória (não requer MongoDB):

```bash
# Terminal 1 - Backend Mock
npm run mock

# Terminal 2 - Frontend
npm run frontend
```

Acesse: `http://localhost:3000`

**Nota de Segurança:** O servidor mock não implementa rate limiting ou outras medidas de segurança necessárias para produção. Use `npm start` com MongoDB para ambientes de produção.

### Opção 2: Com MongoDB (Produção)

Se você tem MongoDB configurado:

```bash
# Terminal 1 - Backend
npm start

# Terminal 2 - Frontend
npm run frontend
```

### Opção 3: Desenvolvimento com Auto-reload

```bash
# Terminal 1 - Backend com auto-reload
npm run mock:watch

# Terminal 2 - Frontend
npm run frontend
```

## 📁 Estrutura do Projeto

```
Rede-Psi/
├── models/              # Modelos do MongoDB
│   ├── User.js         # Modelo de usuário
│   ├── Post.js         # Modelo de post
│   └── Comment.js      # Modelo de comentário
├── routes/              # Rotas da API
│   ├── users.js        # Rotas de usuários
│   └── posts.js        # Rotas de posts
├── frontend/            # Aplicação React
│   ├── src/
│   │   ├── components/ # Componentes reutilizáveis
│   │   ├── pages/      # Páginas da aplicação
│   │   ├── context/    # Context API
│   │   └── styles/     # Estilos CSS
│   └── public/
├── server.js            # Servidor principal (produção)
├── server-mock.js       # Servidor mock (desenvolvimento)
├── server-dev.js        # Servidor com MongoDB Memory Server
└── .env                 # Variáveis de ambiente
```

## 🌐 Endpoints da API

### Usuários
- `POST /api/users/register` - Registrar novo usuário
- `POST /api/users/login` - Login de usuário
- `GET /api/users/me` - Obter usuário atual (requer autenticação)
- `GET /api/users/profile/:username` - Obter perfil por username

### Posts
- `GET /api/posts` - Listar todos os posts (requer autenticação)
- `POST /api/posts` - Criar novo post (requer autenticação)
- `POST /api/posts/:id/like` - Curtir/Descurtir post
- `POST /api/posts/:id/comment` - Comentar em post
- `DELETE /api/posts/:id` - Deletar post

## 🛠️ Tecnologias

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT para autenticação
- bcrypt para hash de senhas

### Frontend
- React 18
- React Router DOM
- Context API para gerenciamento de estado
- CSS3 para estilização

## 📖 Documentação Adicional

- [SETUP_INSTRUCTIONS.md](SETUP_INSTRUCTIONS.md) - Instruções detalhadas de configuração
- [README_DEPLOY_HEROKU.md](README_DEPLOY_HEROKU.md) - Guia de deploy no Heroku

## 🔐 Segurança

- Senhas são criptografadas com bcrypt
- Autenticação via JWT (JSON Web Tokens)
- CORS configurado para segurança

## 🐛 Solução de Problemas

### "MongoDB connection error"
- Verifique se o arquivo `.env` está configurado corretamente
- Use `npm run mock` para rodar sem MongoDB

### "Port already in use"
- Altere a porta no `.env` ou mate o processo usando a porta

### "Cannot find module"
- Execute `npm install` na raiz e em `frontend/`

## 📝 Licença

MIT

## 👨‍💻 Autor

Carlos Honorato

---

**Nota:** Para configuração em produção com MongoDB Atlas, consulte [SETUP_INSTRUCTIONS.md](SETUP_INSTRUCTIONS.md)