Feature: Bank Accounts Management
  As a logged-in user
  I want to manage my bank accounts
  So that I can create, validate, delete, and view onboarding states for my bank accounts

  Background:
    Given the database is seeded
    And I am logged in as a valid user

  Scenario: Create a new bank account
    Given I am on the Bank Accounts page
    When I open the "New Bank Account" form
    And I enter bank name "The Best Bank"
    And I enter routing number "987654321"
    And I enter account number "123456789"
    And I submit the bank account form
    Then I see the bank account "The Best Bank" listed

  Scenario: Display validation errors for the bank account form
    Given I am on the Bank Accounts page
    When I open the "New Bank Account" form
    And I leave the bank name empty and blur the input
    Then I see the error message "Enter a bank name"
    When I enter bank name "The" and blur the input
    Then I see the error message "Must contain at least 5 characters"
    When I leave the routing number empty and blur the input
    Then I see the error message "Enter a valid bank routing number"
    When I enter routing number "12345678" and blur the input
    Then I see the error message "Must contain a valid routing number"
    When I enter routing number "123456789" and blur the input
    Then I should not see a routing number error message
    When I leave the account number empty and blur the input
    Then I see the error message "Enter a valid bank account number"
    When I enter account number "12345678" and blur the input
    Then I see the error message "Must contain at least 9 digits"
    When I enter account number "123456789" and blur the input
    Then I should not see an account number error message
    When I enter account number "123456789111" and blur the input
    Then I should not see an account number error message
    When I enter account number "1234567891111" and blur the input
    Then I see the error message "Must contain no more than 12 digits"
    Then the "Submit" button should be disabled

  Scenario: Soft delete a bank account
    Given I am on the Bank Accounts page
    When I delete the first bank account in the list
    Then I see the first bank account marked as "Deleted"

  Scenario: Show onboarding modal when there are no bank accounts
    Given the bank accounts API returns an empty list
    When I visit the Bank Accounts page
    Then I should not see a bank account list
    And I should see the message "No Bank Accounts"
    And the user onboarding dialog should be visible
    And the notifications count should be visible