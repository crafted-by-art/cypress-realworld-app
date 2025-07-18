Feature: Bank Account Management

  Background:
    Given a user exists and is authenticated
    And the database is seeded with the default data
    And the user navigates to the Bank Accounts page
    And network requests for bank accounts and notifications are intercepted

  Scenario: Create a new bank account
    When the user clicks the new bank account button
    And the user enters bank name "Acme Bank" on the bank account form
    And the user enters routing number "123456789" on the bank account form
    And the user enters account number "987654321" on the bank account form
    And the user submits the bank account form
    Then the new bank account "Acme Bank" should appear in the bank account list
    And a visual snapshot of the bank account list is captured

  Scenario Outline: Validate required fields during bank account creation
    When the user clicks the new bank account button
    And the user enters bank name "<BankName>" on the bank account form
    And the user enters routing number "<RoutingNumber>" on the bank account form
    And the user enters account number "<AccountNumber>" on the bank account form
    And the user submits the bank account form
    Then the error message "<ErrorMessage>" is displayed for the field "<Field>"
    And the create bank account submit button is disabled

    Examples:
      | BankName     | RoutingNumber | AccountNumber | Field         | ErrorMessage                  |
      |              | 123456789     | 987654321     | bankName      | Enter a bank name             |
      | Acme Bank    | 123           | 987654321     | routingNumber | Must contain 9 digits         |
      | Acme Bank    | 123456789     | 123           | accountNumber | Must contain at least 9 digits|

  Scenario: Soft delete a bank account
    Given there are one or more existing bank accounts
    When the user clicks the delete button for bank account "Acme Bank"
    Then the bank account "Acme Bank" should appear as deleted in the bank account list
    And a visual snapshot of the bank account list is captured

  Scenario: Onboarding modal and empty state for bank accounts
    Given the backend is mocked to return no bank accounts
    When the user navigates to the Bank Accounts page
    Then the onboarding modal should be displayed
    And the bank account empty list message should be visible
    And a visual snapshot of the onboarding state is captured
