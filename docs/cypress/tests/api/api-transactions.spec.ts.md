```markdown
# api-transactions.spec.ts
## Overview
This file is a test specification for the Transactions API feature of a larger application, possibly a financial application that handles payments and requests between users. It includes various end-to-end test cases written using Cypress to validate the API's behavior, such as listing transactions, creating payments or requests, and updating transaction statuses.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Usage](#usage)
3. [Methods](#methods)
4. [Useful details](#useful-details)

## Prerequisites
- Cypress
- "@faker-js/faker" for generating random financial amounts.
- Lodash FP (lodash/fp) for functional programming utilities.
- The application should have database tasks set up (e.g., `cy.task("db:seed")`, etc.).
- `Cypress.env()` should be configured with an "apiUrl" variable pointing to the API endpoint.

## Usage
To utilize this file in a testing suite:
- Ensure the application backend is running and accessible at the specified API URL.
- Install Cypress and its dependencies in the project.
- Run Cypress tests using a command like `npx cypress run` or through the Cypress UI.

## Methods
### isSenderOrReceiver
- **Description**: Determines if the authenticated user is either the sender or receiver of a transaction.
- **Parameters**:
  - `senderId`: ID of the sender.
  - `receiverId`: ID of the receiver.
- **Returns**: Boolean indicating if the user is involved in the transaction.

### (Various Cypress Test Methods)
- **GET /transactions**: Retrieves a list of transactions, with optional query params for filtering by request status or date range.
- **GET /transactions/contacts**: Retrieves transactions related to a user's contacts.
- **GET /transactions/public**: Retrieves a list of public transactions.
- **POST /transactions**: Creates a new transaction (either a payment or request) for the authenticated user.
- **PATCH /transactions/:transactionId**: Updates an existing transaction, commonly changing the request status.

## Useful details
- Test context (`ctx`) is used to maintain test states such as the authenticated user, transaction ID, etc.
- Tests assume the database is seeded with initial data before execution.
- API interactions are conducted through Cypress's `cy.request()` method, simulating real user requests.
- Error handling and status verification are prioritized to ensure each API endpoint behaves as expected.
```
