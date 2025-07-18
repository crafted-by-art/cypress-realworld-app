import { Given, When, Then, Before, setDefaultTimeout, World, TableDefinition } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { BankAccountsPage } from '../pageObjects/BankAccountsPage';
import { BankAccountForm } from '../pageObjects/BankAccountForm';

setDefaultTimeout(60 * 1000);

Before(async function(this: World) {
  // Assuming a custom `this.api` and `this.login` are defined in a common world constructor or hooks
  // For now, we'll placeholder these calls
});

Given('I am a logged in user', async function(this: World) {
  // Placeholder for login logic
});

Given('I navigate to the bank accounts page', async function(this: World) {
  this.bankAccountsPage = new BankAccountsPage(this.page);
  await this.bankAccountsPage.goto();
  await this.page.waitForResponse(r => r.url().includes('/notifications') && r.status() === 200);
});

When('I click the create bank account button', async function(this: World) {
  await this.bankAccountsPage.openCreateForm();
});

When('I am on the new bank account form', async function(this: World) {
  this.bankAccountForm = new BankAccountForm(this.page);
  await expect(this.bankAccountForm.submitButton).toBeVisible();
});

When('I fill in the bank details with:', async function(this: World, table: TableDefinition) {
  const [{ 'Bank Name': bankName, 'Routing Number': routingNumber, 'Account Number': accountNumber }] = table.hashes();
  await this.bankAccountForm.fillField('bankName', bankName);
  await this.bankAccountForm.fillField('routingNumber', routingNumber);
  await this.bankAccountForm.fillField('accountNumber', accountNumber);
});

When('I submit the new bank account form', async function(this: World) {
  const [response] = await Promise.all([
    this.page.waitForResponse(resp =>
      resp.url().includes('/graphql') &&
      resp.request().postData()?.includes('CreateBankAccount') &&
      resp.status() === 200
    ),
    this.bankAccountForm.submit()
  ]);
  expect(response.ok()).toBeTruthy();
});

Then('I see the account {string} in my list of bank accounts', async function(this: World, bankName: string) {
  await this.bankAccountsPage.expectAccountVisible(bankName);
});

When('I leave the bank name field empty and blur', async function(this: World) {
  await this.bankAccountForm.leaveFieldEmpty('bankName');
});

Then('I should see the bank name required error', async function(this: World) {
  await expect(this.page.locator('#bankaccount-bankName-input-helper-text')).toBeVisible();
  await expect(this.page.locator('#bankaccount-bankName-input-helper-text')).toHaveText(/Enter a bank name/);
});

When('I enter a short bank name {string} and blur', async function(this: World, value: string) {
  await this.bankAccountForm.fillField('bankName', value);
});

Then('I should see the bank name minimum length error', async function(this: World) {
  await expect(this.page.locator('#bankaccount-bankName-input-helper-text')).toBeVisible();
  await expect(this.page.locator('#bankaccount-bankName-input-helper-text')).toHaveText(/Must contain at least 5 characters/);
});

When('I leave the routing number field empty and blur', async function(this: World) {
  await this.bankAccountForm.leaveFieldEmpty('routingNumber');
});

Then('I should see the routing number required error', async function(this: World) {
  await expect(this.page.locator('#bankaccount-routingNumber-input-helper-text')).toBeVisible();
  await expect(this.page.locator('#bankaccount-routingNumber-input-helper-text')).toHaveText(/Enter a valid bank routing number/);
});

When('I enter an invalid routing number {string} and blur', async function(this: World, value: string) {
  await this.bankAccountForm.fillField('routingNumber', value);
});

Then('I should see the routing number validation error', async function(this: World) {
  await expect(this.page.locator('#bankaccount-routingNumber-input-helper-text')).toBeVisible();
  await expect(this.page.locator('#bankaccount-routingNumber-input-helper-text')).toHaveText(/Must contain a valid routing number/);
});

When('I leave the account number field empty and blur', async function(this: World) {
  await this.bankAccountForm.leaveFieldEmpty('accountNumber');
});

Then('I should see the account number required error', async function(this: World) {
  await expect(this.page.locator('#bankaccount-accountNumber-input-helper-text')).toBeVisible();
  await expect(this.page.locator('#bankaccount-accountNumber-input-helper-text')).toHaveText(/Enter a valid bank account number/);
});

When('I enter a short account number {string} and blur', async function(this: World, value: string) {
  await this.bankAccountForm.fillField('accountNumber', value);
});

Then('I should see the account number minimum length error', async function(this: World) {
  await expect(this.page.locator('#bankaccount-accountNumber-input-helper-text')).toBeVisible();
  await expect(this.page.locator('#bankaccount-accountNumber-input-helper-text')).toHaveText(/Must contain at least 9 digits/);
});

When('I enter a long account number {string} and blur', async function(this: World, value: string) {
  await this.bankAccountForm.fillField('accountNumber', value);
});

Then('I should see the account number maximum length error', async function(this: World) {
  await expect(this.page.locator('#bankaccount-accountNumber-input-helper-text')).toBeVisible();
  await expect(this.page.locator('#bankaccount-accountNumber-input-helper-text')).toHaveText(/Must contain no more than 12 digits/);
});

Then('the submit bank account button should be disabled', async function(this: World) {
  await expect(this.bankAccountForm.submitButton).toBeDisabled();
});

When('I soft-delete the first bank account in the list', async function(this: World) {
  await this.bankAccountsPage.softDeleteFirstAccount();
});

Then('the bank account is marked as deleted', async function(this: World) {
  await this.bankAccountsPage.expectAccountDeleted();
});

Given('I have no bank accounts', async function(this: World) {
  // Placeholder for API call to remove bank accounts
});

When('I visit the bank accounts page', async function(this: World) {
  this.bankAccountsPage = new BankAccountsPage(this.page);
  await this.bankAccountsPage.goto();
});

Then('I should see a message {string}', async function(this: World, message: string) {
  await expect(this.page.locator('[data-test="empty-list-header"]')).toHaveText(new RegExp(message));
});

Then('I should see the onboarding modal', async function(this: World) {
  await expect(this.page.locator('[data-test="user-onboarding-dialog"]')).toBeVisible();
});

When('I open the side navigation on mobile', async function(this: World) {
  if ((await this.page.viewportSize())?.width && (await this.page.viewportSize())!.width < 800) {
    await this.page.locator('[data-test="sidenav-toggle"]').click();
  }
});
