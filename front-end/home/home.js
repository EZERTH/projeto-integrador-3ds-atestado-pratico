// ========================================
// 1. IDENTIFICAÇÃO DO USUÁRIO
// ========================================

const usuarioSalvo = localStorage.getItem('usuarioLogado');

if (!usuarioSalvo) {
    // Se não estiver conectado, volta para o login.
    window.location.href = '../login/login.html';

} else {
    // Recupera os dados do usuário conectado.
    const usuario = JSON.parse(usuarioSalvo);

    // Exibe o nome do usuário na página.
    document.getElementById('boasVindas').textContent =
        `Bem-vindo, ${usuario.nome}!`;

    // Carrega as faltas apenas se for um aluno.
    if (usuario.tipo === 'aluno') {
        carregarFaltas(usuario.id);
    }
}


// ========================================
// 2. BOTÃO SAIR
// ========================================

document.getElementById('btnSair').addEventListener('click', () => {

    // Remove os dados do usuário conectado.
    localStorage.removeItem('usuarioLogado');

    // Redireciona para a página de login.
    window.location.href = '../login/login.html';

});


// ========================================
// 3. CARREGAR AS FALTAS DO ALUNO
// ========================================

async function carregarFaltas(alunoId) {

    try {
        // Solicita as faltas ao servidor.
        const resposta = await fetch(
            `http://localhost:3000/faltas/${alunoId}`
        );

        // Verifica se a resposta foi bem-sucedida.
        if (!resposta.ok) {
            throw new Error('Não foi possível carregar as faltas.');
        }

        // Converte a resposta para JSON.
        const faltas = await resposta.json();

        // Atualiza o total de faltas.
        document.getElementById('totalFaltas').textContent =
            faltas.length;

        // Seleciona apenas as faltas justificadas.
        const justificadas = faltas.filter(
            (falta) => falta.status === 'justificada'
        );

        // Atualiza o total de faltas justificadas.
        document.getElementById('totalJustificadas').textContent =
            justificadas.length;

        // Localiza a lista de faltas na página.
        const lista = document.getElementById('listaFaltas');

        // Limpa a lista antes de preenchê-la.
        lista.innerHTML = '';

        // Cria um elemento para cada falta.
        faltas.forEach((falta) => {

            const item = document.createElement('li');

            item.textContent =
                `${formatarData(falta.data)} — ${falta.status}`;

            lista.appendChild(item);

        });

    } catch (erro) {

        console.error('Erro ao carregar faltas:', erro);

        alert(
            'Não foi possível carregar suas faltas. ' +
            'Verifique se o servidor está funcionando.'
        );

    }

}


// ========================================
// 4. FORMATAR DATAS
// ========================================

function formatarData(data) {

    // Transforma AAAA-MM-DD em DD/MM/AAAA.
    const partes = data.split('-');

    return `${partes[2]}/${partes[1]}/${partes[0]}`;

}


// ========================================
// 5. ENVIAR ATESTADO PELO FORMULÁRIO
// ========================================

document.getElementById('formAtestado').addEventListener(
    'submit',
    async (event) => {

        // Impede o recarregamento automático da página.
        event.preventDefault();

        // Recupera os dados do usuário conectado.
        const usuarioSalvo = localStorage.getItem('usuarioLogado');

        if (!usuarioSalvo) {
            alert('Você precisa estar conectado para enviar um atestado.');
            window.location.href = '../login/login.html';
            return;
        }

        const usuario = JSON.parse(usuarioSalvo);

        // Impede que a secretaria envie atestados como aluno.
        if (usuario.tipo !== 'aluno') {
            alert('Somente alunos podem enviar atestados.');
            return;
        }

        // Recupera os dados digitados no formulário.
        const motivo = document.getElementById('motivo').value.trim();
        const data = document.getElementById('dataFalta').value;

        // Verifica se os campos foram preenchidos.
        if (!motivo || !data) {
            alert('Preencha o motivo e a data da falta.');
            return;
        }

        try {

            // Envia o atestado ao servidor.
            const resposta = await fetch(
                'http://localhost:3000/atestados',
                {
                    method: 'POST',

                    headers: {
                        'Content-Type': 'application/json'
                    },

                    body: JSON.stringify({
                        alunoId: usuario.id,
                        motivo: motivo,
                        data: data
                    })
                }
            );

            const dados = await resposta.json();

            // Verifica se o envio foi bem-sucedido.
            if (!resposta.ok || !dados.sucesso) {
                throw new Error(
                    dados.mensagem || 'Não foi possível enviar o atestado.'
                );
            }

            alert('Atestado enviado com sucesso!');

            // Limpa os campos do formulário.
            document.getElementById('formAtestado').reset();

        } catch (erro) {

            console.error('Erro ao enviar atestado:', erro);

            alert(
                'Não foi possível enviar o atestado. ' +
                'Verifique se o servidor está funcionando.'
            );

        }

    }
);