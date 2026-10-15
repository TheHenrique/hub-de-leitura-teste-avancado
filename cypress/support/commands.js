// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (email, senha) => { 
    cy.get('#email').type(email, {log: false})
    cy.get('#password').type(senha, {log: false})
    cy.get('#login-btn').click()
    cy.url().should('include', 'dashboard')
 })

 Cypress.Commands.add('preencherCadastro', (nome, email, telefone, senha, confirmarSenha) =>{
    cy.get('#name').type(nome)
    cy.get('#email').type(email)
    cy.get('#phone').type(telefone)
    cy.get('#password').type(senha)
    cy.get('#confirm-password').type(confirmarSenha)
    cy.get('#terms-agreement').check()
    cy.get('#register-btn').click()
 })

// App Action: faz o login pela API e grava no localStorage os mesmos dados
// que a tela de login grava, evitando preencher o formulário em cada teste
Cypress.Commands.add('loginApp', (email, senha) => {
    cy.request('POST', 'api/login', { email: email, password: senha }).then(response => {
        expect(response.status).to.equal(200)
        window.localStorage.setItem('authToken', response.body.token)
        window.localStorage.setItem('userId', response.body.id)
        window.localStorage.setItem('userName', response.body.name)
        window.localStorage.setItem('isAdmin', response.body.isAdmin)
    })
})
