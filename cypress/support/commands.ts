/// <reference types="cypress" />

// Add this empty export to make the file a module
export {};

declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      login(): Chainable<void>
      generateCompliment(category: string): Chainable<void>
      saveCompliment(): Chainable<void>
    }
  }
}

// Custom command to login
Cypress.Commands.add('login', () => {
  cy.window().then((win) => {
    win.localStorage.setItem('isAuthenticated', 'true');
    win.localStorage.setItem('user', JSON.stringify({
      given_name: 'Test User',
      picture: 'https://example.com/avatar.jpg'
    }));
  });
  cy.reload();
});

// Custom command to generate compliment
Cypress.Commands.add('generateCompliment', (category: string) => {
  cy.get(`[data-testid="category-${category}"]`).click();
  cy.get('[data-testid="compliment-card"]').should('be.visible');
});

// Custom command to save compliment
Cypress.Commands.add('saveCompliment', () => {
  cy.get('[data-testid="save-button"]').click();
  cy.get('[data-testid="toast"]').should('be.visible');
});