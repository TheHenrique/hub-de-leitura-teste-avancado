// Page Object da tela de login: concentra os seletores e as ações da página
class LoginPage {
    get campoEmail() { return cy.get('#email') }
    get campoSenha() { return cy.get('#password') }
    get botaoLogin() { return cy.get('#login-btn') }
    get nomeUsuario() { return cy.get('#user-name') }

    visitar() {
        cy.visit('login.html')
    }

    fazerLogin(email, senha) {
        // Monitora a requisição de login para os passos "Então" poderem esperar a resposta
        cy.intercept('POST', '**/login').as('requisicaoLogin')
        this.campoEmail.type(email)
        this.campoSenha.type(senha, { log: false })
        this.botaoLogin.click()
    }
}

export default new LoginPage()
