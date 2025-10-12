// gh-pages.js
// Script para automatizar o deploy do build do React para o branch gh-pages

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const buildPath = path.join(__dirname, 'build');
const tmpPath = path.join(__dirname, 'tmp-gh-pages-build');

if (!fs.existsSync(buildPath)) {
  console.error('O build do React não foi encontrado. Execute "npm run build" antes de publicar.');
  process.exit(1);
}

// Copia o build para uma pasta temporária
if (fs.existsSync(tmpPath)) {
  execSync(`rm -rf ${tmpPath}`);
}
execSync(`cp -r ${buildPath} ${tmpPath}`);

try {
  execSync('git checkout gh-pages', { stdio: 'inherit' });
} catch {
  execSync('git checkout --orphan gh-pages', { stdio: 'inherit' });
}

// Remove todos os arquivos exceto .git
fs.readdirSync('.').forEach(file => {
  if (file !== '.git') {
    execSync(`rm -rf ${file}`);
  }
});

// Copia o conteúdo do build temporário para a raiz
execSync(`cp -r ${tmpPath}/* .`);
execSync(`rm -rf ${tmpPath}`);

execSync('git add .', { stdio: 'inherit' });
execSync('git commit -m "Deploy limpo do frontend para o GitHub Pages"', { stdio: 'inherit' });
execSync('git push origin gh-pages --force', { stdio: 'inherit' });
execSync('git checkout main', { stdio: 'inherit' });

console.log('Deploy realizado com sucesso!');
