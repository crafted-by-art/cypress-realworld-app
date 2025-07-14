**Test suite**: "Bank Accounts".  
**Purpose**: Tests bank account creation, validation errors, soft deletion, and empty list onboarding modal.  
**Key actions**:  
- Seeds database, logs in user, intercepts GraphQL ops.  
- Tests navigation to bank accounts page, creating a new account, input validations (name, routing, account numbers), and error displays.  
- Asserts UI updates after account deletion and handles empty list state, verifying onboarding dialog.  
**Keywords**: Cypress, bank accounts, GraphQL, validation, deletion, UI assertions, onboarding, form errors, notifications, intercept.  
**Fixtures/Mocks**: DB seed, user login, API intercepts.