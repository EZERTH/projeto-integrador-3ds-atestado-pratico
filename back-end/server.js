const express = require('express');
const cors = require('cors');
const { usuarios, faltas, atestados } = require('./mockDatabase');
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
app.get('/faltas/:alunoId', (req, res) => {
    const alunoId = parseInt(req.params.alunoId);

    const faltasDoAluno = faltas.filter((falta) => falta.alunoId === alunoId);

    res.json(faltasDoAluno);
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
app.post('/atestados', (req, res) => {
    const { alunoId, motivo, data } = req.body;

    const novoAtestado = {
        id: atestados.length + 1,
        alunoId,
        motivo,
        data,
        status: "pendente"
    };

    atestados.push(novoAtestado);

    res.json({ sucesso: true, atestado: novoAtestado });
});
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});