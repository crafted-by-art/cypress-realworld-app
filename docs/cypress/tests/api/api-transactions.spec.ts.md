# api-transactions.spec.ts
## Overview
This file is a Cypress end-to-end test suite designed to validate the `/transactions` API endpoint. It ensures the reliability of core financial operations within the application, such as creating, viewing, and updating transactions. The tests cover various scenarios, including fetching personal, contact-related, and public transactions, creating payments and requests, and modifying existing transaction statuses. This suite is critical for preventing regressions in the transaction handling logic of the backend.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Usage](#usage)
3. [Methods](#methods)
4. [Useful details](#properties)
## Prerequisites
This test suite requires a properly configured Cypress environment. Key dependencies include:
*   Cypress test runner.
*   A running instance of the backend application serving the API at the URL specified in `Cypress.env("apiUrl")`.
*   Custom Cypress commands: `cy.task("db:seed")`, `cy.database(...)`, and `cy.loginByApi(...)`.
*   NPM packages: `@faker-js/faker` for generating test data and `lodash/fp` for utility functions.

## Usage
This file is not meant to be imported or used as a module. It is a test file executed by the Cypress test runner. To run this specific test suite, use the following command from the project's root directory:

```bash
npx cypress run --spec "path/to/api-transactions.spec.ts"
```

## Methods
This file contains a series of tests organized into contexts, each targeting a specific API endpoint or functionality. The `beforeEach` hook ensures that each test runs with a clean, seeded database and an authenticated user.

*   `context("GET /transactions")`: Verifies that an authenticated user can retrieve their list of transactions. It includes tests for filtering transactions by status (e.g., `pending`) and by a date range.
*   `context("GET /transactions/contacts")`: Tests the endpoint for fetching a feed of transactions from the user's contacts, including pagination.
*   `context("GET /transactions/public")`: Validates the retrieval of all transactions marked as "public".
*   `context("POST /transactions")`: Ensures that new transactions can be created correctly. It tests both `payment` and `request` transaction types, asserting the correct status and properties upon creation.

    ```typescript
    // Example: Creating a new payment
    cy.request("POST", `${apiTransactions}`, {
      transactionType: "payment",
      source: ctx.bankAccountId,
      receiverId: ctx.receiver!.id,
      description: `Payment: ...`,
      amount: getFakeAmount(),
      privacyLevel: "public",
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.transaction.status).to.eq("complete");
    });
    ```
*   `context("PATCH /transactions/:transactionId")`: Tests the ability to update an existing transaction, such as rejecting a pending request. It also ensures the API returns appropriate errors for invalid update payloads.

    ```typescript
    // Example: Updating a transaction's status
    cy.request("PATCH", `${apiTransactions}/${ctx.transactionId}`, {
      requestStatus: "rejected",
    }).then((response) => {
      expect(response.status).to.eq(204);
    });
    ```

## Useful details
The test suite utilizes a context object (`ctx`) to share state, such as authenticated user details and entity IDs, between the setup hook (`beforeEach`) and the individual test cases (`it`). This approach keeps tests clean and focused.

A key feature of this suite is the use of the `cy.task("db:seed")` command in the `beforeEach` hook. This ensures that every test starts from a known, consistent database state, which is a best practice for writing reliable and non-flaky tests.