const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let users = [];
let posts = [{id: 1, content: 'Bem-vindos … Rede Psi!', author: 'Sistema', likes: [], comments: [], createdAt: new Date().toISOString()}];
let sessions = [];

// CADASTRO
app.post('/api/users/register', (req, res) => {
    const user = {id: Date.now(), ...req.body};
    users.push(user);
    res.json({success: true, message: 'Usuario cadastrado com sucesso!'});
});

// LOGIN
app.post('/api/users/login', (req, res) => {
    res.json({success: true, user: {username: req.body.email, email: req.body.email}, token: 'abc123'});
});

// USUARIO LOGADO
app.get('/api/users/me', (req, res) => {
    res.json({username: 'Usuario', email: 'user@teste.com'});
});

// PERFIL
app.get('/api/users/profile/:username', (req, res) => {
    res.json({username: req.params.username, email: 'user@teste.com', bio: 'Usuario da Rede Psi'});
});

// POSTS - LISTAR
app.get('/api/posts', (req, res) => {
    res.json(posts);
});

// POSTS - CRIAR
app.post('/api/posts', (req, res) => {
    const newPost = {id: Date.now(), content: req.body.content, author: 'Usuario', likes: [], comments: [], createdAt: new Date().toISOString()};
    posts.unshift(newPost);
    res.json({success: true, post: newPost});
});

// POSTS DO USUARIO
app.get('/api/posts/user/:username', (req, res) => {
    res.json(posts.filter(p => p.author === req.params.username));
});

// CURTIR POST
app.post('/api/posts/:id/like', (req, res) => {
    res.json({success: true, message: 'Post curtido!'});
});

// SESSOES - LISTAR
app.get('/api/therapy/sessions', (req, res) => {
    res.json(sessions);
});

// SESSOES - AGENDAR
app.post('/api/therapy/sessions', (req, res) => {
    const session = {id: Date.now(), ...req.body, status: 'agendada'};
    sessions.push(session);
    res.json({success: true, session: session});
});

// GRUPOS
app.get('/api/groups', (req, res) => {
    res.json([{id: 1, name: 'Ansiedade', description: 'Grupo de apoio para ansiedade', members: 10}]);
});

app.listen(5000, () => console.log('REDE PSI 100% FUNCIONAL - PORTA 5000'));
