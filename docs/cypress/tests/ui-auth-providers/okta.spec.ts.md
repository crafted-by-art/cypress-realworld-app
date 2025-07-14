This file contains Cypress tests for **Okta authentication**, with two distinct flows controlled by an environment variable.

The primary flow tests a full user journey: programmatic API login, completing the multi-step onboarding wizard by creating a bank account, and finally logging out. It uses `cy.intercept()` to wait for the bank account POST request.

The alternative flow tests a standard UI login, then verifies that a new user sees empty state messages for their bank accounts and notifications. Both flows use a `cy.task("db:seed")` command to reset the database before each test.

**Keywords:** Okta, login, authentication, onboarding, bank account, `cy.intercept`, `db:seed`, programmatic login, user flow.