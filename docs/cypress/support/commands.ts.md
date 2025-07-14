```markdown
# commands.ts

## Overview
This file is part of a Cypress testing suite, primarily responsible for custom command definitions that simplify and enhance test operations. It provides commands for interacting with a date range picker, performing database operations, and handling Google API-based authentication. The commands are designed to improve the maintainability and readability of Cypress tests by abstracting complex tasks into reusable functions.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Usage](#usage)
3. [Methods](#methods)
4. [Useful details](#useful-details)

## Prerequisites
- **Cypress**: Ensure Cypress is installed as it is a fundamental dependency for executing the test commands.
- **Environment Variables**: Set up required environment variables such as `googleClientId`, `googleClientSecret`, and `googleRefreshToken` for Google API authentication.
- **Node.js**: Ensure the Node.js environment is properly configured, as it is necessary for running Cypress scripts.

## Usage
To utilize these custom commands within a Cypress test:
1. Import or reference the `commands.ts` file in your test suite.
2. Call the provided commands like any built-in Cypress commands. For example, to use the Google login command:
   ```javascript
   cy.loginByGoogleApi();
   ```

## Methods
### `cy.database(operation, entity, query, logTask = false)`
Performs database operations through Cypress tasks.
- **Parameters:**
  - `operation`: String, the type of database operation (e.g., "read", "write").
  - `entity`: String, the target entity/table for the operation.
  - `query`: Object, the query parameters.
  - `logTask`: Boolean, optional, indicates whether to log the task.

### `cy.loginByGoogleApi()`
Handles authentication via Google API.
- **Description**: Utilizes Google's OAuth 2.0 service to login and set user details in `localStorage`.
- **Flow**:
  1. Sends a POST request to get tokens using specified environment variables.
  2. Retrieves user information and stores it in `localStorage`.
  3. Navigates to the home page (`cy.visit("/")`).

## Useful details
- **Snapshots**: Logging snapshots are utilized for capturing test execution states, aiding in debugging and analysis.
- **Date manipulation**: The code demonstrates manipulating system dates using `cy.clock()` to simulate different testing scenarios.
- **Timeouts and Visibility Checks**: Ensures elements like the date picker are properly rendered and disappear as expected during tests.
```