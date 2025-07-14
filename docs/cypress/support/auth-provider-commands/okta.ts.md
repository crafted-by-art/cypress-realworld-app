# okta.ts
## Overview
This file provides custom Cypress commands to handle user authentication via Okta within an end-to-end testing suite. It offers two distinct login strategies: a fast, programmatic API-based login (`loginByOktaApi`) and a UI-driven login that simulates real user actions (`loginByOkta`). These commands abstract the complexity of Okta authentication, making tests cleaner and more efficient.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Usage](#usage)
3. [Methods](#methods)
4. [Useful details](#properties)

## Prerequisites
To use the commands in this file, the following are required:

*   **Cypress:** The file is a Cypress support file and must be loaded in a Cypress project.
*   **@okta/okta-auth-js:** The Okta Auth JS library is used for programmatic login.
*   **Cypress Environment Variables:** The test environment must have the following variables configured:
    *   `okta_domain`: Your organization's Okta domain.
    *   `okta_client_id`: The Client ID of the Okta application.

## Usage
These commands can be called directly on the `cy` object within any Cypress test file. The API-based login is ideal for `beforeEach` hooks to quickly authenticate before running tests, while the UI-based login can be used to test the login flow itself.

**Example: API Login**
```javascript
// in a test file (e.g., dashboard.cy.ts)
describe('Dashboard', () => {
  beforeEach(() => {
    // Log in programmatically before each test
    cy.loginByOktaApi('testuser@example.com', 'strong-password-123');
  });

  it('should display user information', () => {
    // The test starts with the user already logged in
    cy.visit('/dashboard');
    cy.contains('Welcome, testuser@example.com').should('be.visible');
  });
});
```

**Example: UI Login**
```javascript
// in a test file (e.g., login.cy.ts)
describe('Login Flow', () => {
  it('should allow a user to log in through the UI', () => {
    // This will navigate to the login page, fill credentials, and submit
    cy.loginByOkta('testuser@example.com', 'strong-password-123');
    
    // Assert that the user is redirected and logged in
    cy.url().should('include', '/dashboard');
    cy.get('[data-test="sidenav-username"]').should('contain', 'testuser');
  });
});
```

## Methods
### loginByOktaApi(username, password?)
Performs a programmatic login by directly calling the Okta API. It retrieves a session token, exchanges it for an access token, and stores user information and the token in `localStorage` under the key `oktaCypress`. This method is fast and reliable as it bypasses the UI.

| Parameter  | Type   | Description                                           |
|------------|--------|-------------------------------------------------------|
| `username` | string | The user's Okta username.                             |
| `password` | string | (Optional) The user's password.                       |

### loginByOkta(username, password)
Simulates a user logging in through the web interface. This command utilizes `cy.session()` to cache the authenticated state, preventing the need to re-authenticate for subsequent tests and significantly speeding up the test suite. It navigates to the Okta login page, fills in the credentials, and submits the form.

| Parameter  | Type   | Description                |
|------------|--------|----------------------------|
| `username` | string | The user's Okta username.  |
| `password` | string | The user's password.       |

## Useful details
*   **API vs. UI Login:** Use `loginByOktaApi` as a default for setting up an authenticated state for tests that do not concern the login page itself. Use `loginByOkta` specifically when you need to test the user-facing login flow.
*   **Session Caching:** The `loginByOkta` command leverages `cy.session()` to preserve the login state across tests. This means the full UI login flow only runs once per username per test run, making subsequent tests much faster.
*   **Local Storage:** The `loginByOktaApi` command sets a `localStorage` item named `oktaCypress`, which the application is expected to use to recognize the authenticated session.