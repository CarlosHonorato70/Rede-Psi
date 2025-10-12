# Deploy do Backend Rede Psi no Heroku

## Passos rápidos

1. Faça login no Heroku CLI:
   ```bash
   heroku login
   ```
2. Crie um novo app:
   ```bash
   heroku create rede-psi-backend
   ```
3. Adicione as variáveis de ambiente:
   ```bash
   heroku config:set MONGODB_URI="<sua_string_do_mongodb_atlas>"
   heroku config:set JWT_SECRET="<sua_chave_secreta>"
   ```
4. Faça deploy do backend:
   ```bash
   git add .
   git commit -m "Deploy Heroku"
   git push heroku main
   ```
5. Veja a URL do backend gerada pelo Heroku e use-a no frontend.

## Observações
- O arquivo `Procfile` já está configurado.
- O backend será exposto em uma URL como: `https://rede-psi-backend.herokuapp.com/`
- Lembre-se de atualizar o frontend para consumir a API do Heroku.
