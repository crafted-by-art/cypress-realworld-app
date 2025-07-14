# cypress-studio.spec.ts
## Overview
This file contains Cypress end-to-end tests designed to be extended using the Cypress Studio feature. It provides a foundational setup, including database seeding and user login, creating a ready-to-use environment for visually recording tests. Its primary role is to accelerate the creation of tests for common user workflows without manually writing test code.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Usage](#usage)
3. [Methods](#methods)
4. [Useful details](#properties)
## Prerequisites
- **Cypress**: This is a Cypress test file and requires Cypress to be installed in the project.
- **Cypress Studio**: The `experimentalStudio` option must be enabled in `cypress.config.ts`.
  ```typescript
  // cypress.config.ts
  import { defineConfig } from "cypress";

  export default defineConfig({
    e2e: {
      experimentalStudio: true,
      // ... other configurations
    },
  });
  ```
- **Custom Cypress Commands**: The project must have `cy.task`, `cy.database`, and `cy.login` commands configured, typically in `cypress/support/commands.ts`.
- **Type Definitions**: A `User` type definition is expected to be available from a `models` directory.

## Usage
This file is not meant to be imported but is run by the Cypress Test Runner. The primary usage pattern is to extend the empty tests using Cypress Studio.

1.  Open the Cypress Test Runner:
    ```bash
    npx cypress open
    ```
2.  Select this test file (`cypress-studio.spec.ts`) to run it.
3.  In the Command Log, hover over a test name (e.g., "create new transaction") and click the "magic wand" icon to "Add Commands to Test".
4.  Interact with your application in the browser to perform the desired actions.
5.  Click "Save Commands" in the Cypress Runner. Cypress will automatically populate the test case in this file with the recorded steps.

**Example of an extended test:**

After using Cypress Studio to record filling out and submitting a form, the empty test case:
```typescript
it("create new transaction", function () {
  // Extend test with Cypress Studio
});
```
...might be automatically updated to:
```typescript
it("create new transaction", function () {
  /* ==== Generated with Cypress Studio ==== */
  cy.get('[data-test="nav-new-transaction"]').click();
  cy.get('#user-list-search-input').type('John Doe');
  cy.get('[data-test="users-list"] > :nth-child(2)').click();
  cy.get('#amount').type('50');
  cy.get('#transaction-create-description-input').type('Lunch meeting');
  cy.get('[data-test="transaction-create-submit-payment"]').click();
  cy.get('[data-test="new-transaction-return-to-transactions"]').click();
  /* ==== End Cypress Studio ==== */
});
```

## Methods
This file contains a test suite with setup hooks and placeholder test cases.

-   **`describe("Cypress Studio Demo", function () { ... })`**
    A test suite that groups related tests for demonstration with Cypress Studio.

-   **`beforeEach(function () { ... })`**
    A setup hook that runs before each test within the suite. It ensures a consistent state by seeding the database and logging in a user, providing a clean slate for each test run.

-   **`it("create new transaction", function () { ... })`**
    A placeholder test case. It is intended to be populated with Cypress commands recorded by Cypress Studio for testing the creation of a new transaction.

-   **`it("create new bank account", function () { ... })`**
    A placeholder test case. It is intended to be populated with Cypress commands recorded by Cypress Studio for testing the creation of a new bank account.

## Useful details
The key value of this file is its `beforeEach` hook. By handling the repetitive setup tasks (database seeding, authentication), it allows the test developer to focus solely on recording the specific user interactions for the feature under test using Cypress Studio. This modular approach makes the resulting tests cleaner and easier to maintain.