# okta.spec.ts
## Overview
This file contains Cypress end-to-end tests for validating user authentication and onboarding flows integrated with Okta. The tests are designed to run in two different modes, controlled by an environment variable, allowing for both a full UI-based login simulation and a faster, programmatic API-based login. This flexibility enables comprehensive testing of the initial user experience as well as efficient state setup for other tests.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Usage](#usage)
3. [Methods](#methods)
4. [Useful details](#properties)
## Prerequisites
- **Cypress:** The project must be set up to use the Cypress testing framework.
- **Node.js:** A Node.js environment is required to run Cypress.
- **Custom Cypress Commands:** The tests rely on custom commands which should be defined in the support files (e.g., `cypress/support/commands.ts`):
    - `cy.loginByOktaApi()`
    - `cy.loginByOkta()`
    - `cy.task("db:seed")`
    - `cy.getBySel()`
    - `cy.getBySelLike()`
- **Environment Variables:** The Cypress environment must be configured with the following variables:
    - `okta_username`: The username for the test account.
    - `okta_password`: The password for the test account.
    - `okta_programmatic_login` (optional): A boolean flag to switch between API and UI login methods.

## Usage
These tests are executed via the Cypress test runner. The behavior of the tests can be controlled by passing environment variables.

**To run tests with programmatic (API) login:**
This is the faster method, ideal for testing post-login functionality.

```bash
npx cypress run --spec "cypress/e2e/okta.spec.ts" --env okta_username=testuser,okta_password=testpass,okta_programmatic_login=true
```

**To run tests with UI-based login:**
This method simulates a user logging in through the actual Okta UI.

```bash
npx cypress run --spec "cypress/e2e/okta.spec.ts" --env okta_username=testuser,okta_password=testpass
```

## Methods
This file defines test suites (`describe`) and test cases (`it`) rather than reusable methods.

### Test Suite: Programmatic Login (`okta_programmatic_login` = true)
This suite uses `cy.loginByOktaApi()` to log in a user via an API call, bypassing the UI.

- **`beforeEach()`**: Before each test, this hook seeds the database for a clean state, intercepts a POST request to `/bankAccounts`, and performs a programmatic login.
- **`it("should allow a visitor to login, onboard and logout")`**: Verifies the complete lifecycle for a new user. It checks that the user can log in, complete the multi-step onboarding process (creating a bank account), land on the main application page, and successfully log out.
- **`it("shows onboarding")`**: A simple check to ensure the "Get Started" onboarding dialog is visible immediately after login.

### Test Suite: UI Login (`okta_programmatic_login` = false)
This suite uses `cy.loginByOkta()` to simulate a user logging in through the Okta web interface.

- **`beforeEach()`**: Before each test, this hook seeds the database and performs a UI-based login.
- **`it("verifies signed in user does not have a bank account")`**: Checks that a newly signed-in user has no existing bank accounts, confirming a clean user state.
- **`it("verifies signed in user does not have any notifications")`**: Checks that a newly signed-in user has an empty notification list.

## Useful details
- **Conditional Testing:** The file uses the `okta_programmatic_login` environment variable to conditionally execute different test suites. Programmatic login is faster and less brittle, making it suitable for setting up application state, while UI login is essential for validating the actual login user experience.
- **Database Seeding:** The `cy.task("db:seed")` command is called before each test. This is a crucial step to ensure that tests run in isolation and start from a known, predictable database state, preventing test failures due to data from previous runs.
- **Data-Test Selectors:** The use of `cy.getBySel()` and `cy.getBySelLike()` suggests the application follows the best practice of using `data-test` attributes for resilient test selectors, making them less likely to break with UI styling changes.