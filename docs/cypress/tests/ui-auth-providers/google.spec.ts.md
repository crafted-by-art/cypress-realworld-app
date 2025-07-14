```markdown
# google.spec.ts

## Overview
The `google.spec.ts` file is a test specification written for Cypress, primarily focused on testing Google-based authentication and user onboarding flows. The file contains automated tests to ensure that users can log in using Google, proceed through an onboarding process to create a bank account, and subsequently log out. This testing file plays a crucial role in ensuring the application's authentication and onboarding processes function correctly.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Usage](#usage)
3. [Methods](#methods)
4. [Useful details](#useful-details)

## Prerequisites
To work with this file, ensure the following dependencies are available in your project:
- Cypress installed and configured in the project.
- Google Client ID set in the Cypress environment variables (`Cypress.env("googleClientId")`).
- Utilities function `isMobile` imported from `../../support/utils`.
- A custom Cypress command `cy.loginByGoogleApi` for logging in via Google API.
- Application backend ability to reset database state with `cy.task("db:seed")`.

## Usage
To utilize this test file within the project:
1. Ensure all prerequisites are met.
2. Execute the Cypress test runner using the command:
   ```bash
   npx cypress open
   ```
3. In the Cypress test runner interface, select and run the `google.spec.ts` test file.

## Methods
This test file includes the following primary test functions:
- **beforeEach()**: Setup function to reset the database and intercept network requests to `/bankAccounts`. Logs in the user using `cy.loginByGoogleApi`.
- **it("should allow a visitor to login, onboard and logout")**: Tests the entire login, onboarding, and logout flow.
  - Verifies visibility and interaction with onboarding dialogs.
  - Mocks submission and waits for bank account creation.
  - Completes onboarding and logs out the user.
- **it("shows onboarding")**: Confirms initial onboarding state by verifying "Get Started" visibility.

## Useful details
- **Custom Commands**: Utilize Cypress custom commands like `cy.loginByGoogleApi` and `cy.getBySel` to streamline specific actions.
- **Conditional Logic**: Includes mobile view handling with the `isMobile` utility function for responsive design testing.
- **Network Interception**: Uses `cy.intercept` to manage network calls during testing, ensuring isolated test environments.
```