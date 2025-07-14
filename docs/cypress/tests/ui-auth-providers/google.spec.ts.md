# google.spec.ts
## Overview
This file contains end-to-end (E2E) tests written using the Cypress framework. Its primary purpose is to validate the user journey for authentication and onboarding via a Google account. The tests ensure that a new user can successfully log in, complete the multi-step onboarding process (including creating a bank account), and then log out.

These tests are conditionally executed only when a `googleClientId` environment variable is present, making them suitable for specific CI/CD environments or local testing scenarios where Google authentication is configured.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Usage](#usage)
3. [Test Scenarios](#methods)
4. [Useful details](#properties)

## Prerequisites
*   **Cypress:** The E2E testing framework used to run these tests.
*   **Node.js:** Required to run the Cypress test runner.
*   **Application Backend:** A running instance of the application's backend is required to handle authentication, database seeding (`db:seed`), and bank account creation.
*   **Environment Variables:** The test suite will only execute if the `googleClientId` environment variable is provided to Cypress.

## Usage
This file is not meant to be imported into the application but is executed by the Cypress test runner. To run these tests, you can use the Cypress command-line interface.

**Example: Running the tests from the command line**
```bash
# Run tests and provide the required environment variable
npx cypress run --spec 'cypress/e2e/google.spec.ts' --env googleClientId=YOUR_ID_HERE
```

## Test Scenarios
This file defines the "Google" test suite, which includes the following scenarios:

**`beforeEach` hook**
Before each test, a setup process is executed to ensure a clean state:
1.  `cy.task("db:seed")`: Resets the database to a known, consistent state.
2.  `cy.intercept("POST", "/bankAccounts")`: Intercepts the API call for creating a new bank account to allow the test to wait for its completion.
3.  `cy.loginByGoogleApi()`: A custom command that programmatically logs in a user via Google's API, bypassing the UI for speed and reliability.

**`it("should allow a visitor to login, onboard and logout")`**
This is a full E2E test case that verifies the complete lifecycle for a new user:
1.  Logs in via the `beforeEach` hook.
2.  Asserts the user is presented with the "Get Started" onboarding dialog.
3.  Navigates through the onboarding steps, including creating a new bank account.
4.  Verifies the successful completion of the onboarding flow.
5.  Confirms the user lands on the main application page (transaction list).
6.  Tests the logout functionality for both mobile and desktop viewports.

**`it("shows onboarding")`**
A focused test to verify that a new user who logs in is immediately and correctly presented with the initial onboarding screen.

## Useful details
*   **Programmatic Login:** The use of `cy.loginByGoogleApi()` is a testing best practice. It avoids interacting with Google's UI, which is slow, unreliable, and outside the scope of the application's tests. This makes the tests faster and more focused on the application's own functionality.
*   **Data-Test Selectors:** The tests heavily rely on `cy.getBySel()` and `cy.getBySelLike()`. These custom commands likely use `data-test` attributes on HTML elements, which is a robust strategy for creating tests that are resilient to UI and CSS changes.
*   **Conditional Execution:** The `if (Cypress.env("googleClientId"))` block ensures these tests do not run in environments where Google authentication is not configured, preventing unnecessary failures.