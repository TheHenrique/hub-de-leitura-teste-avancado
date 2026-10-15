import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
import loginPage from '../pages/login-page'

Given('que estou na página de login', () => {
    loginPage.visitar()
})

When('faço login com o e-mail {string} e a senha {string}', (email, senha) => {
    loginPage.fazerLogin(email, senha)
})

Then('devo ser direcionado para o painel do usuário', () => {
    cy.wait('@requisicaoLogin').its('response.statusCode').should('eq', 200)
    cy.url().should('include', 'dashboard')
    loginPage.nomeUsuario.should('be.visible')
})

Then('o login deve ser recusado e devo permanecer na página de login', () => {
    cy.wait('@requisicaoLogin').its('response.statusCode').should('be.within', 400, 499)
    cy.url().should('include', 'login').and('not.include', 'dashboard')
    loginPage.botaoLogin.should('be.visible')
})
