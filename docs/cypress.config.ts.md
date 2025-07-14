# cypress.config.ts
## Overview
This file serves as the central configuration for the Cypress testing framework. It defines the settings for both End-to-End (E2E) and Component testing environments. Its primary role is to configure test runners, manage environment variables (especially for various authentication providers), and set up custom backend tasks for test data manipulation.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Usage](#usage)
3. [Methods](#methods)
4. [Useful details](#properties)
## Prerequisites
This configuration relies on several npm packages. Ensure these are listed in your project's `devDependencies`.

- `cypress`: The core testing framework.
- `@cypress/code-coverage`: Plugin for instrumenting code and generating coverage reports.
- `axios`: Used for making HTTP requests in backend tasks.
- `bluebird`: A promise library used for handling asynchronous operations.
- `dotenv`: For loading environment variables from `.env` files.
- `lodash`: Utility library used for data manipulation in custom tasks.
- `vite`: The build tool used for the component testing dev server.

Additionally, a `.env` and/or `.env.local` file at the project root is required to provide secrets and environment-specific values, such as API keys and authentication credentials.

## Usage
This file is automatically loaded by Cypress when you run any test command. You do not import or execute it directly. The configuration within this file dictates how the test runners behave.

**To run End-to-End (E2E) tests:**
```bash
# Opens the Cypress GUI for E2E tests
npx cypress open --e2e

# Runs all E2E tests in headless mode
npx cypress run --e2e
```

**To run Component tests:**
```bash
# Opens the Cypress GUI for Component tests
npx cypress open --component

# Runs all Component tests in headless mode
npx cypress run --component
```

## Methods
This file defines custom tasks that can be invoked from your tests using `cy.task()`. These tasks run in a Node.js environment and are primarily used to interact with the backend API for test setup and data verification.

### `db:seed`
Seeds the test database with a predefined set of data. This is useful for ensuring a consistent state before tests run.

- **Parameters**: None.
- **Returns**: `Promise<any>` - The data returned from the seed endpoint.

**Example:**
```javascript
beforeEach(() => {
  cy.task("db:seed");
});
```

### `filter:database`
Fetches a list of records from a specific data entity and filters them based on a query.

- **Parameters**:
    - `queryPayload` (`Object`): An object containing:
        - `entity` (`string`): The data entity to query (e.g., 'users', 'transactions').
        - `query` (`Object`): The attributes to filter by, using lodash `_.filter`.
- **Returns**: `Promise<Array>` - An array of records matching the query.

**Example:**
```javascript
// Find all users who are administrators
cy.task("filter:database", {
  entity: "users",
  query: { isAdmin: true }
}).then(adminUsers => {
  expect(adminUsers).to.have.length.gt(0);
});
```

### `find:database`
Fetches a single record from a specific data entity that matches a query.

- **Parameters**:
    - `queryPayload` (`Object`): An object containing:
        - `entity` (`string`): The data entity to query.
        - `query` (`Object`): The attributes to find by, using lodash `_.find`.
- **Returns**: `Promise<Object>` - The first record matching the query.

**Example:**
```javascript
// Find a user with a specific email
cy.task("find:database", {
  entity: "users",
  query: { email: "testuser@example.com" }
}).then(user => {
  expect(user.firstName).to.equal("Test");
});
```

## Useful details
### Configuration Properties

- **`env`**: This object holds all custom environment variables accessible within Cypress tests via `Cypress.env('variableName')`. It is heavily used to store credentials for multiple authentication providers (Auth0, Okta, Cognito, Google), API endpoints, and other test-specific flags like `coverage`.

- **`retries`**: Configures Cypress to automatically retry failed tests. In this case, `runMode: 2` means tests will be retried up to two times when run via `cypress run`.

- **`component`**: Contains all configuration specific to component testing.
    - It uses **Vite** as the dev server, which is configured to run on a separate port (`3002`) to prevent conflicts with the main application's dev server.
    - Component test files are expected to be co-located with source code (`src/**/*.cy.ts`).

- **`e2e`**: Contains all configuration specific to End-to-End testing.
    - It sets the `baseUrl` to `http://localhost:3000`, which is the target application under test.
    - It defines the custom tasks (`db:seed`, `filter:database`, etc.) within `setupNodeEvents` for interacting with the backend.
    - E2E spec files are located in `cypress/tests/`.