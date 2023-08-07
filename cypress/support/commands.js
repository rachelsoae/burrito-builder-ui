Cypress.Commands.add('loadPage', () => {
  cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
    statusCode: 200,
    fixture: 'orders'
  }).as('getOrders')
  cy.visit('http://localhost:3000/')
})