Feature: Manage Bank Accounts
  As a user
  I want to manage my bank accounts
  So that I can add, validate, and delete accounts securely

  Background:
    Given the database is seeded
    And I am logged in
    And I navigate to the bank accounts page

  Scenario: Creating a new bank account
    When I click on the "Create" bank account button
    And I fill in the bank name with "Test Bank"
    And I fill in the routing number with "123456789"
    And I fill in the account number with "123456789"
    And I submit the bank account form
    Then I see the new bank account "Test Bank" in the accounts list

  Scenario: Displaying bank account form validation errors
    When I click on the "Create" bank account button
    And I blur the bank name input
    Then I should see the bank name required error
    When I fill in the bank name with "The"
    And I blur the bank name input
    Then I should see a minimum length error for bank name
    When I blur the routing number input
    Then I should see the routing number required error
    When I fill in the routing number with "1234"
    And I blur the routing number input
    Then I should see an invalid length error for routing number
    When I blur the account number input
    Then I should see the account number required error
    When I fill in the account number with "12"
    And I blur the account number input
    Then I should see an invalid account number length error
    Then the bank account form submit button should be disabled

  Scenario: Deleting a bank account
    When I click the delete button for the bank account named "Test Bank"
    Then I should see the bank account "Test Bank" marked as deleted in the accounts list

  Scenario: Empty state when no bank accounts exist
    Given there are no bank accounts in the system
    When I navigate to the bank accounts page
    Then I should see the onboarding dialog for adding a new bank account
    And I should see a message indicating no bank accounts are available