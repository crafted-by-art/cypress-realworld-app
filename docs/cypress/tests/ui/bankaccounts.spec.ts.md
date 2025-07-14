# bankaccounts.spec.ts
## Overview
This file contains end-to-end tests for the Bank Account management feature of the application, written using the Cypress testing framework. It verifies core user flows such as creating, viewing, and deleting bank accounts. The tests also validate form inputs and edge cases like the empty state display. This suite is essential for ensuring the reliability and stability of the bank account functionality from a user's perspective.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Usage](#usage)
3. [Methods](#methods)
4. [Useful details](#properties)

## Prerequisites
- **Cypress:** The primary testing framework.
- **Node.js:** Required to run the Cypress test runner.
- **Running Backend:** A backend server must be running and accessible at the URL defined by `Cypress.env("apiUrl")`.
- **Custom Cypress Commands:** The project utilizes custom commands like `cy.task("db:seed")`, `cy.database(...)`, `cy.loginByXstate(...)`, and `cy.getBySel(...)`.
- **Visual Snapshot Plugin:** A Cypress plugin for visual regression testing is used (`cy.visualSnapshot`).

## Usage
This is a test file and is not meant to be imported or used in the application source code. It is executed by the Cypress test runner to verify application functionality.

To run these tests specifically, you would typically use a command like:
```bash
npx cypress run --spec "cypress/e2e/bankaccounts.spec.ts"
```
Or, you can open the interactive Cypress Test Runner to run and debug the tests:
```bash
npx cypress open
```

## Methods
The file defines a test suite with several test cases.

`describe("Bank Accounts", ...)`
This is the main test suite for the Bank Accounts feature. It groups all related tests and contains a `beforeEach` hook to set up a clean state for each test. The setup involves seeding the database, logging in a test user, and intercepting GraphQL API calls to alias them for easier waiting and assertion.

`it("creates a new bank account", ...)`
This test verifies the "happy path" for creating a new bank account. It navigates to the "new bank account" form, fills it out with valid data, and submits it. It then asserts that the new bank account appears in the list.

```typescript
it("creates a new bank account", function () {
  // ... navigate to form
  cy.getBySel("bankaccount-new").click();
  
  // Fill out and submit
  cy.getBySelLike("bankName-input").type("The Best Bank");
  cy.getBySelLike("routingNumber-input").type("987654321");
  cy.getBySelLike("accountNumber-input").type("123456789");
  cy.getBySelLike("submit").click();

  // Assert new account is visible
  cy.wait("@gqlCreateBankAccountMutation");
  cy.getBySelLike("bankaccount-list-item")
    .should("have.length", 2)
    .eq(1)
    .should("contain", "The Best Bank");
});
```

`it("should display bank account form errors", ...)`
This test case focuses on form validation. It intentionally provides invalid or incomplete data to the bank account form fields (e.g., a bank name that is too short, an invalid routing number) and asserts that the correct error messages are displayed to the user.

`it("soft deletes a bank account", ...)`
This test verifies the soft-delete functionality. It clicks the delete button on an existing bank account and confirms that the item is not removed from the list but is instead marked as "Deleted", as indicated by waiting on the `gqlDeleteBankAccountMutation`.

`it("renders an empty bank account list state with onboarding modal", ...)`
This test case checks the user experience when a user has no bank accounts. It intercepts the API call for listing bank accounts and forces an empty response. It then asserts that an "empty list" message and a user onboarding dialog are displayed.

## Useful details
- **API Interception:** The tests make heavy use of `cy.intercept()` to monitor and alias GraphQL requests. This allows tests to wait for specific mutations or queries to complete before proceeding with assertions, making them more reliable.
- **Data-Driven Selectors:** The use of the custom command `cy.getBySel` (and `getBySelLike`) indicates a best practice of using dedicated test selectors (like `data-test="some-id"`) instead of relying on fragile CSS classes or IDs.
- **Visual Regression Testing:** The presence of `cy.visualSnapshot()` shows that this test suite is part of a visual regression testing strategy, which helps catch unintended UI changes by comparing screenshots against a baseline.
- **State Management:** The `beforeEach` hook ensures each test runs independently by seeding the database and logging in a user, which prevents tests from interfering with one another.