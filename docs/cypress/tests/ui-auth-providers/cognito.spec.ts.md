# cognito.spec.ts
## Overview
This file contains Cypress end-to-end tests for user authentication via AWS Cognito. It validates the entire user journey, including login, the initial onboarding process, and logout. The tests are designed to run in two different modes, controlled by a configuration flag, to test both a programmatic (API-based) login and a UI-based login flow.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Usage](#usage)
3. [Methods](#methods)
4. [Useful details](#properties)
## Prerequisites
- **Cypress**: The test automation framework used to run these tests.
- **Custom Commands**: The file depends on custom Cypress commands defined in `support/auth-provider-commands/cognito.ts`, which must implement `loginByCognitoApi` and `loginByCognito`.
- **Environment Variables**: The tests require the following Cypress environment variables to be set:
    - `cognito_username`: The username for the test account.
    - `cognito_password`: The password for the test account.
    - `apiUrl`: The base URL for the application's GraphQL API.
    - `cognito_programmatic_login`: A boolean flag (`true` or `false`) that determines the login strategy to test.

## Usage
These tests are executed by the Cypress test runner. The behavior of the test suite is determined by the `cognito_programmatic_login` environment variable, which should be configured in `cypress.config.ts` or a similar configuration file.

**Example `cypress.config.ts` configuration:**

```typescript
import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    // ...
  },
  env: {
    cognito_username: "testuser@example.com",
    cognito_password: "TestPassword123!",
    apiUrl: "https://api.yourapp.com",
    cognito_programmatic_login: true, // Set to false to test the UI login flow
  },
});
```

To run the tests, execute the following command from the project root:
```bash
npx cypress run --spec 'cypress/e2e/cognito.spec.ts'
```

## Methods
This file contains test suites rather than reusable methods. The primary logic is split into two `describe` blocks based on the login strategy.

### `describe("AWS Cognito, programmatic login ...")`
- **Condition**: Runs only if `Cypress.env("cognito_programmatic_login")` is `true`.
- **Purpose**: Tests the application flow after a user is logged in programmatically via an API call using `cy.loginByCognitoApi`. This method is faster and more stable as it bypasses the UI for authentication.
- **Test Cases**:
    - `should allow a visitor to login, onboard and logout`: Verifies the complete user journey: sees the onboarding dialog, creates a bank account, and successfully logs out.
    - `shows onboarding`: A simpler test to confirm the onboarding process is initiated immediately after login.

### `describe("AWS Cognito, cy.origin() login ...")`
- **Condition**: Runs only if `Cypress.env("cognito_programmatic_login")` is `false`.
- **Purpose**: Tests the application flow by simulating a user logging in through the actual Cognito-hosted UI using the `cy.loginByCognito` command. This is useful for validating the real user login experience.
- **Test Cases**:
    - `shows onboarding`: Confirms the user is directed to the onboarding flow after a successful UI login.
    - `should allow a visitor to login, onboard and logout`: Verifies the full onboarding journey after a UI-based login.

## Useful details
- **State Management**: Each test begins with `cy.task("db:seed")` to reset the database, ensuring that tests run independently and from a known state.
- **Network Interception**: The test uses `cy.intercept("POST", apiGraphQL)` to wait for the `createBankAccount` mutation to complete before proceeding. This makes the test more reliable by avoiding race conditions.
- **Conditional Logic**: The top-level `if (Cypress.env("cognito_username"))` block ensures that these authentication-related tests are skipped entirely if test credentials are not provided in the environment.