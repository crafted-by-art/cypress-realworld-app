Feature: Bank Account Management
  The user should be able to manage their bank accounts through creating, viewing, and deleting accounts, with validation and onboarding support.

  Background:
    Given I am logged in
    And I am on the bank accounts page

  Scenario: Create a new bank account
    When I click on "Create" bank account
    And I enter bank name "The Best Bank"
    And I enter routing number "987654321"
    And I enter account number "123456789"
    And I submit the bank account form
    Then I should see a new bank account named "The Best Bank" in the accounts list

  Scenario Outline: Display validation errors in the bank account form
    When I click on "Create" bank account
    And I enter bank name "<bankName>"
    And I enter routing number "<routingNumber>"
    And I enter account number "<accountNumber>"
    And I submit the bank account form
    Then I should see the error message "<errorMessage>"

    Examples:
      | bankName      | routingNumber | accountNumber    | errorMessage                      |
      |               | 987654321     | 123456789        | Enter a bank name                 |
      | The           | 987654321     | 123456789        | Must contain at least 5 characters|
      | The Best Bank |               | 123456789        | Enter a valid bank routing number |
      | The Best Bank | 12345678      | 123456789        | Must contain a valid routing number|
      | The Best Bank | 987654321     |                  | Enter a valid bank account number |
      | The Best Bank | 987654321     | 12345678         | Must contain at least 9 digits    |
      | The Best Bank | 987654321     | 1234567891111    | Must contain no more than 12 digits|

  Scenario: Soft-delete a bank account
    Given I have a bank account named "To Delete Bank"
    When I choose to delete the bank account named "To Delete Bank"
    Then I should see that the account named "To Delete Bank" is marked as deleted in the list

  Scenario: Empty bank account list state and onboarding
    Given I have no bank accounts
    When I view the bank accounts page
    Then I should see the empty accounts message
    And I should see the user onboarding dialog
