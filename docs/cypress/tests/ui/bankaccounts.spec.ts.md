This Cypress test suite validates bank account management. A `beforeEach` hook seeds the database, logs in a user, and uses `cy.intercept()` to alias GraphQL operations like `CreateBankAccountMutation`.

Tests perform the following actions and assertions:
1.  **Create:** Navigates to the new account form, types in valid details, submits, waits for the GraphQL mutation, and asserts the new account appears in the list.
2.  **Form Validation:** Triggers and asserts specific error messages for invalid bank name, routing, and account number inputs.
3.  **Delete:** Clicks delete and asserts the item is marked "Deleted".
4.  **Empty State:** Mocks an empty list response and asserts the onboarding modal appears.

*   **Keywords:** Bank Accounts, GraphQL, Form Validation, Create, Delete, cy.intercept, Visual Regression, Empty State