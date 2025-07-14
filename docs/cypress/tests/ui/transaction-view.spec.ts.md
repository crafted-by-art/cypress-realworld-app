# transaction-view.spec.ts
## Overview
This file contains end-to-end tests for the "Transaction View" page using the Cypress testing framework. Its primary purpose is to verify that a user can correctly view the details of a specific transaction and interact with it. The tests cover key user actions such as liking, commenting, and responding to payment requests (accepting or rejecting). This suite ensures the UI is both functional and visually correct for various transaction states.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Usage](#usage)
3. [Methods](#methods)
4. [Useful details](#properties)
## Prerequisites
- **Cypress**: The testing framework used to write and run these tests.
- **Node.js**: Required to run the Cypress test runner.
- **Backend API**: A running backend instance is needed to handle API requests, which are intercepted by these tests.
- **Custom Cypress Commands**: The project must have custom commands configured, such as:
    - `cy.loginByXstate()`: For handling user authentication.
    - `cy.database()`: For direct database interaction to fetch or verify data.
    - `cy.task("db:seed")`: For seeding the database to a known state.
    - `cy.getBySel()` / `cy.getBySelLike()`: For selecting DOM elements using `data-test` attributes.
    - `cy.visualSnapshot()`: For performing visual regression testing.

## Usage
This is a test file and is not intended to be imported or used in the application's source code. It is executed by the Cypress test runner to validate application functionality.

To run this specific test suite from the command line:
```bash
npx cypress run --spec "cypress/e2e/transaction-view.spec.ts"
```

## Methods
The file defines a test suite for the "Transaction View" and includes a setup hook and several individual test cases.

**Setup Hook (`beforeEach`)**
Before each test, this hook prepares a consistent environment. It seeds the database, intercepts several API endpoints to monitor network traffic, logs in a test user, and fetches a pending transaction request to be used in the tests.

**Test Cases (`it`)**
- **`it("transactions navigation tabs are hidden...")`**: Verifies that when a user navigates to a transaction detail page, the main navigation tabs (e.g., "Personal", "Public") are hidden to provide a focused view.
- **`it("likes a transaction")`**: Tests the "like" functionality. It ensures a user can like a transaction and that the like count updates correctly in the UI.
- **`it("comments on a transaction")`**: Checks that a user can add comments to a transaction and that the new comments are displayed in the comments list.
- **`it("accepts a transaction request")`**: Simulates a user accepting a pending payment request. It verifies that the correct API call is made and the accept/reject buttons are removed from the UI.
- **`it("rejects a transaction request")`**: Simulates a user rejecting a pending payment request, confirming the API call and subsequent UI update.
- **`it("does not display accept/reject buttons...")`**: Ensures that for a transaction request that has already been completed, the accept and reject buttons are not visible to the user.

## Useful details
- **State Management**: A context object `ctx` is used within the `describe` block to share state, such as the `authenticatedUser` and `transactionRequest`, between the `beforeEach` hook and the individual test cases.
- **API Interception**: The tests use `cy.intercept()` to stub or wait for API requests. This makes tests more robust and predictable by isolating the frontend from backend fluctuations.
- **Database Seeding**: Tests rely on `cy.task("db:seed")` and `cy.database()` to set up specific scenarios (e.g., a user with a pending transaction request), ensuring that tests run against a known and consistent data state.
- **Visual Regression Testing**: `cy.visualSnapshot()` is called at the end of tests to capture screenshots of the UI. This helps detect unintended visual changes in components and layouts over time.