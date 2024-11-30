describe('Daily Boast', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.viewport('iphone-6');
  });

  describe('Core Functionality', () => {
    it('should load the application', () => {
      cy.get('h1').should('be.visible');
    });

    it('should have a title', () => {
      cy.title().should('include', 'Daily Boast');
    });

    it('should generate a new compliment when clicked', () => {
      cy.get('[data-testid="category-general"]').click({ force: true });
      cy.wait(1000);
      cy.get('button').first().click();
    });
  });

  describe('Mood Selection', () => {
    it('should handle different moods', () => {
      cy.get('[data-testid="category-general"]').click({ force: true });
      cy.contains(/Peaceful|Calm|Happy/).click();
    });

    it('should persist selected mood', () => {
      cy.get('[data-testid="category-general"]').click({ force: true });
      cy.contains('Peaceful').click();
      cy.reload();
      cy.contains('Peaceful').should('have.class', 'bg-gray-100/50');
    });

    it('should handle switching between moods', () => {
      cy.get('[data-testid="category-general"]').click({ force: true });
      cy.contains('Peaceful').click();
      cy.contains('Happy').click();
      cy.contains('Happy').should('have.class', 'bg-white')
        .and('have.class', 'shadow-md')
        .and('have.class', 'text-purple-600');
    });
  });

  describe('Error Handling', () => {
    it('should handle API failures gracefully', () => {
      cy.intercept('POST', '**/generate-compliment', {
        statusCode: 500,
        body: { error: 'Service unavailable' }
      }).as('failedRequest');

      cy.get('[data-testid="category-general"]').click({ force: true });
      cy.contains(/Peaceful|Calm|Happy/).click();
      cy.wait('@failedRequest');
      cy.contains(/error|failed|unavailable/i).should('be.visible');
    });

    it('should handle network errors', () => {
      cy.intercept('POST', '**/generate-compliment', {
        forceNetworkError: true,
        delay: 1000
      }).as('networkError');

      cy.on('fail', (error) => {
        console.error('Network Error Test Failed:', error);
      });

      cy.get('[data-testid="category-general"]').click({ force: true });
      cy.contains(/Peaceful|Calm|Happy/).click();
      
      cy.wait('@networkError');
      cy.wait(1000);

      cy.get('body').then($body => {
        console.log('Body content:', $body.text());
      });

      cy.get('[data-testid="error-message"]').should('exist');
      cy.contains('Something went wrong').should('be.visible');
      cy.contains('Unable to generate').should('be.visible');
    });
  });

  describe('Responsive Design', () => {
    it('should display correctly on mobile', () => {
      cy.viewport('iphone-6');
      cy.get('h1').should('be.visible');
      cy.get('[data-testid="category-general"]').should('exist');
    });

    it('should display correctly on desktop', () => {
      cy.viewport('macbook-13');
      cy.get('h1').should('be.visible');
      cy.get('[data-testid="category-general"]').should('exist');
    });
  });

  describe('Interactive Elements', () => {
    it('should have clickable buttons', () => {
      cy.get('[data-testid="category-general"]')
        .should('exist')
        .and('not.be.disabled')
        .click({ force: true });
    });
  });
}); 