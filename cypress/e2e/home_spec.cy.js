describe("Page Load Behavior", () => {
  it("should show the title, order form, and list of existing orders", () => {
    cy.loadPage();

    cy.wait('@getOrders').then((interception) => {
      cy.get('h1').contains('Burrito Builder');
      cy.get('input[type=text]');
      cy.get('button').contains('beans')
        .get('button').contains('steak')
        .get('button').contains('carnitas')
        .get('button').contains('sofritas')
        .get('button').contains('lettuce')
        .get('button').contains('queso fresco')
        .get('button').contains('pico de gallo')
        .get('button').contains('hot sauce')
        .get('button').contains('guacamole')
        .get('button').contains('jalapenos')
        .get('button').contains('cilantro')
        .get('button').contains('sour cream')
        .get('p').contains('Nothing selected')
        .get('button').contains('Submit Order');
      cy.get('section').children().should('have.length', 3)
        .get('section').children().first().contains('h3', 'Pat')
        .get('section').children().first().contains('li', 'beans')
        .get('section').children().first().contains('li', 'lettuce')
        .get('section').children().first().contains('li', 'carnitas')
        .get('section').children().first().contains('li', 'queso fresco')
        .get('section').children().first().contains('li', 'jalapeno')
        .get('section').children().last().contains('h3', 'Alex')
        .get('section').children().last().contains('li', 'sofritas')
        .get('section').children().last().contains('li', 'beans')
        .get('section').children().last().contains('li', 'sour cream')
        .get('section').children().last().contains('li', 'carnitas')
        .get('section').children().last().contains('li', 'queso fresco')
    })
  });
});
