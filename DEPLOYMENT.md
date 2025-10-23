# 🚀 Guia de Implantação - Rede Psi

Este documento explica como configurar e usar o fluxo de trabalho de implantação profissional do projeto Rede Psi.

## 📋 Pré-requisitos

### 1. Conta Heroku (Backend)
- Criar uma conta em [https://heroku.com](https://heroku.com)
- Instalar Heroku CLI (opcional, para testes locais)
- Criar um app no Heroku para o backend

### 2. Conta Vercel (Frontend)
- Criar uma conta em [https://vercel.com](https://vercel.com)
- Criar um projeto no Vercel para o frontend

### 3. MongoDB Atlas (Banco de Dados)
- Criar uma conta em [https://mongodb.com/atlas](https://mongodb.com/atlas)
- Criar um cluster e obter a string de conexão

## 🔑 Configuração de Secrets no GitHub

O workflow precisa das seguintes secrets configuradas no repositório GitHub:

### Para acessar: Settings → Secrets and variables → Actions → New repository secret

### Secrets Necessários:

#### Backend (Heroku):
- `HEROKU_API_KEY`: Token de API do Heroku
  - Obter em: Account Settings → API Key
  
- `HEROKU_APP_NAME`: Nome do app criado no Heroku
  - Exemplo: `rede-psi-backend`
  
- `HEROKU_EMAIL`: Email da conta Heroku

#### Frontend (Vercel):
- `VERCEL_TOKEN`: Token de autenticação do Vercel
  - Obter em: Settings → Tokens
  
- `VERCEL_ORG_ID`: ID da organização/usuário Vercel
  - Encontrar em: Settings → General
  
- `VERCEL_PROJECT_ID`: ID do projeto Vercel
  - Encontrar em: Project Settings → General

- `FRONTEND_URL`: URL do frontend no Vercel
  - Exemplo: `https://seu-projeto.vercel.app`

#### Banco de Dados:
- `MONGODB_URI`: String de conexão do MongoDB Atlas
  - Formato: `mongodb+srv://usuario:senha@cluster.mongodb.net/rede-psi`
  
- `JWT_SECRET`: Chave secreta para JWT
  - Gerar: `openssl rand -base64 32`

## 🔄 Como Funciona o Workflow

O workflow é executado automaticamente quando:
- Há um push para a branch `main`
- É aberto um Pull Request para `main`
- É disparado manualmente via GitHub Actions

### Etapas do Deploy:

1. **🧪 Testes e Validação**
   - Instala dependências do backend e frontend
   - Executa testes (se configurados)
   - Realiza auditoria de segurança

2. **🔧 Deploy Backend (Heroku)**
   - Faz deploy do backend para o Heroku
   - Aguarda o serviço ficar online
   - Verifica saúde via endpoint `/api/health`

3. **🎨 Deploy Frontend (Vercel)**
   - Compila o frontend com as variáveis de ambiente corretas
   - Faz deploy para o Vercel
   - O frontend é configurado para usar a API do Heroku

4. **✅ Verificação Final**
   - Testa o backend
   - Testa o frontend
   - Confirma que ambos estão funcionando

## 🛠️ Configuração Manual do Heroku (Alternativa)

Se preferir fazer deploy manual do backend:

```bash
# 1. Login no Heroku
heroku login

# 2. Criar app
heroku create rede-psi-backend

# 3. Configurar variáveis de ambiente
heroku config:set MONGODB_URI="sua_string_mongodb"
heroku config:set JWT_SECRET="sua_chave_secreta"

# 4. Deploy
git push heroku main

# 5. Verificar logs
heroku logs --tail
```

## 🎯 Endpoints Importantes

### Backend (Heroku):
- **Health Check**: `https://seu-app.herokuapp.com/api/health`
- **API Users**: `https://seu-app.herokuapp.com/api/users`
- **API Posts**: `https://seu-app.herokuapp.com/api/posts`

### Frontend (Vercel):
- **Home**: `https://seu-projeto.vercel.app`

## 🐛 Troubleshooting

### Erro: Backend não inicia no Heroku
- Verificar variáveis de ambiente: `heroku config`
- Verificar logs: `heroku logs --tail`
- Confirmar que `Procfile` está correto: `web: node server.js`

### Erro: Frontend não conecta ao backend
- Verificar se `REACT_APP_API_URL` está configurado no build
- Verificar CORS no backend
- Testar endpoint manualmente: `curl https://seu-app.herokuapp.com/api/health`

### Erro: MongoDB Connection Failed
- Verificar string de conexão
- Confirmar IP whitelist no MongoDB Atlas (permitir 0.0.0.0/0 para Heroku)
- Verificar usuário e senha do banco

### Erro: Build do Frontend Falha
- Verificar erros de ESLint nos logs
- Testar build localmente: `cd frontend && npm run build`
- Verificar se todas as dependências estão instaladas

## 📊 Monitoramento

### Heroku:
- Dashboard: `https://dashboard.heroku.com/apps/seu-app`
- Logs: `https://dashboard.heroku.com/apps/seu-app/logs`
- Métricas: `https://dashboard.heroku.com/apps/seu-app/metrics`

### Vercel:
- Dashboard: `https://vercel.com/dashboard`
- Analytics: Disponível no projeto Vercel
- Logs: Disponíveis em cada deployment

## 🔐 Segurança

### Boas Práticas:
- ✅ Nunca commitar `.env` ou secrets
- ✅ Usar secrets do GitHub para credenciais
- ✅ Rotacionar JWT_SECRET regularmente
- ✅ Manter dependências atualizadas
- ✅ Monitorar vulnerabilidades com `npm audit`
- ✅ Usar HTTPS em produção (automático no Heroku/Vercel)

### Auditoria:
```bash
# Backend
npm audit --audit-level=high

# Frontend
cd frontend && npm audit --audit-level=high
```

## 📝 Estrutura do Projeto

```
Rede-Psi/
├── .github/
│   └── workflows/
│       └── deploy-production.yml    # Workflow de deploy
├── frontend/                        # Aplicação React
│   ├── src/
│   ├── public/
│   └── package.json
├── models/                          # Modelos MongoDB
├── routes/                          # Rotas da API
├── server.js                        # Servidor Express (Backend root)
├── Procfile                         # Config Heroku
├── package.json                     # Deps Backend
└── .env.example                     # Template variáveis

```

## 🚦 Status do Deploy

O workflow fornece feedback visual:
- 🟢 Verde: Deploy bem-sucedido
- 🔴 Vermelho: Falha no deploy
- 🟡 Amarelo: Deploy em andamento

## 📞 Suporte

Para problemas:
1. Verificar logs do GitHub Actions
2. Verificar logs do Heroku: `heroku logs --tail`
3. Verificar logs do Vercel no dashboard
4. Consultar documentação oficial:
   - [Heroku Docs](https://devcenter.heroku.com/)
   - [Vercel Docs](https://vercel.com/docs)
   - [GitHub Actions Docs](https://docs.github.com/actions)

---

**Última atualização**: Outubro 2025
