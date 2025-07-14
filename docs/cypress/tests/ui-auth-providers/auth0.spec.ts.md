This Cypress test file, `auth0.spec.ts`, validates the user authentication and onboarding flow using Auth0 credentials from environment variables.

*   **Test Suite:** "Auth0"
*   **Purpose:** It performs an end-to-end test where a user logs in programmatically, completes a multi-step bank account creation form during onboarding, and then logs out. It also verifies that the login session is cached between tests.
*   **Key Commands:** `cy.loginToAuth0`, `cy.task("db:seed")`, `cy.intercept()`, `cy.getBySel()`, `cy.type()`, `cy.click()`.
*   **Fixtures:** Uses a `db:seed` task to reset state.
*   **Keywords:** Auth0, login, logout, onboarding, bank account, user session, authentication, form submission, GraphQL.