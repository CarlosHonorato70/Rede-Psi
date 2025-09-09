const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let posts = [{id: 1, content: 'Bem-vindos … Rede Psi!', author: 'Sistema', likes: [], comments: [], createdAt: new Date().toISOString()}];

app.post('/api/users/register', (req, res) => res.json({success: true, message: 'Cadastrado!'}));
app.post('/api/users/login', (req, res) => res.json({success: true, user: {username: 'Usuario', email: req.body.email}, token: 'abc123'}));
app.get('/api/users/me', (req, res) => res.json({username: 'Usuario', email: 'user@teste.com'}));
app.get('/api/users/profile/:username', (req, res) => res.json({username: req.params.username, email: 'user@teste.com', bio: 'Usuario da Rede Psi'}));
app.get('/api/posts', (req, res) => res.json(posts));
app.post('/api/posts', (req, res) => {const newPost = {id: Date.now(), content: req.body.content, author: 'Usuario', likes: [], comments: [], createdAt: new Date().toISOString()}; posts.unshift(newPost); res.json({success: true, post: newPost});});
app.post('/api/posts/:id/like', (req, res) => res.json({success: true, message: 'Post curtido!'}));

app.listen(5000, () => console.log('REDE PSI COMPLETA - PORTA 5000'));
app.get('/api/posts/user/:username', (req, res) => res.json([{id: 2, content: 'Post do usuario ' + req.params.username, author: req.params.username, likes: [], comments: [], createdAt: new Date().toISOString()}])); 
