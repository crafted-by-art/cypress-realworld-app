# auth0.ts
## Overview
This file defines a custom Cypress command, `cy.loginToAuth0`, designed to automate the authentication process with Auth0 for end-to-end tests. Its primary role is to streamline tests that require a logged-in user state by abstracting the multi-step login flow and leveraging Cypress's session caching for improved performance across the test suite.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Usage](#usage)
3. [Methods](#methods)
4. [Useful details](#properties)
## Prerequisites
*   **Cypress**: This is a Cypress custom command and requires a Cypress testing environment.
*   **Auth0 Account**: The project must be configured to use Auth0 for authentication.
*   **Environment Variables**: The Cypress configuration (`cypress.config.ts` or `cypress.env.json`) must define the `auth0_domain`.
    ```json
    {
      "auth0_domain": "your-auth0-tenant.auth0.com"
    }
    ```

## Usage
To use this custom command, first import it into your Cypress support file (e.g., `cypress/support/e2e.ts`).

```typescript
// cypress/support/e2e.ts
import './commands'; // Assumes this file is in commands.ts
import './auth0';    // Import the auth0 custom command
```

Then, you can call it directly within your tests. Note that you must call `cy.visit()` after logging in to navigate to the desired page.

```typescript
// example.cy.ts
describe("Authenticated User Actions", () => {
  beforeEach(() => {
    // Log in using the custom command
    cy.loginToAuth0(Cypress.env("auth0_username"), Cypress.env("auth0_password"));
    // After login, you must visit the page you want to test
    cy.visit("/dashboard"); 
  });

  it("should display the user's dashboard", () => {
    cy.get("h1").should("contain", "Welcome to your Dashboard");
  });
});
```

## Methods
### loginToAuth0(username, password)
Logs a user into the application via the Auth0 Universal Login page. It handles the redirection, fills in credentials, and caches the authenticated session to speed up subsequent tests.

*   **`username`** (string): The user's username or email for Auth0.
*   **`password`** (string): The user's password for Auth0.

## Useful details
*   **Session Caching**: This command utilizes `cy.session()` to cache the login state (cookies, localStorage, etc.) based on the username. This means the full UI login flow only runs once per username for the entire test run, significantly speeding up the suite.
*   **Post-Login Navigation**: As noted in the code, this command leaves the test runner on a blank page (`about:blank`) after completion. You **must** call `cy.visit()` to navigate to the desired application page immediately after calling `cy.loginToAuth0`.