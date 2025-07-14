# auth0.spec.ts
## Overview
This file contains Cypress end-to-end tests specifically for the user authentication and onboarding flow integrated with Auth0. Its primary purpose is to validate that a user can successfully log in, complete the initial setup steps (onboarding), and log out. It ensures the core user journey is functional.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Usage](#usage)
3. [Methods](#methods)
4. [Useful details](#properties)
## Prerequisites
*   **Cypress:** The testing framework used to run these tests.
*   **Environment Variables:** The tests are conditional and will only run if the following environment variables are set for Cypress:
    *   `auth0_username`
    *   `auth0_password`
*   **Custom Cypress Commands:** The project must have these custom commands defined:
    *   `cy.loginToAuth0()`: Programmatically logs in a user using Auth0 credentials.
    *   `cy.getBySel()`: Selects elements using a `data-test` attribute for stable tests.
*   **Backend Task:** A Cypress task named `db:seed` must be configured to reset the database to a known state before each test.

## Usage
This is a test file and is executed by the Cypress test runner. It is not intended to be imported or used in the application source code.

To run these tests, execute Cypress with the required environment variables.

**Example:**
```bash
npx cypress run --spec "cypress/e2e/auth0.spec.ts" \
  --env auth0_username=your_username,auth0_password=your_password
```

## Methods
This file defines a test suite with two specific test cases.

*   `describe('Auth0', ...)`
    The main test suite for all Auth0-related user flows. A `beforeEach` hook within this suite ensures that every test starts with a fresh database, a logged-in user, and the application loaded at the root page.

*   `it('should allow a visitor to login, onboard and logout', ...)`
    This test validates the full end-to-end lifecycle for a new user:
    1.  Login (handled by `beforeEach`).
    2.  Complete the multi-step onboarding process (creating a bank account).
    3.  Verify that the main application dashboard is visible.
    4.  Successfully log out, returning to the home page.

*   `it('shows onboarding', ...)`
    This test verifies that the custom `cy.loginToAuth0` command correctly caches the user's session. It confirms that the user is still logged in at the start of a new test without needing to perform the login steps again, immediately showing the "Get Started" onboarding prompt.

## Useful details
*   **Conditional Execution:** The entire test suite is wrapped in an `if (Cypress.env("auth0_username"))` block. This prevents the tests from running and failing in environments where Auth0 test credentials are not configured.
*   **Responsive UI Testing:** The test uses an `isMobile()` utility function to adapt the test steps for different screen sizes, specifically for locating the sign-out button inside a side navigation menu on mobile views.
*   **Stable Selectors:** The use of `cy.getBySel()` (which likely relies on `data-test` attributes) is a testing best practice that makes the tests more resilient to UI changes.