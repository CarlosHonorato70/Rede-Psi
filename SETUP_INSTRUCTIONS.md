# Instruções de Configuração - Rede Psi

## Pré-requisitos
- Node.js (versão 14 ou superior)
- npm (geralmente vem com Node.js)
- Uma conta no MongoDB Atlas (gratuita) ou MongoDB instalado localmente

## Configuração Passo a Passo

### 1. Instalar Dependências

#### Backend
```bash
npm install
```

#### Frontend
```bash
cd frontend
npm install
cd ..
```

### 2. Configurar o MongoDB

Você tem duas opções:

#### Opção A: MongoDB Atlas (Recomendado - Gratuito)
1. Acesse [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crie uma conta gratuita
3. Crie um novo cluster (escolha a opção FREE)
4. Clique em "Connect" no seu cluster
5. Escolha "Connect your application"
6. Copie a string de conexão

#### Opção B: MongoDB Local
Se você tem MongoDB instalado localmente, use:
```
mongodb://localhost:27017/rede-psi
```

### 3. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto (já existe um `.env.example` como referência):

```bash
cp .env.example .env
```

Edite o arquivo `.env` e adicione suas configurações:

```env
MONGODB_URI=sua_string_de_conexao_aqui
JWT_SECRET=sua_chave_secreta_aqui
PORT=5000
```

**Importante:** 
- Substitua `sua_string_de_conexao_aqui` pela string de conexão do MongoDB Atlas ou local
- Substitua `sua_chave_secreta_aqui` por uma string aleatória segura (ex: `minha-chave-super-secreta-123`)

### 4. Iniciar a Aplicação

#### Opção 1: Iniciar Backend e Frontend Separadamente

Terminal 1 (Backend):
```bash
npm start
```

Terminal 2 (Frontend):
```bash
cd frontend
npm start
```

O backend rodará em `http://localhost:5000`
O frontend rodará em `http://localhost:3000`

#### Opção 2: Desenvolvimento com Auto-reload

Terminal 1 (Backend com nodemon):
```bash
npm run dev:watch
```

Terminal 2 (Frontend):
```bash
npm run frontend
```

### 5. Acessar a Aplicação

Abra seu navegador e acesse:
```
http://localhost:3000
```

## Estrutura do Projeto

```
Rede-Psi/
├── models/           # Modelos do MongoDB (User, Post, Comment)
├── routes/           # Rotas da API (users, posts)
├── frontend/         # Aplicação React
│   ├── src/
│   │   ├── components/  # Componentes React
│   │   ├── pages/       # Páginas da aplicação
│   │   └── context/     # Context API para autenticação
│   └── public/
├── server.js         # Servidor principal (produção)
├── server-dev.js     # Servidor de desenvolvimento
└── .env             # Variáveis de ambiente (não commitado)
```

## Endpoints da API

### Usuários
- `POST /api/users/register` - Registrar novo usuário
- `POST /api/users/login` - Login de usuário
- `GET /api/users/me` - Obter usuário atual
- `GET /api/users/profile/:username` - Obter perfil por username

### Posts
- `GET /api/posts` - Listar todos os posts
- `POST /api/posts` - Criar novo post
- `POST /api/posts/:id/like` - Curtir/Descurtir post
- `POST /api/posts/:id/comment` - Comentar em post
- `DELETE /api/posts/:id` - Deletar post

## Solução de Problemas

### Erro: "MongoDB connection error"
- Verifique se o arquivo `.env` está configurado corretamente
- Confirme se sua string de conexão do MongoDB está correta
- Se usando MongoDB Atlas, verifique se seu IP está na whitelist

### Erro: "Port 5000 already in use"
- Altere a porta no arquivo `.env`: `PORT=5001`
- Ou mate o processo que está usando a porta 5000

### Erro: "Cannot find module"
- Execute `npm install` no diretório raiz
- Execute `npm install` no diretório `frontend/`

## Deploy

Para instruções de deploy no Heroku, veja [README_DEPLOY_HEROKU.md](README_DEPLOY_HEROKU.md)

## Suporte

Para mais informações, consulte a documentação do projeto ou abra uma issue no GitHub.
