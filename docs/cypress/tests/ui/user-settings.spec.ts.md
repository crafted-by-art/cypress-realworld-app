# user-settings.spec.ts
## Overview
This file contains end-to-end (E2E) tests for the "User Settings" feature of the application, written using the Cypress testing framework. Its primary purpose is to simulate real user interactions with the user settings page to ensure its functionality is correct. The tests cover rendering the form, validating user input, and successfully submitting profile updates.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Usage](#usage)
3. [Test Scenarios](#methods)
4. [Useful details](#properties)

## Prerequisites
This test suite relies on the [Cypress](https://www.cypress.io/) testing framework. It also utilizes several custom commands and configurations defined within the project's `cypress/support` directory:
- `cy.task("db:seed")`: A task to reset the database to a known state.
- `cy.loginByXstate()`: A custom command to programmatically log in a user.
- `cy.getBySel()`: A selector utility for querying elements by `data-test` attributes.
- `cy.visualSnapshot()`: A command for visual regression testing.
- `isMobile()`: A utility function to check if the test is running in a mobile viewport.

## Usage
These tests are executed via the Cypress test runner. Ensure the application and its backend are running before initiating the tests.

To run the tests in interactive mode:
```bash
npx cypress open
```
Then select `user-settings.spec.ts` from the list.

To run the tests in headless mode:
```bash
npx cypress run --spec "cypress/e2e/user/user-settings.spec.ts"
```

## Test Scenarios
The test suite is structured with a `beforeEach` hook to set up a consistent state for each test, followed by individual test cases (`it` blocks).

### `beforeEach()` hook
This setup function runs before each test case. It performs the following actions:
1.  Seeds the database to ensure a clean and predictable state.
2.  Intercepts API calls (`PATCH /users/*` and `GET /notifications*`) to allow for later assertions on network requests.
3.  Fetches a user from the database and logs them in.
4.  Navigates to the "User Settings" page from the main application dashboard.

### `it("renders the user settings form", ...)`
This test verifies that the user settings page loads correctly after navigation. It asserts that the form is visible and the URL is correct. It also captures a visual snapshot for regression testing.

### `it("should display user setting form errors", ...)`
This test validates the form's error handling. It systematically triggers validation errors for each input field (First Name, Last Name, Email, Phone Number) by entering invalid data or clearing the field. It then asserts that the appropriate error messages are displayed and that the "Save" button is disabled.

```typescript
// Example: Triggering and asserting an email validation error
cy.getBySelLike("email-input").type("abc@bob.");
cy.getBySelLike("email-input").blur();
cy.get("#user-settings-email-input-helper-text")
  .should("be.visible")
  .and("contain", "Must contain a valid email address");
```

### `it("updates first name, last name, email and phone number", ...)`
This test covers the "happy path" scenario where a user successfully updates their profile. It fills the form with valid data, clicks the "Save" button, and verifies that the update was successful by checking two things:
1.  The `PATCH /users/*` API call returns a successful status code (204).
2.  The user's full name is updated in the application's side navigation bar.

```typescript
// Example: Submitting the form and waiting for the API response
cy.getBySelLike("submit").click();
cy.wait("@updateUser").its("response.statusCode").should("equal", 204);
```

## Useful details
-   **Test Isolation**: The use of `cy.task("db:seed")` in the `beforeEach` hook is critical for ensuring that tests are independent and do not interfere with each other.
-   **API Interception**: `cy.intercept()` is used to spy on network requests. This allows tests to confirm that the frontend is correctly communicating with the backend without needing to query the database to verify the outcome.
-   **Visual Regression**: The `cy.visualSnapshot()` command captures images of the UI, allowing the team to detect unintended visual changes between test runs, which is crucial for maintaining a consistent user experience.
-   **Responsive Testing**: The `isMobile()` check demonstrates that the test suite is designed to accommodate and verify behavior on different screen sizes (desktop and mobile).