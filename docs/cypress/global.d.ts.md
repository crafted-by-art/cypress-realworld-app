```markdown
# global.d.ts

## Overview
The `global.d.ts` file is a TypeScript declaration file designed for a Cypress testing environment. It extends the Cypress namespace with custom commands and typings to facilitate complex testing scenarios in a web application. The file integrates various services and models to support comprehensive testing, particularly in authentication and transaction management within the application.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Usage](#usage)
3. [Methods](#methods)
4. [Useful Details](#useful-details)

## Prerequisites
- Cypress should be installed and properly set up in the project.
- The project dependencies such as `authMachine`, `createTransactionMachine`, etc., should be properly implemented and accessible from their respective paths.

## Usage
To utilize the custom Cypress commands and types defined in this file, ensure your Cypress test files include a reference to this declaration. You can then directly use the extended Cypress API in your tests to perform actions like logging in, creating transactions, or fetching user data.

Example:
```typescript
cy.loginByApi('testuser', 'password123').then((response) => {
  expect(response.status).to.eq(200);
});
cy.createTransaction({ amount: 100, description: 'Test Transaction' });
```

## Methods
- **window(options?)**: Accesses the `window` object with added properties for test interaction.
- **visualSnapshot(maybeName?)**: Captures a Percy snapshot for visual testing.
- **getBySel(dataTestAttribute, args?)**: Finds an element by its `data-test` attribute.
- **database(operation, entity, query?, log?)**: Performs database operations (find/filter) within tests.
- **login(username, password, loginOptions?)**: Logs in a user via UI.
- **loginByApi(username, password?)**: Logs in a user using an API call.
- **createTransaction(payload)**: Initiates a transaction bypassing the UI using the XState service.
- **logoutByXstate()**: Logs out via XState event without using UI.
- ...and other login/logout methods for different services like Google, Okta, Cognito, etc.

## Useful Details
- This file incorporates complex integration of various authentication mechanisms (OKTA, Google, AWS Cognito), which allows tests to bypass the UI layer.
- The database utility methods enable direct interaction with the database, which is crucial for setting up preconditions or verifying post-conditions in end-to-end tests.
- The integration with XState machines allows for more controlled test flows by programmatically handling application states.
```