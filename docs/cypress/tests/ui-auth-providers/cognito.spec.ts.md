# cognito.spec.ts

## Overview
The `cognito.spec.ts` file is a test suite designed for validating the login and onboarding functionality of a web application using AWS Cognito for authentication. It leverages Cypress—a popular end-to-end testing framework—to ensure that users can programmatically login, complete onboarding tasks, and logout successfully. The test suite handles both mobile and desktop contexts, safeguarding the app's functionality across different environments.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Usage](#usage)
3. [Methods](#methods)
4. [Useful details](#useful-details)

## Prerequisites
- Node.js and npm installed
- Cypress framework set up
- AWS Cognito credentials and environment variables defined (`cognito_username`, `cognito_password`, and `apiUrl`).
- Cypress configuration (`cypress.config.ts`) with an optional flag `cognito_programmatic_login` (`true` or `false`).

## Usage
To run the tests within the file, execute the following command from your project's root directory:
```bash
npx cypress run --spec 'path/to/cognito.spec.ts'
```
Ensure that your AWS Cognito credentials are correctly set in the environment.

## Methods
### describe(description, callback)
This is a Cypress function used to group related tests, each corresponding to a specific feature or functionality linked with the AWS Cognito login process.

### beforeEach(callback)
Sets up preconditions required for each test, such as seeding the database and programmatic login.

### it(description, callback)
Defines individual test cases within the suite. Each test validates a particular aspect of the onboarding and login flow.

#### cy.task("db:seed")
Seeds the testing database to ensure a consistent and controlled environment.

#### cy.intercept(url).as(alias)
Intercepts network requests, specifically the POST request to the GraphQL API for creating a bank account, allowing assertions to be made.

#### cy.loginByCognitoApi(username, password)
Performs programmatic login using the AWS Cognito API.

#### cy.loginByCognito(username, password)
Executes login via the user interface using AWS Cognito authentication.

#### cy.getBySel(selector)
Utility function for selecting components by a custom data attribute.

#### cy.getBySelLike(selector)
Selects components by partial matches on a custom data attribute.

#### cy.location(type).should(assertion)
Asserts that the URL path matches expectations post-logout.

## Useful details
- The test suite supports both programmatic and UI-driven login mechanisms using environment variables to toggle between them.
- It includes resilience for testing on mobile devices, adjusting visibility checks accordingly.
- The file relies on utility imports (`auth-provider-commands/cognito` and `utils`) for extended functionality, ensuring streamlined and reusable commands throughout the test suite.