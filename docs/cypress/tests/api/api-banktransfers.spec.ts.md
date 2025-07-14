# api-banktransfers.spec.ts
## Overview
This file contains Cypress end-to-end (E2E) tests for the Bank Transfer API. Its primary purpose is to validate the `/bankTransfers` API endpoint, ensuring that authenticated users can correctly retrieve their transaction data. This test suite is a critical part of the continuous integration (CI) process, guaranteeing the reliability and security of the application's financial features.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Usage](#usage)
3. [Test Suites](#methods)
4. [Useful details](#properties)

## Prerequisites
To run this test file, the following prerequisites must be met:
*   A running instance of the application's backend server.
*   Cypress testing framework installed and configured.
*   Cypress environment variables must be set, specifically `apiUrl`.
*   Custom Cypress commands must be defined for interacting with the database and handling authentication (`cy.task("db:seed")`, `cy.database()`, `cy.loginByApi()`).

## Usage
This is a test file and is not meant to be imported or used in the application source code. It is executed by the Cypress test runner.

To run this specific test suite from the command line:
```bash
npx cypress run --spec "cypress/tests/api/api-banktransfers.spec.ts"
```
Alternatively, it can be run interactively using the Cypress Test Runner UI:
```bash
npx cypress open
```

## Test Suites
This file defines a test suite for the Bank Transfer API.

### `describe("Bank Transfer API")`
The main container for all tests related to the bank transfer functionality. It uses `beforeEach` and `before` hooks to set up the test environment.
*   **`before()`**: Makes an initial request to the server to ensure connectivity before tests begin.
*   **`beforeEach()`**: Runs before each test case (`it` block). It seeds the database with fresh test data and logs in a test user to ensure a clean, authenticated state for every test.

### `context("GET /bankTransfer")`
A specific test context for the `GET` HTTP method on the `/bankTransfers` endpoint.
*   **`it("gets a list of bank transfers for user")`**: This test case verifies that a `GET` request to `/bankTransfers` returns a successful `200 OK` status. It also asserts that the transfers returned in the response body belong to the currently authenticated user.

## Useful details
*   The test uses a context object (`ctx`) to share state, such as the `authenticatedUser` object, between hooks (`beforeEach`) and the actual test cases (`it`).
*   This file relies heavily on custom Cypress commands (`cy.loginByApi`, `cy.database`) that abstract complex actions like authentication and database queries, making the tests cleaner and more readable. These commands are typically defined in the `cypress/support/commands.ts` file.