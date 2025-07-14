# notifications.spec.ts
## Overview
This file contains end-to-end tests for the application's notification system, written using the Cypress testing framework. The primary purpose is to verify that users correctly receive notifications for relevant events (like payment requests) and that the notifications UI handles different states gracefully, such as when there are no notifications to display.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Usage](#usage)
3. [Test Scenarios](#methods)
4. [Useful details](#properties)

## Prerequisites
*   **Cypress**: The core testing framework used to write and run the tests.
*   **Running Application Instance**: The tests are executed against a live, running instance of the web application.
*   **Custom Cypress Commands**: The project must have custom commands defined, such as:
    *   `cy.loginByXstate()`: Handles user authentication.
    *   `cy.switchUserByXstate()`: Simulates switching between active users.
    *   `cy.getBySel()` / `cy.getBySelLike()`: Selectors for DOM elements, likely using `data-test` attributes for robust testing.
*   **Visual Snapshot Plugin**: A Cypress plugin for visual regression testing (e.g., `cypress-image-snapshot`) is required for `cy.visualSnapshot()` to work.

## Usage
These tests are typically run via the Cypress Test Runner as part of the development and CI/CD process. To execute this specific test file from the command line, navigate to the project root and run:

```bash
npx cypress run --spec "cypress/e2e/notifications.spec.ts"
```

## Test Scenarios
This file defines the following key test scenarios:

*   **`sends a payment request notification`**: This test validates the end-to-end notification flow. It simulates one user requesting a payment from another and asserts that a third, related user receives the correct notification about the transaction. This ensures the backend logic and frontend display for notifications are working in sync.

    ```typescript
    it("sends a payment request notification", function () {
      // ... User A requests payment from User B
      
      // Switch to User C to check for notification
      cy.switchUserByXstate(ctx.userC.username);

      cy.getBySelLike("notifications-link").click();
      cy.getBySelLike("notification-list-item")
        .should("contain", ctx.userA.firstName)
        .and("contain", "requested payment");
    });
    ```

*   **`renders an empty notifications state`**: This test ensures the UI provides a good user experience when a user has no notifications. It uses `cy.intercept()` to mock an API response, forcing an empty state, and then verifies that a "No Notifications" message is displayed instead of an empty list.

    ```typescript
    it("renders an empty notifications state", function () {
      cy.intercept("GET", "/notifications", []).as("notifications");

      cy.loginByXstate(ctx.userA.username);
      
      cy.getBySel("sidenav-notifications").click();
      cy.getBySel("empty-list-header").should("contain", "No Notifications");
    });
    ```

## Useful details
*   **Visual Regression Testing**: The use of `cy.visualSnapshot()` indicates that the project performs visual regression testing. This captures screenshots of UI components and compares them against baseline images to detect unintended visual changes.
*   **API Mocking**: The test for the empty state demonstrates the use of `cy.intercept()` to control API responses. This is a powerful technique for testing specific UI states without needing to manipulate backend data.
*   **Test Selectors**: The custom commands `cy.getBySel` and `cy.getBySelLike` suggest the project follows the best practice of using `data-test` attributes on HTML elements for more resilient tests that are decoupled from CSS classes or DOM structure.