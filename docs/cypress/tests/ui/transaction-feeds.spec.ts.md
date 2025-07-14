# transaction-feeds.spec.ts
## Overview
This file contains Cypress end-to-end tests for the transaction feeds feature. Its primary purpose is to verify that users can correctly view and filter transactions based on different criteria like date ranges, amount ranges, and feed types (e.g., Public, Friends, Mine). These tests ensure the reliability and correctness of the transaction list's UI and its underlying logic.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Usage](#usage)
3. [Test Suites](#methods)
4. [Useful details](#properties)

## Prerequisites
This test suite relies on the following:
*   **Cypress:** The core end-to-end testing framework.
*   **Lodash (`_`)**: Used for iterating through different feed types to run the same tests on each.
*   **Custom Cypress Commands**: The project must have custom commands defined, such as:
    *   `cy.database()`: To interact with the test database.
    *   `cy.pickDateRange()`: A helper to select a date range in the UI.
    *   `cy.setTransactionAmountRange()`: A helper to set the amount filter.
    *   `cy.getBySelLike()`: A selector utility for finding elements by `data-test` attributes.
    *   `cy.visualSnapshot()`: For visual regression testing (e.g., via Applitools or Percy).

## Usage
This file is not intended for direct import but is executed by the Cypress test runner. To run these tests, you would typically use a command from your project's root directory.

**Example command to run the tests:**
```bash
npx cypress run --spec "cypress/e2e/transaction-feeds.spec.ts"
```

## Methods
This file is structured into several test suites using `describe` blocks, each focusing on a specific piece of functionality.

### `filters transaction feeds by date range`
This suite verifies the date range filtering functionality.
*   It confirms that when a date range is selected, only transactions created within that interval are displayed.
*   It checks that an appropriate message is shown when no transactions match the selected range.
*   It ensures that clearing the date filter restores the original, unfiltered list of transactions.

### `filters transaction feeds by amount range`
This suite tests the amount range filter.
*   It asserts that the transaction list correctly filters to show only transactions with amounts within the specified min/max values.
*   It verifies that the correct URL query parameters (`amountMin`, `amountMax`) are sent in the API request.
*   It checks that clearing the amount filter restores the full transaction list.

### `Feed Item Visibility`
This suite ensures that each transaction feed displays the correct data based on user context.
*   **Mine Feed**: Verifies this feed only contains transactions where the current user is either the sender or receiver.
*   **Public Feed**: Checks that the initial items in the feed are relevant to the user's contacts.
*   **Friends Feed**: Confirms this feed exclusively shows transactions involving the user's contacts.

## Useful details
*   **Visual Regression Testing**: The suite uses `cy.visualSnapshot()` to capture and compare screenshots of the UI. This helps detect unintended visual changes in the transaction list and filter components.
*   **Network Interception**: Tests intercept API calls (e.g., `cy.wait('@publicTransactions')`) to validate the data returned from the server and assert against the rendered UI. This makes tests faster and more reliable.
*   **Data-Driven Tests**: The tests for date and amount filtering use `_.each` to iterate over different feed configurations (`feedViews`). This approach reduces code duplication and ensures consistent test coverage across all feed types.
*   **Resilient Selectors**: The use of `cy.getBySelLike()` for selecting elements via `data-test` attributes is a best practice that makes tests less likely to break due to cosmetic changes in CSS or HTML structure.