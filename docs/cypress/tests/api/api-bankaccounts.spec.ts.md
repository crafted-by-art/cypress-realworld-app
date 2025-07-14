# api-bankaccounts.spec.ts
## Overview
This file contains a suite of end-to-end tests for the bank accounts API, written using the Cypress testing framework. Its primary purpose is to verify the correctness of the API endpoints for managing user bank accounts, covering both RESTful and GraphQL interfaces. The tests ensure that an authenticated user can perform Create, Read, and Delete (CRD) operations on their bank accounts.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Usage](#usage)
3. [Methods](#methods)
4. [Useful details](#properties)
## Prerequisites
- **Cypress:** The testing framework used to run these tests.
- **`@faker-js/faker`**: A library used to generate mock data for creating new bank accounts (e.g., bank names, account numbers).
- **Running Backend Application**: A running instance of the application backend is required, with its URL configured in the Cypress environment variable `Cypress.env("apiUrl")`.
- **Custom Cypress Commands**: The project must have custom commands like `cy.task("db:seed")`, `cy.database()`, and `cy.loginByApi()` configured to handle database state and user authentication.

## Usage
This is a test file and is not meant to be imported or used in the application's source code. It is executed by the Cypress test runner to validate API functionality.

To run this specific test suite from the command line:
```bash
npx cypress run --spec "cypress/tests/api/api-bankaccounts.spec.ts"
```

## Methods
This file defines a series of test cases grouped by the API endpoint they target. It does not export any reusable methods.

### Test Setup
- **`before()`**: A hook that runs once before all tests. It makes an initial request to the root of the application to ensure the server is ready.
- **`beforeEach()`**: A hook that runs before each individual test case (`it` block). It performs the following setup actions:
    1.  Resets the database to a known state using `cy.task("db:seed")`.
    2.  Fetches a user from the database to act as the authenticated user.
    3.  Logs the user in via an API call using the custom `cy.loginByApi()` command.
    4.  Fetches a list of pre-existing bank accounts for use in tests.

### Test Suites (Contexts)
- **`GET /bankAccounts`**: Verifies that a user can retrieve a list of their own bank accounts.
- **`GET /bankAccounts/:bankAccountId`**: Checks if a single bank account can be fetched by its ID.
- **`POST /bankAccounts`**: Validates the creation of a new bank account.
- **`DELETE /bankAccounts/:bankAccountId`**: Ensures that an existing bank account can be deleted.
- **`/graphql`**: Contains tests for the GraphQL endpoint, verifying equivalent bank account operations:
    - **Query `listBankAccount`**: Fetches a list of bank accounts.
    - **Mutation `createBankAccount`**: Creates a new bank account.
    - **Mutation `deleteBankAccount`**: Deletes a bank account by its ID.

## Useful details
- **Test Context (`ctx`)**: The tests use a local context object (`ctx`) to share state between the `beforeEach` setup hook and the individual test cases. This object holds the authenticated user's data and pre-existing bank accounts, making them easily accessible within each test.
- **Database Seeding**: The `cy.task("db:seed")` command is crucial for maintaining test isolation. By resetting the database before each test, it ensures that tests are predictable and not affected by the outcomes of previous tests.