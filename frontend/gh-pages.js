// gh-pages.js
// Script para automatizar o deploy do build do React para o branch gh-pages

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const buildPath = path.join(__dirname, 'build');

if (!fs.existsSync(buildPath)) {
  console.error('O build do React não foi encontrado. Execute "npm run build" antes de publicar.');
  process.exit(1);
}

try {
  execSync('git checkout gh-pages', { stdio: 'inherit' });
} catch {
  execSync('git checkout --orphan gh-pages', { stdio: 'inherit' });
}

execSync('git rm -rf .', { stdio: 'inherit' });
execSync('cp -r build/* .', { stdio: 'inherit' });
execSync('git add .', { stdio: 'inherit' });
execSync('git commit -m "Deploy do frontend para o GitHub Pages"', { stdio: 'inherit' });
execSync('git push origin gh-pages --force', { stdio: 'inherit' });
execSync('git checkout main', { stdio: 'inherit' });

console.log('Deploy realizado com sucesso!');
