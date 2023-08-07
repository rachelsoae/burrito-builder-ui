describe("Form Submission", () => {
  it("should submit and display a new order", () => {
    cy.loadPage();
    cy.postOrder();

    cy.wait('@getOrders').then((interception) => {
      cy.get('input[type=text]').type('Rachel');
      cy.get('button').contains('beans').click()
        .get('p').contains('beans');
      cy.get('button').contains('sofritas').click()
        .get('p').contains('beans, sofritas');
      cy.get('button').contains('queso fresco').click()
        .get('p').contains('beans, sofritas, queso fresco');
      cy.get('button').contains('jalapenos').click()
        .get('p').contains('beans, sofritas, queso fresco, jalapenos');
      cy.get('button').contains('Submit Order').click()

      cy.wait('@postOrder').then((interception) => {
        
        cy.get('section').children().should('have.length', 4)
          .get('section').children().last().contains('h3', 'Rachel')
          .get('section').children().last().contains('li', 'beans')
          .get('section').children().last().contains('li', 'sofritas')
          .get('section').children().last().contains('li', 'queso fresco')
          .get('section').children().last().contains('li', 'jalapenos')
      })
    })
  });
});
