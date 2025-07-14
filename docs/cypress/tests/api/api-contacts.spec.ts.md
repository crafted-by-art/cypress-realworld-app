# api-contacts.spec.ts
## Overview
This file contains API integration tests for the "Contacts" feature of the application. It uses the Cypress testing framework to directly test the backend API endpoints related to managing user contacts, bypassing the UI. The primary purpose is to verify the correctness of creating, retrieving, and deleting contacts, ensuring the server-side logic functions as expected.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Usage](#usage)
3. [Methods](#methods)
4. [Useful details](#properties)
## Prerequisites
- A running instance of the application's backend server.
- Cypress testing framework installed and configured.
- The `apiUrl` environment variable must be set in the Cypress configuration (`cypress.config.ts`).
- Custom Cypress commands `cy.task("db:seed")`, `cy.database(...)`, and `cy.loginByApi(...)` must be defined to handle database seeding, data retrieval, and user authentication.

## Usage
This file is not meant to be imported or used in application code. It is executed by the Cypress Test Runner to validate API functionality.

To run these tests, you can use the Cypress command-line interface:
```bash
# Run all tests in this specific file
npx cypress run --spec "cypress/e2e/api/api-contacts.spec.ts"
```
Alternatively, you can open the Cypress Test Runner and select `api-contacts.spec.ts` to run the tests interactively.

## Methods
This file defines a test suite for the Contacts API. Test setup is handled in `beforeEach` hooks, which seed the database and authenticate a user before each test.

- **`context("GET /contacts/:username")`**:
  - Verifies that a user's contact list can be successfully fetched by their username. It expects a `200 OK` status and a list of contacts in the response.

- **`context("POST /contacts")`**:
  - Tests the creation of a new contact. It sends a `POST` request with a `contactUserId` and asserts that the new contact is created successfully with a `200 OK` status.
  - It also includes a negative test case, ensuring the API returns a `422 Unprocessable Entity` error when an invalid `contactUserId` is provided.

- **`context("DELETE /contacts/:contactId")`**:
  - Validates the contact deletion functionality. It sends a `DELETE` request for a specific contact and expects a `200 OK` status to confirm the deletion.

## Useful details
- **Test Context (`ctx`)**: A shared context object (`TestContactsCtx`) is used to pass data between the `beforeEach` hook and the individual `it` test blocks. This object holds the authenticated user, a list of all users, and a sample contact.
- **Database Seeding**: The `cy.task("db:seed")` command is called before each test. This ensures that every test runs against a clean, predictable database state, preventing tests from interfering with one another.
- **API-Level Testing**: These tests interact directly with the API (`cy.request`). This approach is faster and less brittle than UI-based tests, allowing for focused validation of backend logic.