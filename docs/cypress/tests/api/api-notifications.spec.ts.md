# api-notifications.spec.ts
## Overview
This file contains a suite of end-to-end tests for the `/notifications` API endpoint, written using the Cypress testing framework. Its primary purpose is to verify the correctness and reliability of the API's core functionalities, such as retrieving, creating, and updating notifications. These tests ensure that the API behaves as expected, which is critical for maintaining application quality and stability.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Usage](#usage)
3. [Test Scenarios](#methods)
4. [Useful details](#properties)

## Prerequisites
To run these tests, the following are required:
*   A running instance of the application's backend API.
*   **Cypress**: The testing framework used to write and execute the tests.
*   Configured Cypress environment variables, specifically `Cypress.env("apiUrl")`.
*   Custom Cypress tasks and commands, such as `cy.task("db:seed")`, `cy.database(...)`, and `cy.loginByApi(...)`, which handle database operations and user authentication.

## Usage
This file is a test specification and is not meant to be used as a library or imported into the application's source code. It is executed by the Cypress test runner.

To run this specific test suite from the command line:
```bash
npx cypress run --spec "cypress/e2e/api/api-notifications.spec.ts"
```
Alternatively, it can be run interactively using the Cypress Test Runner UI.

## Test Scenarios
The test suite is organized into contexts, each targeting a specific API endpoint and HTTP method.

#### `context("GET /notifications")`
Verifies that an authenticated user can successfully retrieve their list of notifications.
*   **Test case**: `it("gets a list of notifications for a user")`
    *   Asserts that a `GET` request to `/notifications` returns a `200 OK` status.
    *   Ensures the response body contains a non-empty array of notification results.

#### `context("POST /notifications")`
Tests the bulk creation of notifications via the `/notifications/bulk` endpoint.
*   **Test case**: `it("creates notifications for transaction, like and comment")`
    *   Sends a `POST` request with an array of items to create notifications for a payment, like, and comment simultaneously.
    *   Asserts a `200 OK` status and verifies that the response contains the newly created notifications.

#### `context("PATCH /notifications/:notificationId")`
Validates the functionality for updating a single notification.
*   **Test case**: `it("updates a notification")`
    *   Sends a `PATCH` request to update a notification's `isRead` status to `true`.
    *   Asserts a `204 No Content` status, indicating a successful update.
*   **Test case**: `it("errors when invalid field sent")`
    *   Tests the API's error handling by sending a `PATCH` request with an invalid field.
    *   Asserts that the API correctly responds with a `422 Unprocessable Entity` status.

## Useful details
*   **Test Setup**: A `beforeEach` hook runs before every test to ensure a clean and consistent state. It seeds the database, authenticates a test user, and fetches necessary IDs (like `transactionId`, `notificationId`, etc.) for use in the test cases.
*   **Test Context**: The `TestNotificationsCtx` type defines an object (`ctx`) used to share state between the `beforeEach` setup and the individual `it` test blocks. This is a common pattern for managing dynamic test data.
*   **Error Handling**: The test for updating a notification with an invalid field demonstrates how to test for expected API errors by using `failOnStatusCode: false` in the Cypress request options.