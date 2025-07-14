# api-users.spec.ts
## Overview
This file contains a suite of API integration tests for the user-related endpoints of the application. Written using the Cypress framework, it directly tests the backend API for creating, retrieving, updating, searching, and logging in users. Its primary role is to ensure the stability and correctness of the user management functionality from an API perspective, catching regressions and validating feature implementations.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Usage](#usage)
3. [Methods](#methods)
4. [Useful details](#properties)

## Prerequisites
This test suite requires the following:
*   A running instance of the application's backend API.
*   **Cypress**: The test automation framework.
*   **@faker-js/faker**: A library for generating realistic test data (e.g., names, emails).
*   Configured Cypress environment variables, such as `Cypress.env("apiUrl")`.
*   Custom Cypress commands (`cy.task("db:seed")`, `cy.database()`, `cy.loginByApi()`) for interacting with the database and handling authentication.

## Usage
This file is not intended to be imported or used in the application's source code. It is executed by the Cypress test runner to validate the API.

To run these tests, you would typically use a command like:
```bash
npx cypress run --spec "cypress/e2e/api/api-users.spec.ts"
```
Before each test, the `beforeEach` hook seeds the database with fresh data and logs in a test user, ensuring a clean and authenticated state for each test case.

## Methods
This file defines a test suite for the `Users API`. The tests are grouped by the API endpoint they target.

*   **`GET /users`**: Verifies that a list of users can be successfully retrieved and contains more than one user.
*   **`GET /users/:userId`**: Checks that a specific user can be fetched by their ID. It also tests the error handling for requests with an invalid `userId`.
*   **`GET /users/profile/:username`**: Confirms that a user's public profile can be retrieved by username and that it correctly excludes sensitive information like account balance.
*   **`GET /users/search`**: Tests the user search functionality by querying for users via email, phone number, and username.
*   **`POST /users`**: Validates the creation of a new user, including cases with and without a starting balance. It also ensures that requests with invalid fields are properly rejected.
*   **`PATCH /users/:userId`**: Tests the functionality for updating an existing user's details and validates the error response when attempting to update with invalid fields.
*   **`POST /login`**: A simple test to ensure a user can log in via the API, primarily using the custom `cy.loginByApi` command.

## Useful details
The test suite utilizes a context object (`TestUserCtx`) to maintain state and share user data between the setup (`beforeEach`) and the individual test cases (`it`). This avoids redundant data fetching within tests.

Dynamic and realistic test data is generated using `@faker-js/faker`, which helps in creating robust tests that aren't tied to static, hard-coded values. For example, when creating a new user:
```typescript
it("creates a new user", function () {
  const firstName = faker.name.firstName();

  cy.request("POST", `${apiUsers}`, {
    firstName,
    lastName: faker.name.lastName(),
    username: faker.internet.userName(),
    password: faker.internet.password(),
    // ...
  }).then((response) => {
    expect(response.status).to.eq(201);
    expect(response.body.user).to.contain({ firstName });
  });
});
```