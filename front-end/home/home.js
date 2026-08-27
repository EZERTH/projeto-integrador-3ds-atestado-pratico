const usuarioSalvo = localStorage.getItem('usuarioLogado');

if (!usuarioSalvo) {
    window.location.href = '../login/login.html';
} else {
    const usuario = JSON.parse(usuarioSalvo);

    document.getElementById('boasVindas').textContent = `Bem-vindo, ${usuario.nome}!`;

    carregarFaltas(usuario.id);
}

document.getElementById('btnSair').addEventListener('click', () => {
    localStorage.removeItem('usuarioLogado');
    window.location.href = '../login/login.html';
});

async function carregarFaltas(alunoId) {
    const resposta = await fetch(`http://localhost:3000/faltas/${alunoId}`);
    const faltas = await resposta.json();

    document.getElementById('totalFaltas').textContent = faltas.length;

    const justificadas = faltas.filter((falta) => falta.status === 'justificada');
    document.getElementById('totalJustificadas').textContent = justificadas.length;

    const lista = document.getElementById('listaFaltas');
    lista.innerHTML = '';

    faltas.forEach((falta) => {
        const item = document.createElement('li');
        item.textContent = `${falta.data} — ${falta.status}`;
        lista.appendChild(item);
    });
}