describe("navigate through the web", () => {
    beforeEach(() => {
        cy.visit('https://garnbarn.web.app/home');
        cy.loginByGoogleApi();
    })

    it("click assignment box", () => {
        cy.get('.assignment-card').click();

        cy.url().should('include', '/assignment/');
    })

    it("click assignments button", () => {
        cy.get('.md-button-content').contains('Assignment').click();

        cy.url().should('include', '/assignment');
    })

    it("click tags button", () => {
        cy.get('.md-button-content').contains('Tag').click();

        cy.url().should('include', '/tag');
    })

    it("click logo", () => {
        cy.get('.logo').click();

        cy.url().should('include', '/home');
    })
})