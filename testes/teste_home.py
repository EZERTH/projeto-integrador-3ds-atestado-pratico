import requests

URL_ATESTADOS = "http://localhost:3000/atestados"


def teste_envio_de_atestado():
    dados = {
        "alunoId": 1,
        "motivo": "Consulta médica",
        "data": "2026-08-27"
    }

    resposta = requests.post(URL_ATESTADOS, json=dados)

    if resposta.status_code == 200 and resposta.json().get("sucesso") is True:
        print("✅ Teste (envio de atestado): PASSOU")
    else:
        print(f"❌ Teste (envio de atestado): FALHOU (status recebido: {resposta.status_code})")


if __name__ == "__main__":
    print("Iniciando testes da Home / atestados...\n")
    teste_envio_de_atestado()