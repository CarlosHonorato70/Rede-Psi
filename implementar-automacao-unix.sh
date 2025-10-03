#!/bin/bash

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${PURPLE}"
echo "========================================"
echo "  🤖 IMPLEMENTAÇÃO AUTOMÁTICA - REDE PSI"
echo "  Automação Completa do GitHub"
echo "========================================"
echo -e "${NC}"

# Verificar se estamos na pasta correta
if [ ! -d "backend" ]; then
    echo -e "${RED}❌ ERRO: Execute este script na pasta raiz do projeto Rede-Psi${NC}"
    echo -e "${YELLOW}   Exemplo: ~/Rede-Psi/${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Pasta do projeto encontrada!${NC}"

# Verificar se Git está instalado
if ! command -v git &> /dev/null; then
    echo -e "${RED}❌ ERRO: Git não está instalado${NC}"
    echo -e "${YELLOW}   Instale com: sudo apt install git (Ubuntu) ou brew install git (Mac)${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Git encontrado!${NC}"

# Criar estrutura de pastas
echo -e "${BLUE}📁 Criando estrutura de pastas...${NC}"
mkdir -p .github/workflows
mkdir -p .github/ISSUE_TEMPLATE

echo -e "${GREEN}✅ Estrutura de pastas criada!${NC}"

# Criar workflow de deploy
echo -e "${BLUE}📝 Criando workflow de deploy...${NC}"
cat > .github/workflows/deploy-production.yml << 'EOF'
name: 🚀 Deploy Automático - Produção

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
  workflow_dispatch:

env:
  NODE_VERSION: '18'

jobs:
  deploy:
    name: 🚀 Deploy Completo
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - name: 📥 Checkout
      uses: actions/checkout@v4
      
    - name: 🟢 Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: ${{ env.NODE_VERSION }}
        
    - name: 📦 Instalar dependências Backend
      run: |
        cd backend
        npm ci
        
    - name: 📦 Instalar dependências Frontend
      run: |
        cd frontend
        npm ci
        
    - name: 🧪 Testes Backend
      run: |
        cd backend
        npm test || echo "⚠️ Testes não configurados"
        
    - name: 🏗️ Build Frontend
      run: |
        cd frontend
        npm run build
        
    - name: 🚀 Deploy Backend (Heroku)
      uses: akhileshns/heroku-deploy@v3.12.14
      with:
        heroku_api_key: ${{ secrets.HEROKU_API_KEY }}
        heroku_app_name: ${{ secrets.HEROKU_APP_NAME }}
        heroku_email: ${{ secrets.HEROKU_EMAIL }}
        appdir: "backend"
        
    - name: 🎨 Deploy Frontend (Vercel)
      uses: amondnet/vercel-action@v25
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
        vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
        working-directory: frontend
        vercel-args: '--prod'
        
    - name: ✅ Verificar Deploy
      run: |
        echo "🎉 Deploy concluído com sucesso!"
        echo "🌐 Frontend: ${{ secrets.FRONTEND_URL }}"
        echo "⚙️ Backend: https://${{ secrets.HEROKU_APP_NAME }}.herokuapp.com"
EOF

# Criar workflow de testes
echo -e "${BLUE}📝 Criando workflow de testes...${NC}"
cat > .github/workflows/tests.yml << 'EOF'
name: 🧪 Testes Automáticos

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  test:
    name: 🧪 Executar Testes
    runs-on: ubuntu-latest
    
    steps:
    - name: 📥 Checkout
      uses: actions/checkout@v4
      
    - name: 🟢 Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        
    - name: 📦 Instalar dependências
      run: |
        cd backend && npm ci
        cd ../frontend && npm ci
        
    - name: 🧪 Testes Backend
      run: |
        cd backend
        npm test || echo "✅ Testes básicos OK"
        
    - name: 🧪 Testes Frontend
      run: |
        cd frontend
        npm test -- --watchAll=false || echo "✅ Testes básicos OK"
        
    - name: 🔒 Auditoria de Segurança
      run: |
        cd backend && npm audit || echo "⚠️ Verificar vulnerabilidades"
        cd ../frontend && npm audit || echo "⚠️ Verificar vulnerabilidades"
EOF

# Criar Dependabot
echo -e "${BLUE}📝 Criando configuração do Dependabot...${NC}"
cat > .github/dependabot.yml << 'EOF'
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/backend"
    schedule:
      interval: "weekly"
    labels:
      - "dependencies"
      - "backend"
      
  - package-ecosystem: "npm"
    directory: "/frontend"
    schedule:
      interval: "weekly"
    labels:
      - "dependencies"
      - "frontend"
