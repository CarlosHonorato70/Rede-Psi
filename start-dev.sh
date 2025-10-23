#!/bin/bash

# Script para iniciar a Rede Psi em modo de desenvolvimento

echo "======================================"
echo "   🧠 REDE PSI - Mental Health Network"
echo "======================================"
echo ""
echo "Iniciando servidores..."
echo ""

# Verificar se as dependências estão instaladas
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependências do backend..."
    npm install
fi

if [ ! -d "frontend/node_modules" ]; then
    echo "📦 Instalando dependências do frontend..."
    cd frontend && npm install && cd ..
fi

echo ""
echo "✅ Dependências verificadas!"
echo ""
echo "Iniciando servidores em terminais separados..."
echo ""
echo "🔧 Backend Mock Server: http://localhost:5000"
echo "🌐 Frontend React App: http://localhost:3000"
echo ""
echo "⚠️  Para parar os servidores, pressione Ctrl+C em ambos os terminais"
echo ""

# Iniciar backend em background
npm run mock &
BACKEND_PID=$!

# Aguardar backend iniciar
sleep 3

# Iniciar frontend
cd frontend && npm start

# Quando o frontend for fechado, matar o backend também
kill $BACKEND_PID
