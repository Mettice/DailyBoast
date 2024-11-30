/// <reference types="cypress" />

// Import commands.js using ES2015 syntax:
import './commands'

// Hide fetch/XHR requests from command log
declare const window: any
const app = window.top
if (!app.document.head.querySelector('[data-hide-command-log-request]')) {
  const style = app.document.createElement('style')
  style.innerHTML =
    '.command-name-request, .command-name-xhr { display: none }'
  style.setAttribute('data-hide-command-log-request', '')
  app.document.head.appendChild(style)
}

// Add this type declaration before the Cypress.on call
declare global {
  interface Window {
    login: () => Promise<void>;
    logout: () => Promise<void>;
    isAuthenticated: boolean;
    user: {
      given_name: string;
      picture: string;
    };
  }
}

// Mock the auth context
Cypress.on('window:before:load', (win) => {
  win.login = () => Promise.resolve();
  win.logout = () => Promise.resolve();
  win.isAuthenticated = true;
  win.user = {
    given_name: 'Test User',
    picture: 'https://example.com/avatar.jpg'
  };
});