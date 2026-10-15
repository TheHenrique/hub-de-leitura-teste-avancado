/// <reference types="cypress"/>

describe('Catálogo de livros - Intercept', () => {

    // Requisição que a tela do catálogo faz para buscar a primeira página de livros
    const rotaListaLivros = { method: 'GET', pathname: '/api/books', query: { page: '1' } }

    it('Deve exibir os livros retornados pela API (resposta simulada com sucesso)', () => {
        cy.intercept(rotaListaLivros, { fixture: 'livros-simulados.json' }).as('listaLivros')

        cy.visit('catalog.html')
        cy.wait('@listaLivros')

        cy.get('#book-list .card').should('have.length', 2)
        cy.get('#book-list').should('contain', 'Livro Simulado Disponível')
            .and('contain', 'Livro Simulado Esgotado')
        cy.get('#results-count').should('contain', 'Exibindo 2 de 2 livros')

        // O livro sem exemplares deve aparecer como indisponível
        cy.contains('#book-list .card', 'Livro Simulado Esgotado')
            .find('button[disabled]')
            .should('contain', 'Indisponível')
    });

    it('Deve exibir mensagem de erro quando a API falhar (resposta simulada com erro 500)', () => {
        cy.intercept(rotaListaLivros, {
            statusCode: 500,
            body: { message: 'Erro interno do servidor.' }
        }).as('listaLivrosErro')

        cy.visit('catalog.html')
        cy.wait('@listaLivrosErro')

        cy.get('#global-alert-container')
            .should('be.visible')
            .and('have.class', 'alert-danger')
            .and('contain', 'Erro ao carregar livros. Tente novamente.')
        cy.get('#book-list .card').should('not.exist')
    });
});
