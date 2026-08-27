const form = document.querySelector('form');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    try {
        const resposta = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, senha })
        });

        const dados = await resposta.json();

        if (dados.sucesso) {
            localStorage.setItem('usuarioLogado', JSON.stringify(dados.usuario));
            alert(`Bem-vindo, ${dados.usuario.nome}!`);
            window.location.href = '../home/home.html';
        } else {
            alert(dados.mensagem);
        }

    } catch (erro) {
        console.error('Erro ao conectar com o servidor:', erro);
        alert('Não foi possível conectar ao servidor. Ele está rodando?');
    }
});