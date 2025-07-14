# cognito.ts
## Overview
This file provides custom Cypress commands to handle user authentication with AWS Cognito. It offers two distinct methods for logging in during end-to-end tests: a programmatic API-based login for speed and a UI-driven login that simulates a real user's actions. These commands are essential for tests that require an authenticated user session.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Usage](#usage)
3. [Methods](#methods)
4. [Useful details](#properties)
## Prerequisites
This module requires the following dependencies and environment configuration:

*   **Libraries**:
    *   `cypress`: The core testing framework.
    *   `aws-amplify`: Used for programmatic interaction with AWS services.
*   **Cypress Environment Variables**:
    *   `Cypress.env("awsConfig")`: An object containing the AWS Amplify configuration for your Cognito User Pool.
    *   `Cypress.env("cognito_domain")`: The base URL for the Cognito Hosted UI login page.

## Usage
To use these commands, first import this file into your Cypress support file (e.g., `cypress/support/e2e.ts`).

```typescript
// cypress/support/e2e.ts
import './commands'; // Assuming this file is imported there
import './cognito'; // Import the cognito commands
```

Then, you can call the commands within your test specs.

**Example: API Login**
```typescript
it('should perform an action as a logged-in user', () => {
  // Logs in programmatically without interacting with the UI
  cy.loginByCognitoApi('testuser@example.com', 'StrongPassword123');
  cy.visit('/dashboard');
  cy.contains('Welcome, testuser').should('be.visible');
});
```

**Example: UI Login with Session Caching**
```typescript
it('should log in via the UI and navigate the app', () => {
  // Logs in via the Cognito Hosted UI, caching the session
  cy.loginByCognito('testuser@example.com', 'StrongPassword123');
  cy.visit('/profile');
  cy.get('#user-profile').should('exist');
});
```

## Methods
### `cy.loginByCognitoApi(username, password)`
Logs a user in programmatically by directly calling the Cognito API via AWS Amplify. It retrieves authentication tokens (ID and Access tokens) and injects them into the browser's `localStorage`, effectively creating an authenticated session without ever rendering the login UI. This method is significantly faster than a UI-based login.

*   **`username`** `(string)`: The user's email or username.
*   **`password`** `(string)`: The user's password.

### `cy.loginByCognito(username, password)`
Performs a login by navigating to the actual Cognito Hosted UI and interacting with the form fields. It leverages Cypress's `cy.session()` command to cache and restore the session across multiple tests, avoiding the need to re-authenticate for each `it` block. This provides a more realistic test of the login flow.

*   **`username`** `(string)`: The user's email or username.
*   **`password`** `(string)`: The user's password.

## Useful details
*   **API vs. UI Login**: Choose `loginByCognitoApi` for tests where login is just a prerequisite, and speed is critical. Use `loginByCognito` for tests that specifically need to validate the login UI flow or when a more realistic user journey is required.
*   **Performance**: The `loginByCognito` command uses `cy.session()` to dramatically speed up test suites by logging in only once and reusing the session for subsequent tests.
*   **Cognito Flow**: The `loginByCognitoApi` command relies on the `USER_PASSWORD_AUTH` authentication flow being enabled in your Cognito User Pool configuration.