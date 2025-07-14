# api-comments.spec.ts
## Overview
This file contains End-to-End (E2E) tests for the comments API, written using the Cypress framework. Its primary purpose is to validate the backend functionality for fetching and creating comments related to a specific transaction. These tests ensure the API endpoints are reliable and function correctly under controlled conditions.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Usage](#usage)
3. [Methods](#methods)
4. [Useful details](#properties)
## Prerequisites
- **Cypress**: The test framework used to write and execute these tests.
- **Running Backend API**: The application's backend server must be running and accessible at the URL defined by the `Cypress.env("apiUrl")` environment variable.
- **Custom Cypress Commands**: The project must have the following custom commands configured:
    - `cy.task("db:seed")`: A task to reset and seed the database.
    - `cy.database(...)`: A command to query the test database directly.
    - `cy.loginByApi(...)`: A command to programmatically log in a user via an API call.

## Usage
These tests are designed to be run through the Cypress Test Runner. They are not meant to be imported or used as a library in the application source code.

To execute these tests from the command line:

```bash
# Run all E2E tests
npx cypress run

# Run only the tests in this file
npx cypress run --spec "cypress/e2e/api-comments.spec.ts"
```

## Methods
This file defines a test suite for the Comments API, which includes the following test contexts:

### `GET /comments/:transactionId`
This test suite verifies the functionality for retrieving comments.

-   **`it("gets a list of comments for a transaction")`**: Sends a `GET` request to `/api/comments/{transactionId}` and asserts that the response is successful (status 200) and contains an array of comments for the given transaction.

    ```typescript
    const transactionId = ctx.transactionId!;
    cy.request("GET", `${apiComments}/${transactionId}`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.comments).to.be.an("array").that.has.length(1);
    });
    ```

### `POST /comments/:transactionId`
This test suite validates the creation of a new comment.

-   **`it("creates a new comment for a transaction")`**: Sends a `POST` request to `/api/comments/{transactionId}` with a comment payload. It asserts that the API responds with a success status code (200), confirming the comment was created.

    ```typescript
    const transactionId = ctx.transactionId!;
    cy.request("POST", `${apiComments}/${transactionId}`, {
      content: "This is my comment",
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
    ```

## Useful details
-   **Test Setup**: Before each test (`beforeEach`), the environment is prepared by seeding the database, authenticating a test user, and retrieving a valid `transactionId`. This ensures that each test runs in a clean, predictable, and isolated state.
-   **Test Context**: A context object `ctx` is used to share data, such as the `authenticatedUser` and `transactionId`, between the setup hooks and the individual test cases. This is a common pattern for managing state within a test file.