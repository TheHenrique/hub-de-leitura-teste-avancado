/// <reference types="cypress"/>

describe('Painel do usuário - App Actions', () => {

    it('Deve acessar o painel logado sem passar pela tela de login', () => {
        cy.fixture('usuario').then(usuario => {
            // App Action: faz o login pela API e grava a sessão como o próprio app faz
            cy.loginApp(usuario.email, usuario.senha)
        })

        cy.visit('dashboard.html')

        cy.url().should('include', 'dashboard')
        cy.get('#user-name').should('have.text', 'Usuário Padrão')
    });
});
