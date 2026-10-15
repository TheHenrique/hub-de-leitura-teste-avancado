# language: pt

Funcionalidade: Login no Hub de Leitura
  Como usuário cadastrado do Hub de Leitura
  Quero fazer login com meu e-mail e senha
  Para acessar o meu painel

  Contexto:
    Dado que estou na página de login

  Cenário: Login com credenciais válidas
    Quando faço login com o e-mail "usuario@teste.com" e a senha "user123"
    Então devo ser direcionado para o painel do usuário

  Esquema do Cenário: Login com credenciais inválidas
    Quando faço login com o e-mail "<email>" e a senha "<senha>"
    Então o login deve ser recusado e devo permanecer na página de login

    Exemplos:
      | email                 | senha        |
      | usuario@teste.com     | senhaErrada1 |
      | naoexiste@teste.com   | user123      |
