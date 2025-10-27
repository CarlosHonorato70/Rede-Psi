# 🚀 Quickstart - Rede Psi

Guia rápido para colocar a Rede Psi rodando em 2 minutos!

## ⚡ Início Rápido (2 minutos)

### 1️⃣ Clone e Instale

```bash
git clone https://github.com/CarlosHonorato70/Rede-Psi.git
cd Rede-Psi
npm install
cd frontend && npm install && cd ..
```

### 2️⃣ Inicie os Servidores

**Linux/Mac:**
```bash
./start-dev.sh
```

**Windows:**
```bash
start-dev.bat
```

**Ou manualmente:**
```bash
# Terminal 1
npm run mock

# Terminal 2 (nova janela)
npm run frontend
```

### 3️⃣ Acesse a Aplicação

Abra seu navegador em: **http://localhost:3000**

## 🎮 Teste a Aplicação

1. Clique em "Register" no topo
2. Preencha o formulário de registro
3. Faça login com suas credenciais
4. Explore a rede social!

## 📝 Comandos Úteis

```bash
# Servidor mock (desenvolvimento - sem MongoDB)
npm run mock

# Servidor com MongoDB (produção)
npm start

# Frontend
npm run frontend

# Tudo com auto-reload
npm run mock:watch      # Backend
npm run frontend        # Frontend
```

## ❓ Problemas?

### Porta já em uso
```bash
# Mude a porta no .env
PORT=5001
```

### Módulos não encontrados
```bash
npm install
cd frontend && npm install
```

### Mais ajuda
Veja [SETUP_INSTRUCTIONS.md](SETUP_INSTRUCTIONS.md) para instruções detalhadas.

## 🔐 Segurança

⚠️ O comando `npm run mock` é apenas para desenvolvimento.
Para produção, use `npm start` com MongoDB configurado.

## 📚 Próximos Passos

- Configure MongoDB Atlas para persistência (veja SETUP_INSTRUCTIONS.md)
- Explore a API em http://localhost:5000/health
- Personalize o código conforme necessário
- Faça deploy (veja README_DEPLOY_HEROKU.md)

---

**Pronto!** Sua rede social está funcionando! 🎉