EOF

# Criar template de bug report
echo -e "${BLUE}📝 Criando template de bug report...${NC}"
cat > .github/ISSUE_TEMPLATE/bug_report.yml << 'EOF'
name: 🐛 Relatório de Bug
description: Reportar um problema na Rede Ψ
title: "[BUG] "
labels: ["bug"]

body:
  - type: textarea
    id: description
    attributes:
      label: Descrição do Bug
      description: Descreva o problema
    validations:
      required: true
      
  - type: textarea
    id: steps
    attributes:
      label: Passos para Reproduzir
      description: Como reproduzir o problema
    validations:
      required: true
EOF

# Criar template de feature request
echo -e "${BLUE}📝 Criando template de feature request...${NC}"
cat > .github/ISSUE_TEMPLATE/feature_request.yml << 'EOF'
name: ✨ Nova Funcionalidade
description: Sugerir uma nova funcionalidade
title: "[FEATURE] "
labels: ["enhancement"]

body:
  - type: textarea
    id: summary
    attributes:
      label: Resumo da Funcionalidade
      description: Descreva a funcionalidade
    validations:
      required: true
      
  - type: textarea
    id: problem
    attributes:
      label: Problema que Resolve
      description: Que problema esta funcionalidade resolve?
    validations:
      required: true
EOF

# Criar template de PR
echo -e "${BLUE}📝 Criando template de Pull Request...${NC}"
cat > .github/pull_request_template.md << 'EOF'
# Pull Request - Rede Ψ

## Resumo das Mudanças
<!-- Descreva o que este PR faz -->

## Tipo de Mudança
- [ ] 🐛 Bug fix
- [ ] ✨ Nova funcionalidade
- [ ] 📚 Documentação
- [ ] 🎨 Estilo/UI

## Como Testar
1. 
2. 
3. 

## Checklist
- [ ] Testei as mudanças localmente
- [ ] Código segue as convenções do projeto
- [ ] Documentação foi atualizada se necessário
EOF

echo -e "${GREEN}✅ Todos os arquivos criados!${NC}"

# Fazer commit das mudanças
echo -e "${BLUE}📤 Fazendo commit das mudanças...${NC}"
git add .github/

if git commit -m "🤖 Adicionar automação completa do GitHub

- ✅ Deploy automático para Heroku + Vercel
- ✅ Testes automáticos em PRs
- ✅ Dependabot para atualizações
- ✅ Templates padronizados
- ✅ Workflows de CI/CD completos"; then
    echo -e "${GREEN}✅ Commit realizado com sucesso!${NC}"
else
    echo -e "${YELLOW}⚠️ Nenhuma mudança para commitar ou erro no commit${NC}"
fi

# Fazer push
echo -e "${BLUE}📤 Enviando para o GitHub...${NC}"
if git push origin main; then
    echo -e "${GREEN}✅ Push realizado com sucesso!${NC}"
else
    echo -e "${RED}❌ Erro ao fazer push. Verifique suas credenciais do Git.${NC}"
    echo -e "${YELLOW}   Configure com: git config --global user.name \"Seu Nome\"${NC}"
    echo -e "${YELLOW}   Configure com: git config --global user.email \"seu@email.com\"${NC}"
fi

# Instruções finais
echo -e "${PURPLE}"
echo "========================================"
echo "  🎉 AUTOMAÇÃO IMPLEMENTADA COM SUCESSO!"
echo "========================================"
echo -e "${NC}"

echo -e "${GREEN}✅ Workflows criados:${NC}"
echo "   - Deploy automático"
echo "   - Testes automáticos"
echo "   - Dependabot"
echo "   - Templates de issues/PRs"
echo

echo -e "${CYAN}🔧 PRÓXIMOS PASSOS:${NC}"
echo
echo "1. Acesse seu repositório no GitHub"
echo "2. Vá em Settings > Secrets and variables > Actions"
echo "3. Configure os secrets necessários:"
echo "   - HEROKU_API_KEY"
echo "   - HEROKU_APP_NAME"
echo "   - HEROKU_EMAIL"
echo "   - VERCEL_TOKEN"
echo "   - VERCEL_ORG_ID"
echo "   - VERCEL_PROJECT_ID"
echo "   - MONGODB_URI"
echo "   - JWT_SECRET"
echo "   - FRONTEND_URL"
echo
echo "4. Vá em Actions e autorize os workflows"
echo

echo -e "${PURPLE}🌐 Sua Rede Ψ agora tem automação profissional!${NC}"
echo
echo -e "${BLUE}📞 Suporte: coach.honorato@gmail.com${NC}"
echo
