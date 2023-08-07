describe("Form Error Handling", () => {
  beforeEach(() => {
    cy.loadPage();
  })
  
  it("should display an alert if form is submitted blank", () => {
    cy.wait('@getOrders').then((interception) => {
      cy.get('button').contains('Submit Order').click()
      cy.on('window:alert', (alert) => {
        expect(alert).to.contains('Please fill out the order form.')
      })
    })
  });

  it("should display an alert if form is submitted without a name", () => {
    cy.wait('@getOrders').then((interception) => {
      cy.get('button').contains('beans').click()
      cy.on('window:alert', (alert) => {
        expect(alert).to.contains('Please enter a name for this order.')
      })
    })
  });

  it("should display an alert if form is submitted without ingredients", () => {
    cy.wait('@getOrders').then((interception) => {
      cy.get('input[type=text]').type('Rachel');
      cy.get('button').contains('Submit Order').click()
      cy.on('window:alert', (alert) => {
        expect(alert).to.contains('Please select at least one ingredient.')
      })
    })
  });
});
