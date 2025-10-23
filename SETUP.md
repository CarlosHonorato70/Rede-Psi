# Guia de Configuração - Rede Psi

Este guia irá ajudá-lo a configurar e executar o projeto Rede Psi (Backend + Frontend) em seu ambiente local.

## O que você precisa

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 14 ou superior) - [Download aqui](https://nodejs.org/)
- **npm** (vem com Node.js)
- **Conta no MongoDB Atlas** (gratuita) - [Criar conta aqui](https://www.mongodb.com/cloud/atlas/register)

## Passo a Passo

### 1. Clone o repositório

```bash
git clone https://github.com/CarlosHonorato70/Rede-Psi.git
cd Rede-Psi
```

### 2. Configure o MongoDB Atlas

Se você ainda não tem uma conta no MongoDB Atlas:

1. Acesse [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Crie uma conta gratuita
3. Crie um novo cluster (escolha a opção gratuita "M0 Sandbox")
4. Aguarde alguns minutos até o cluster estar pronto
5. Clique em "Connect" no seu cluster
6. Escolha "Connect your application"
7. Copie a string de conexão (será algo como: `mongodb+srv://username:password@cluster.mongodb.net/...`)
8. Substitua `<password>` pela sua senha real
9. Adicione um nome para o banco de dados (por exemplo: `rede-psi`)

### 3. Configure o Backend

#### 3.1. Instale as dependências do backend

```bash
npm install
```

#### 3.2. Crie o arquivo de ambiente

```bash
# Copie o arquivo de exemplo
cp .env.example .env
```

#### 3.3. Edite o arquivo `.env`

Abra o arquivo `.env` na raiz do projeto e configure:

```env
MONGODB_URI=sua_string_de_conexao_completa_aqui
JWT_SECRET=uma_chave_secreta_aleatoria_aqui
```

**Dica para gerar JWT_SECRET:**
Você pode usar qualquer string aleatória longa. Por exemplo:
- No Linux/Mac: `openssl rand -base64 32`
- Ou use um gerador online como: https://randomkeygen.com/

**Exemplo de MONGODB_URI:**
```
mongodb+srv://meuusuario:minhasenha@cluster0.abc123.mongodb.net/rede-psi?retryWrites=true&w=majority
```

### 4. Configure o Frontend

#### 4.1. Entre na pasta do frontend

```bash
cd frontend
```

#### 4.2. Instale as dependências do frontend

```bash
npm install
```

#### 4.3. Crie o arquivo de ambiente do frontend

```bash
# Copie o arquivo de exemplo
cp .env.example .env
```

O arquivo `.env` no frontend já virá configurado com:
```env
REACT_APP_API_URL=http://localhost:5000
```

Esta é a configuração correta para desenvolvimento local.

### 5. Execute o Projeto

Você precisa executar o backend e o frontend em terminais separados.

#### 5.1. Execute o Backend

Em um terminal, na raiz do projeto:

```bash
npm start
```

Você verá:
```
Server running on port 5000
Connected to MongoDB Atlas successfully
```

#### 5.2. Execute o Frontend

Em outro terminal, na pasta `frontend`:

```bash
cd frontend
npm start
```

O navegador abrirá automaticamente em `http://localhost:3000`

## Estrutura de Portas

- **Backend API:** http://localhost:5000
- **Frontend:** http://localhost:3000

## Testando a Instalação

1. Acesse http://localhost:3000 no seu navegador
2. Você deverá ver a página inicial da Rede Psi
3. Tente criar uma conta de usuário
4. Faça login com a conta criada
5. Tente criar um post

## Problemas Comuns

### Erro: "MongoDB connection error"

**Causa:** A string de conexão do MongoDB está incorreta ou o cluster não está acessível.

**Solução:**
1. Verifique se você copiou a string de conexão corretamente
2. Certifique-se de que substituiu `<password>` pela senha real
3. Verifique se seu IP está na whitelist do MongoDB Atlas (0.0.0.0/0 permite todos os IPs)
4. Vá até o MongoDB Atlas → Network Access → Add IP Address → Allow Access from Anywhere

### Erro: "Port 5000 already in use"

**Causa:** Outra aplicação está usando a porta 5000.

**Solução:**
1. Pare o processo que está usando a porta 5000
2. Ou mude a porta no arquivo `.env`: `PORT=5001`

### Erro: "Port 3000 already in use"

**Causa:** Outra aplicação está usando a porta 3000.

**Solução:**
O React irá perguntar se você quer usar outra porta. Digite `y` para aceitar.

## Modo de Desenvolvimento

Para desenvolvimento com auto-reload:

**Backend:**
```bash
npm run dev
```

**Frontend:**
```bash
npm start
```
(O frontend já vem com auto-reload por padrão)

## Para Produção

Consulte o arquivo `README_DEPLOY_HEROKU.md` para instruções de deploy em produção.

## Suporte

Se você encontrar problemas:

1. Verifique se todas as dependências foram instaladas (`node_modules` existe tanto na raiz quanto em `frontend/`)
2. Verifique se os arquivos `.env` foram criados corretamente
3. Verifique se o MongoDB Atlas está configurado e acessível
4. Abra uma issue no GitHub com detalhes do erro

## Recursos Úteis

- [Documentação do Node.js](https://nodejs.org/docs/)
- [Documentação do React](https://react.dev/)
- [Documentação do MongoDB Atlas](https://docs.atlas.mongodb.com/)
- [Documentação do Express](https://expressjs.com/)

---

Desenvolvido para Rede Psi - Mental Health Social Network
