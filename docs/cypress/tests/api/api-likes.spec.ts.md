# api-likes.spec.ts
## Overview
This file contains a Cypress end-to-end test suite designed to validate the `/likes` API endpoint. Its primary purpose is to ensure the reliability and correctness of the server-side logic for managing likes on transactions. These tests directly call the API, bypassing the UI, to verify that creating and retrieving likes functions as expected.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Usage](#usage)
3. [Methods](#methods)
4. [Useful details](#properties)
## Prerequisites
- **Cypress**: The testing framework used to write and execute the tests.
- **Running Backend API**: A running instance of the application's backend is required. The API URL is configured in the Cypress environment variable `Cypress.env("apiUrl")`.
- **Custom Cypress Commands**: The tests rely on custom commands defined in the project's Cypress support files:
  - `cy.task("db:seed")`: To reset the database to a known state.
  - `cy.database(...)`: To interact with the database for test setup.
  - `cy.loginByApi(...)`: To programmatically authenticate a user.
- **Data Models**: The test uses the `User` and `Like` type definitions imported from `../../../src/models`.

## Usage
These tests are executed through the Cypress test runner. They can be run individually or as part of the entire test suite to verify the API's behavior after code changes.

To run this specific test file from the command line:
```bash
npx cypress run --spec "cypress/e2e/api-likes.spec.ts"
```

The tests are designed to be run in a CI/CD environment to automatically check for regressions in the likes API functionality.

## Methods
This file defines a series of test cases grouped by context. The setup for each test is handled within a `beforeEach` hook, which seeds the database and authenticates a user.

- **`context("GET /likes/:transactionId", ...)`**
  - **`it("gets a list of likes for a transaction", ...)`**: This test verifies that sending a `GET` request to `/likes/:transactionId` successfully retrieves a list of likes associated with that transaction. It asserts that the HTTP response status is `200 OK` and that the returned data contains the expected number of likes.

- **`context("POST /likes/:transactionId", ...)`**
  - **`it("creates a new like for a transaction", ...)`**: This test validates the creation of a new like. It sends a `POST` request to `/likes/:transactionId` and asserts that the server responds with a `200 OK` status, confirming that the like was created successfully.

## Useful details
- **Test Context (`TestLikesCtx`)**: A TypeScript `type` is used to define a context object `ctx`. This object stores shared state, such as the `authenticatedUser` and a `transactionId`, making them accessible across the `beforeEach` hook and the individual test cases (`it` blocks).

- **Test Isolation**: The `beforeEach` hook ensures that every test runs in a clean, predictable environment. It seeds the database and authenticates a new user before each test, which prevents tests from interfering with one another.

- **Programmatic Authentication**: User authentication is handled via the custom `cy.loginByApi` command. This is an efficient API testing pattern that avoids slow and flaky UI-based login flows, making the tests faster and more reliable.