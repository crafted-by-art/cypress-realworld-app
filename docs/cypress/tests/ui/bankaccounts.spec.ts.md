```markdown
# bankaccounts.spec.ts

## Overview
This test file `bankaccounts.spec.ts` is part of a testing framework implemented using Cypress, designed to automate the testing of functionalities related to bank accounts in a web application. It ensures that creation, validation of bank account forms, soft deletion, and onboarding processes are functioning correctly.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Usage](#usage)
3. [Methods](#methods)
4. [Useful details](#useful-details)

## Prerequisites
- Cypress installed and configured.
- The application running with an endpoint specified: `apiUrl` for the GraphQL API.
- Access to a seeded database (`db:seed` task) and authentication facilities (`cy.loginByXstate`).

## Usage
Integrate this file into a Cypress testing suite to run comprehensive checks on the bank accounts' functionalities in your web app. The tests cover:
- Bank account creation and validation of input fields.
- Soft deletion of bank accounts.
- Rendering of bank account-related UI components and onboarding dialogs.

Example command for running tests:
```bash
npx cypress run --spec path/to/tests/bankaccounts.spec.ts
```

## Methods
- **beforeEach**: Sets up the initial environment, including seeding the database, intercepting network requests, and logging in a test user.
  
- **it("creates a new bank account")**: Tests the creation of a new bank account, validates navigation and form completion.

- **it("should display bank account form errors")**: Validates error messages and input restrictions on the bank account form, such as min-max length of routing and account numbers.
  
- **it("soft deletes a bank account")**: Verifies the soft deletion process of an existing bank account.
  
- **it("renders an empty bank account list state with onboarding modal")**: Tests the UI state when there are no bank accounts, asserting the onboarding modal is visible.

## Useful details
- The file uses Cypress aliases and snapshots for polished test assertions and readability.
- Network interception allows the simulation of API responses for various operations like listing, creating, and deleting bank accounts.
- Form validation tests include checking required fields, character lengths, and error messages.
- UI components are tested using custom selectors defined by `getBySel` and `getBySelLike`.
```