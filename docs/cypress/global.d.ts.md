# global.d.ts
## Overview
This file is a TypeScript declaration file that extends the functionality of the Cypress testing framework. It defines a set of custom commands and types tailored specifically for this project. The primary purpose is to create a more powerful and readable testing API, allowing tests to perform complex actions like logging in through various providers, interacting with custom UI components, and directly manipulating application state or the database.

By providing these high-level abstractions, this file helps create more robust, maintainable, and faster end-to-end tests by reducing boilerplate code and abstracting away implementation details.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Usage](#usage)
3. [Methods](#methods)
4. [Useful details](#useful-details)
## Prerequisites
This file is part of a testing setup that requires:
-   **TypeScript**: To enable type-checking and autocompletion for the custom commands.
-   **Cypress**: The end-to-end testing framework that is being extended.

These declarations are typically included in the project's `tsconfig.json` to be recognized globally across all test files.

## Usage
This file is not meant to be imported or instantiated directly. Once properly configured in the project's `tsconfig.json`, the custom commands defined here are automatically available on the global `cy` object within any Cypress test file.

**Example: Using a custom selector and login command**
```typescript
// In a test file like cypress/integration/login.spec.ts

describe('Login Flow', () => {
  it('should log in a user via an API call', () => {
    // Uses the custom `loginByApi` command
    cy.loginByApi('testuser', 'password123');
    
    // Uses the custom `getBySel` command for a more stable selector
    cy.getBySel('user-avatar').should('be.visible');
  });
});
```

## Methods
This file augments the Cypress `Chainable` interface with several categories of custom commands:

### Selector Helpers
-   `getBySel(dataTestAttribute)`: Finds an element by its `data-test` attribute, which is a best practice for creating stable test selectors.
-   `getBySelLike(dataTestPrefixAttribute)`: Finds elements whose `data-test` attribute starts with a given prefix.

### Authentication
-   A comprehensive suite of login commands for different authentication strategies:
    -   `login(username, password)`: Logs in through the user interface.
    -   `loginByApi(username, password)`: Bypasses the UI and logs in by making a direct API request, which is much faster.
    -   `loginByXstate(username)`: Bypasses the UI by interacting directly with the application's XState authentication machine.
    -   `loginByOkta()`, `loginByGoogleApi()`, `loginByCognito()`: Commands to handle various third-party and federated identity providers.
-   `logoutByXstate()`: Logs the user out by directly calling the state machine.

### Data and State Management
-   `database(operation, entity, query)`: A powerful command to query the test database directly. It can be used to set up test data or assert that data has been created correctly.
-   `createTransaction(payload)`: Bypasses the UI to create a new transaction, allowing for quick and reliable test setup.

### UI Interaction Helpers
-   `pickDateRange(startDate, endDate)`: A helper to interact with a custom date range picker component.
-   `setTransactionAmountRange(min, max)`: A helper to set values on a custom amount range slider.
-   `visualSnapshot(name)`: A wrapper for Percy visual regression testing, simplifying snapshot naming.

## Useful details
A key feature defined in this file is the `CustomWindow` interface. This type extends the standard browser `window` object to include direct access to the application's core XState services (`authService`, `createTransactionService`, etc.).

This allows tests to inspect or manipulate the application's state directly, which is invaluable for debugging and for setting up specific test scenarios that would be difficult to achieve through UI interaction alone.

**Example: Accessing a service from the window**
```typescript
cy.window().its('authService').then(authService => {
  // Now you can inspect the state of the auth machine
  const currentState = authService.state;
  console.log(currentState.value); 
});
```