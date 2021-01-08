/// <reference types="cypress" />

describe('Cypress', () => {
  it('is working', () => {
    expect(true).to.equal(true);
  });
});

describe('Browse', () => {
  it('browses to home page', () => {
    cy.visit('/');
  });
});
