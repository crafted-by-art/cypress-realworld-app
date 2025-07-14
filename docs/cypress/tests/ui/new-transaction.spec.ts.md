# new-transaction.spec.ts
## Overview
This file contains Cypress end-to-end tests for the "New Transaction" feature of the application. It verifies core user flows, such as searching for users to transact with and the process of accepting a payment request. The tests ensure that both the UI and backend logic function correctly, including API responses and account balance updates. Visual regression testing is also employed to catch unintended UI changes.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Usage](#usage)
3. [Methods](#methods)
4. [Useful details](#properties)

## Prerequisites
- **Cypress**: The primary testing framework used to write and execute these E2E tests.
- **TypeScript**: The language used to write the test specifications.
- **Dinero.js**: A library used for handling monetary values and formatting currency, ensuring accurate balance calculations.
- **Custom Cypress Commands**: The project includes custom commands like `cy.getBySelLike()`, `cy.switchUserByXstate()`, and `cy.visualSnapshot()` which are defined elsewhere in the test suite's support files.

## Usage
This is a test file and is not meant to be used directly in the application. It is executed by the Cypress test runner to validate application functionality.

To run this specific test suite, use the Cypress CLI:
```bash
# Run Cypress in interactive mode
npx cypress open

# Or run it in headless mode for CI/CD environments
npx cypress run --spec "cypress/e2e/new-transaction.spec.ts"
```

## Methods
This file defines test suites and cases rather than reusable methods.

**Test Case: Accepting a Transaction Request**
A test case (partially shown) that simulates a user accepting a transaction request.
- **Flow**: Clicks an "accept" button, waits for the API update call (`@updateTransaction`) to complete successfully (HTTP 204), and verifies that the transaction detail view is displayed. It then switches to the sender's context, confirms their account balance has been correctly debited, and takes visual snapshots at key steps.

**Test Suite: `context("searches for a user by attribute", ...)`**
A suite of tests that validates the user search functionality within the new transaction form.
- **Flow**: It iterates through a list of user attributes (`firstName`, `lastName`, `username`, `email`, `phoneNumber`). For each attribute, it types a value into the search input, waits for the search API call (`@usersSearch`), and asserts that the correct number of results are displayed in the UI. It also takes visual snapshots of the search results and the cleared search state.

## Useful details
- **Custom Commands**: The tests rely heavily on custom Cypress commands like `cy.getBySelLike()` for selecting elements based on `data-test` attributes, which makes the tests more resilient to CSS or structural changes.
- **Visual Regression**: The command `cy.visualSnapshot()` is used to capture screenshots of the UI at critical points. These snapshots are compared against baseline images to detect any unintended visual changes, ensuring UI consistency.
- **Network Request Mocking/Spying**: Cypress aliases (`@updateTransaction`, `@usersSearch`) are used to wait for specific network requests to complete. This allows the tests to reliably assert on application state after asynchronous operations finish.
- **Context (`ctx`)**: The tests use a context object (`ctx`) which is likely populated in a `beforeEach` hook. This object holds shared state for the tests, such as pre-loaded user data (`ctx.user`, `ctx.allUsers`).