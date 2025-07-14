This file defines two Cypress custom commands for AWS Cognito authentication. The `loginByCognitoApi` command programmatically authenticates by fetching JWTs via the AWS Amplify API and setting them in `localStorage` to bypass the UI. The `loginByCognito` command automates the UI login flow within a cached `cy.session`, using `cy.origin` to interact with the Cognito domain. It types credentials into input fields, clicks the sign-in button, and asserts successful login.

*   **Test Suite Title:** Amazon Cognito Authentication
*   **Key Commands:** `Cypress.Commands.add`, `localStorage.setItem`, `cy.session`, `cy.origin`, `cy.get`, `cy.type`, `cy.click`
*   **Keywords:** Cognito, authentication, custom command, JWT, session, API login, UI login, AWS Amplify