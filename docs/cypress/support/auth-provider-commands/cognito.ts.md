```markdown
# cognito.ts

## Overview
The `cognito.ts` file is designed to manage user authentication using AWS Cognito within a Cypress testing environment. It sets up custom Cypress commands to facilitate login using Cognito's API and browser-based authentication flow. This file is crucial for enabling automated end-to-end tests of applications that rely on Cognito for user authentication without manual intervention.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Usage](#usage)
3. [Methods](#methods)
4. [Useful details](#useful-details)

## Prerequisites
To use this file, ensure the following dependencies are installed:
- `aws-amplify`: A library for working with AWS services including Cognito. Make sure it is properly configured with your AWS environment.
  - Version information can be managed in your `package.json`.
- `Cypress`: A JavaScript end-to-end testing framework.
  - Ensure `Cypress.env("awsConfig")` and `Cypress.env("cognito_domain")` are set up to match your AWS Cognito configuration.

## Usage
To incorporate this functionality in your project, utilize the custom commands provided in `cognito.ts` within your Cypress tests:
```javascript
Cypress.Commands.add("loginByCognitoApi", (username, password) => {
  // login code details
});

Cypress.Commands.add("loginByCognito", (username, password) => {
  // login code details
});
```
Utilize these commands in your test suites:
```javascript
// Example usage:
describe('My Application Tests', () => {
  it('should authenticate using Cognito API', () => {
    cy.loginByCognitoApi('myUsername', 'myPassword');
    // Further test actions
  });

  it('should authenticate using Cognito UI', () => {
    cy.loginByCognito('myUsername', 'myPassword');
    // Further test actions
  });
});
```

## Methods

### `fetchJwts(username: string, password: string): Promise<JwtResponse>`
Authenticates with AWS Cognito using the provided username and password. It returns JW Tokens for use in further validation and interaction.
#### Parameters:
- `username`: The username for Cognito authentication.
- `password`: The password corresponding to the username.

### `Cypress.Commands.add("loginByCognitoApi", …)`
Adds a Cypress command for programmatically logging in via Cognito's API.
#### Parameters:
- `username`: The user's username.
- `password`: The user's password.

### `Cypress.Commands.add("loginByCognito", …)`
Adds a Cypress command for logging in using Cognito's UI flow.
#### Parameters:
- `username`: The user's username.
- `password`: The user's password.

## Useful details
- AWS Cognito authentication flow can be problematic when UI has elements with similar identifiers. `loginByCognito` command uses `:visible` selector to ensure only visible elements are interacted with.
- `loginByCognitoApi` is particularly useful for testing API interactions programmatically without UI interference.
- Ensure AWS configuration is properly set in `Cypress.env()` for seamless operation with your Cognito setup.
- Session validation in UI-based login checks for post-login navigation like "Get Started" screens to ensure successful authentication.

```