# commands.ts
## Overview
This file defines a set of custom Cypress commands. These commands encapsulate common, reusable actions to simplify test script creation and improve maintainability. They provide high-level abstractions for complex operations such as programmatic authentication, direct database interaction, and intricate UI manipulations like date range selection.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Usage](#usage)
3. [Methods](#methods)
4. [Useful details](#properties)
## Prerequisites
- **Cypress**: This file is intended for use within a Cypress E2E testing environment.
- **Cypress Environment Variables**: The `loginByGoogleApi` command requires the following environment variables to be set in `cypress.env.json` or through the shell:
  - `googleClientId`
  - `googleClientSecret`
  - `googleRefreshToken`
- **Cypress Tasks**: The `database` command relies on a corresponding `cy.task()` setup in the project's Cypress configuration file (e.g., `cypress.config.ts`) to handle backend database operations.

## Usage
These commands are available on the global `cy` object within any Cypress test file.

**Example: Logging in and querying the database in a test**
```typescript
describe("User Dashboard", () => {
  beforeEach(() => {
    // Log in programmatically before each test
    cy.loginByGoogleApi();
  });

  it("should display user-specific data", () => {
    // Fetch data directly from the DB to verify the UI
    cy.database("find", "posts", { author: "testuser@example.com" })
      .then((posts) => {
        cy.contains(`You have ${posts.length} posts.`).should("be.visible");
      });
  });
});
```

The date selection logic shown is part of a larger, likely custom command for interacting with a calendar component. For example, if it were named `selectDateRange`:
```typescript
it("filters transactions by a date range", () => {
  const start = new Date("2023-01-01");
  const end = new Date("2023-01-31");
  cy.selectDateRange(start, end);
  // ... assertions to verify the filter worked
});
```

## Methods
| Command | Parameters | Description |
| :--- | :--- | :--- |
| `selectDateRange` | `startDate: Date`, `endDate: Date` | *(Conceptual)* Interacts with a calendar UI to select a specific start and end date. It sets the system clock to ensure the calendar opens at the correct initial view. |
| `database` | `operation: string`, `entity: string`, `query: object`, `logTask: boolean = false` | Executes a database operation via a `cy.task()`. This allows tests to set up state or assert against data directly in the database. The `operation` could be 'find', 'seed', 'create', etc. |
| `loginByGoogleApi` | *(none)* | Performs a programmatic login using the Google OAuth2 API. It fetches an access token and user info, then stores session data in `localStorage` to authenticate the user in the application, bypassing the UI login form. |

## Useful details
- **Programmatic Login**: `loginByGoogleApi` is a crucial performance optimization for test suites. It avoids the slow and brittle process of interacting with the UI for every test that requires an authenticated user.
- **Database Interaction**: The `database` command is a powerful tool for test data management. It can be used to seed the database with a specific state before a test runs or to verify that an action in the UI resulted in the correct data changes in the backend.
- **Robust Selectors**: The code uses `cy.getBySelLike`, suggesting the project follows the best practice of using dedicated `data-cy` or `data-test` attributes for test selectors, making tests less fragile to UI code changes.