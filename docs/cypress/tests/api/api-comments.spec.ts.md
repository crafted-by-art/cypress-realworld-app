```markdown
# api-comments.spec.ts

## Overview
This file contains End-to-End (E2E) test specifications for API operations related to comments within a software project. It utilizes Cypress to automate testing of functionalities such as retrieving and posting comments associated with specific transactions. This testing file ensures that the comments API endpoints behave correctly, allowing developers to verify the integrity and functionality of the comments feature in the application.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Usage](#usage)
3. [Methods](#methods)
4. [Useful details](#useful-details)

## Prerequisites
- **Cypress**: Ensure Cypress is installed and configured properly for running E2E tests.
- **TypeScript**: Type checks are enabled; ensure TypeScript is set up if using these checks.
- **API connection**: The environment variable `apiUrl` must be set to connect with the correct API.
- **Database seeding**: The project should have tasks or mechanisms like `db:seed` available to prepare test data.

## Usage
To utilize this test file in the project:
1. Ensure Cypress server is running.
2. Set environment variables appropriately in `Cypress.env`.
3. Execute the test using Cypress's CLI or GUI, typically by running `npx cypress open` or `npx cypress run`.

## Methods

### Before Hooks
- **before()**: Sends a `GET` request to the root to workaround an issue with `cy.visit()`.
- **beforeEach()**: Seeds the database and logs in a user before each test. Sets up necessary context such as authenticated user and transaction ID.

### Context Blocks
- **GET /comments/:transactionId**: Tests fetching comments for a given transaction. It verifies response status and checks if the comments array in the response body is correct.
  - **Parameters**: Uses `transactionId` from context.
  - **Expected outcome**: Status code 200, and presence of comments array.

- **POST /comments/:transactionId**: Tests creation of a new comment for a transaction.
  - **Parameters**: Uses `transactionId` from context, and sends a comment content in the request body.
  - **Expected outcome**: Status code 200 upon successful creation of the comment.

## Useful details
- **Cypress tasks**: Custom Cypress tasks like `db:seed` and database querying (`cy.database()`) are utilized for test setup, which helps provide necessary test data automatically.
- **Test Comments Context (`TestCommentsCtx`)**: An object to hold shared data like `authenticatedUser` and `transactionId` between tests for managing dependencies.
```