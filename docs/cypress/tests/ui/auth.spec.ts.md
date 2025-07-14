# auth.spec.ts
## Overview
This file contains end-to-end (E2E) tests for the application's core authentication functionality. Using the Cypress testing framework, it simulates user behavior to validate the sign-up, login, and logout flows. The tests also cover session management, user onboarding, and error handling to ensure a robust and reliable authentication experience.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Usage](#usage)
3. [Methods](#methods)
4. [Useful details](#properties)
## Prerequisites
*   **Cypress:** The primary testing framework.
*   **Node.js/npm:** Required to run the test environment.
*   **Running Application Stack:** A running instance of the application's frontend and backend is necessary for the E2E tests to interact with.
*   **Custom Cypress Commands:** The tests rely on custom commands defined in the project's support files, such as `cy.login()`, `cy.database()`, `cy.getBySel()`, and `cy.visualSnapshot()`.

## Usage
These tests are typically executed through the Cypress Test Runner or from the command line. To run this specific test file, navigate to the project root and execute the following command:

```bash
npx cypress run --spec "cypress/e2e/auth.spec.ts"
```

## Methods
This file contains a primary test suite that verifies user authentication.

*   **`describe("User Sign-up and Login", ...)`**: A test suite that groups all tests related to user authentication. A `beforeEach` hook within this suite resets the database and intercepts key API calls (`/users`, GraphQL mutations) before each test run, ensuring a clean and predictable state.

Key test cases include:
*   **`it("should redirect unauthenticated user to signin page")`**: Verifies that users attempting to access protected pages without being logged in are correctly redirected to the `/signin` page.
*   **`it("should allow a visitor to sign-up, login, and logout")`**: A comprehensive "happy path" test that simulates a complete user journey: signing up for a new account, logging in, completing the multi-step onboarding process, and finally logging out.
    ```typescript
    // Example from the test: Signing up a new user
    cy.getBySel("signup-first-name").type(userInfo.firstName);
    cy.getBySel("signup-last-name").type(userInfo.lastName);
    cy.getBySel("signup-username").type(userInfo.username);
    cy.getBySel("signup-password").type(userInfo.password);
    cy.getBySel("signup-confirmPassword").type(userInfo.password);
    cy.getBySel("signup-submit").click();
    ```
*   **`it("should display login/signup errors")`**: Ensures that form validation works correctly by testing for required fields and password mismatches, and verifying that the submit button is disabled until the form is valid.
*   **`it("should error for an invalid user")`**: Checks that the system displays a clear error message when a user attempts to log in with invalid credentials.

## Useful details
*   **Test Isolation**: The `beforeEach` hook runs `cy.task("db:seed")` before every test. This ensures each test case starts with a fresh, predictable database state, preventing tests from interfering with one another.
*   **Network Interception**: The tests use `cy.intercept()` to monitor and alias network requests. This is crucial for confirming that specific API calls (like user creation or GraphQL mutations) are made during a test run.
*   **Visual Regression Testing**: The use of `cy.visualSnapshot()` indicates that the project performs visual regression testing. This captures screenshots of the UI at key steps and compares them against baseline images to detect unintended visual changes.
*   **Data-Driven Selectors**: The tests heavily utilize `cy.getBySel()` (a custom command for selecting elements by `data-test` attributes). This is a best practice that makes tests more resilient to UI code refactoring and styling changes.