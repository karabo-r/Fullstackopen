/* eslint-disable no-undef */
describe('Blog app', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Please Login')
    cy.get('input[name="username"]').should('have.value', '')
    cy.get('input[name="password"]').should('have.value', '')
    cy.get('button').contains('Login')
  })
})