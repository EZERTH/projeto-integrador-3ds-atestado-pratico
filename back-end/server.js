const express = require('express');
const cors = require('cors');
const { usuarios } = require('./mockDatabase');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Servidor do Sistema de Atestados está funcionando');
});

app.get('/users', (req, res) => {
    res.json(usuarios);
});

app.post('/login', (req, res) => {
    const { email, senha } = req.body;

    const usuarioEncontrado = usuarios.find(
        (usuario) => usuario.email === email && usuario.senha === senha
    );

    if (usuarioEncontrado) {
        res.json({ sucesso: true, usuario: usuarioEncontrado });
    } else {
        res.status(401).json({ sucesso: false, mensagem: "E-mail ou senha incorretos." });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});