# Rede Psi

Rede Psi é uma Rede Social voltada para Saúde Mental (Mental Health Social Network).

## Como Acessar a Rede Psi

A aplicação está disponível online e pode ser acessada através do seguinte link:

🌐 **[https://carloshonorato70.github.io/Rede-Psi](https://carloshonorato70.github.io/Rede-Psi)**

### Para Novos Usuários

1. Acesse o link acima
2. Clique em "Registrar" ou "Criar Conta"
3. Preencha o formulário com suas informações:
   - Nome de usuário
   - Email
   - Senha
4. Após o registro, você será direcionado para fazer login

### Para Usuários Existentes

1. Acesse o link acima
2. Clique em "Login" ou "Entrar"
3. Insira seu nome de usuário e senha
4. Clique em "Entrar" para acessar a rede

### O Que Você Pode Fazer na Rede Psi

- Criar e compartilhar posts relacionados à saúde mental
- Interagir com posts de outros usuários através de comentários
- Visualizar e editar seu perfil
- Conectar-se com uma comunidade focada em bem-estar mental

---

## Backend - Documentação Técnica

API REST para a Rede Psi.

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