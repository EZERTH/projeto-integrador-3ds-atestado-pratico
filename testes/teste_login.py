import requests

URL_LOGIN = "http://localhost:3000/login"


def teste_login_com_credenciais_corretas():
    dados = {
        "email": "paulo@escola.com",
        "senha": "123456"
    }

    resposta = requests.post(URL_LOGIN, json=dados)

    if resposta.status_code == 200:
        print("✅ Teste 1 (login correto): PASSOU")
    else:
        print(f"❌ Teste 1 (login correto): FALHOU (status recebido: {resposta.status_code})")


def teste_login_com_credenciais_erradas():
    dados = {
        "email": "paulo@escola.com",
        "senha": "senhaErrada"
    }

    resposta = requests.post(URL_LOGIN, json=dados)

    if resposta.status_code == 401:
        print("✅ Teste 2 (login incorreto rejeitado): PASSOU")
    else:
        print(f"❌ Teste 2 (login incorreto rejeitado): FALHOU (status recebido: {resposta.status_code})")


if __name__ == "__main__":
    print("Iniciando testes da rota /login...\n")
    teste_login_com_credenciais_corretas()
    teste_login_com_credenciais_erradas()