Feature: Bank Account Management
  As a user
  I want to manage my bank accounts
  So that I can make transactions in the app

  Background:
    Given I am a logged in user
    And I navigate to the bank accounts page

  Scenario: Creating a new bank account successfully
    When I click the create bank account button
    And I am on the new bank account form
    And I fill in the bank details with:
      | Bank Name      | Routing Number | Account Number |
      | The Best Bank  | 987654321      | 123456789      |
    And I submit the new bank account form
    Then I see the account "The Best Bank" in my list of bank accounts

  Scenario: Displaying form errors for invalid bank account input
    When I click the create bank account button
    And I am on the new bank account form
    And I leave the bank name field empty and blur
    Then I should see the bank name required error
    When I enter a short bank name "The" and blur
    Then I should see the bank name minimum length error
    When I leave the routing number field empty and blur
    Then I should see the routing number required error
    When I enter an invalid routing number "12345678" and blur
    Then I should see the routing number validation error
    When I leave the account number field empty and blur
    Then I should see the account number required error
    When I enter a short account number "12345678" and blur
    Then I should see the account number minimum length error
    When I enter a long account number "1234567891111" and blur
    Then I should see the account number maximum length error
    Then the submit bank account button should be disabled

  Scenario: Soft-deleting a bank account from the list
    When I soft-delete the first bank account in the list
    Then the bank account is marked as deleted

  Scenario: Empty bank account state and onboarding modal
    Given I have no bank accounts
    When I visit the bank accounts page
    Then I should see a message "No Bank Accounts"
    And I should see the onboarding modal
