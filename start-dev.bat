@echo off
REM Script para iniciar a Rede Psi em modo de desenvolvimento (Windows)

echo ======================================
echo    🧠 REDE PSI - Mental Health Network
echo ======================================
echo.
echo Iniciando servidores...
echo.

REM Verificar se as dependências estão instaladas
if not exist "node_modules\" (
    echo 📦 Instalando dependências do backend...
    call npm install
)

if not exist "frontend\node_modules\" (
    echo 📦 Instalando dependências do frontend...
    cd frontend
    call npm install
    cd ..
)

echo.
echo ✅ Dependências verificadas!
echo.
echo Iniciando servidores...
echo.
echo 🔧 Backend Mock Server: http://localhost:5000
echo 🌐 Frontend React App: http://localhost:3000
echo.
echo ⚠️  Para parar os servidores, feche ambas as janelas
echo.

REM Iniciar backend em nova janela
start "Rede Psi - Backend" cmd /k npm run mock

REM Aguardar backend iniciar
timeout /t 3 /nobreak > nul

REM Iniciar frontend em nova janela
start "Rede Psi - Frontend" cmd /k cd frontend ^&^& npm start

echo.
echo ✅ Servidores iniciados!
echo.
pause
