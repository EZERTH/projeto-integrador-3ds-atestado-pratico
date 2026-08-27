const usuarios = [
    {
        id: 1,
        nome: "Paulo Emanuel",
        email: "paulo@escola.com",
        senha: "123456",
        tipo: "aluno"
    },
    {
        id: 2,
        nome: "Ana Souza",
        email: "ana@escola.com",
        senha: "123456",
        tipo: "aluno"
    },
    {
        id: 3,
        nome: "Carlos Lima",
        email: "carlos@escola.com",
        senha: "123456",
        tipo: "aluno"
    },
    {
        id: 4,
        nome: "Secretaria Escolar",
        email: "secretaria@escola.com",
        senha: "admin123",
        tipo: "secretaria"
    }
];

const faltas = [
    { id: 1, alunoId: 1, data: "2026-08-01", status: "não justificada" },
    { id: 2, alunoId: 1, data: "2026-08-03", status: "justificada" },
    { id: 3, alunoId: 1, data: "2026-08-10", status: "não justificada" },
    { id: 4, alunoId: 2, data: "2026-08-05", status: "justificada" },
    { id: 5, alunoId: 3, data: "2026-08-07", status: "não justificada" }
];

module.exports = { usuarios, faltas };