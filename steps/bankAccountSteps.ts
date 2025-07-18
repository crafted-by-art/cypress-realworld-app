import { Given, When, Then, Before, setDefaultTimeout, World, TableDefinition } from '@cucumber/cucumber';
import { expect, Page } from '@playwright/test';
import { BankAccountsPage } from '../pageObjects/BankAccountsPage';
import { BankAccountForm } from '../pageObjects/BankAccountForm';

setDefaultTimeout(60 * 1000);

Before(async function (this: World) {
  // No-op, login and API handled in support hooks or step logic as needed
});

Given('I am a logged in user', async function (this: World) {
  // Assumes global login mechanism: could use cookies, session fixture, etc.
  if (this.login) {
    await this.login();
  } else if (this.page && this.context) {
    // Fallback: check cookies/session or other global setup here if needed
  }
});

Given('I navigate to the bank accounts page', async function (this: World) {
  this.bankAccountsPage = new BankAccountsPage(this.page as Page);
  await this.bankAccountsPage.goto();
  await this.page.waitForResponse((resp) =>
    resp.url().includes('/notifications') && resp.status() === 200
  );
});

When('I click the create bank account button', async function (this: World) {
  await this.bankAccountsPage.openCreateForm();
});

Then('I am on the new bank account form', async function (this: World) {
  this.bankAccountForm = new BankAccountForm(this.page as Page);
  await expect(this.bankAccountForm.submitButton).toBeVisible();
});

When('I fill in the bank details with:', async function (this: World, table: TableDefinition) {
  this.bankAccountForm = this.bankAccountForm || new BankAccountForm(this.page as Page);
  const [{ 'Bank Name': bankName, 'Routing Number': routingNumber, 'Account Number': accountNumber }] = table.hashes();
  await this.bankAccountForm.fillField('bankName', bankName);
  await this.bankAccountForm.fillField('routingNumber', routingNumber);
  await this.bankAccountForm.fillField('accountNumber', accountNumber);
});

When('I submit the new bank account form', async function (this: World) {
  this.bankAccountForm = this.bankAccountForm || new BankAccountForm(this.page as Page);
  const [response] = await Promise.all([
    this.page.waitForResponse(
      (resp) =>
        resp.url().includes('/graphql') &&
        resp.request().postData()?.includes('CreateBankAccount') &&
        resp.status() === 200
    ),
    this.bankAccountForm.submit(),
  ]);
  expect(response.ok()).toBeTruthy();
});

Then('I see the account {string} in my list of bank accounts', async function (this: World, bankName: string) {
  this.bankAccountsPage = this.bankAccountsPage || new BankAccountsPage(this.page as Page);
  await this.bankAccountsPage.expectAccountVisible(bankName);
});

When('I leave the bank name field empty and blur', async function (this: World) {
  this.bankAccountForm = this.bankAccountForm || new BankAccountForm(this.page as Page);
  await this.bankAccountForm.leaveFieldEmpty('bankName');
});

Then('I should see the bank name required error', async function (this: World) {
  await expect(this.page.getByTestId('bankaccount-bankName-input-helper-text')).toBeVisible();
  await expect(this.page.getByTestId('bankaccount-bankName-input-helper-text')).toContainText('Enter a bank name');
});

When('I enter a short bank name {string} and blur', async function (this: World, value: string) {
  this.bankAccountForm = this.bankAccountForm || new BankAccountForm(this.page as Page);
  await this.bankAccountForm.fillField('bankName', value);
});

Then('I should see the bank name minimum length error', async function (this: World) {
  await expect(this.page.getByTestId('bankaccount-bankName-input-helper-text')).toBeVisible();
  await expect(this.page.getByTestId('bankaccount-bankName-input-helper-text')).toContainText('Must contain at least 5 characters');
});

When('I leave the routing number field empty and blur', async function (this: World) {
  this.bankAccountForm = this.bankAccountForm || new BankAccountForm(this.page as Page);
  await this.bankAccountForm.leaveFieldEmpty('routingNumber');
});

Then('I should see the routing number required error', async function (this: World) {
  await expect(this.page.getByTestId('bankaccount-routingNumber-input-helper-text')).toBeVisible();
  await expect(this.page.getByTestId('bankaccount-routingNumber-input-helper-text')).toContainText('Enter a valid bank routing number');
});

When('I enter an invalid routing number {string} and blur', async function (this: World, value: string) {
  this.bankAccountForm = this.bankAccountForm || new BankAccountForm(this.page as Page);
  await this.bankAccountForm.fillField('routingNumber', value);
});

Then('I should see the routing number validation error', async function (this: World) {
  await expect(this.page.getByTestId('bankaccount-routingNumber-input-helper-text')).toBeVisible();
  await expect(this.page.getByTestId('bankaccount-routingNumber-input-helper-text')).toContainText('Must contain a valid routing number');
});

When('I leave the account number field empty and blur', async function (this: World) {
  this.bankAccountForm = this.bankAccountForm || new BankAccountForm(this.page as Page);
  await this.bankAccountForm.leaveFieldEmpty('accountNumber');
});

Then('I should see the account number required error', async function (this: World) {
  await expect(this.page.getByTestId('bankaccount-accountNumber-input-helper-text')).toBeVisible();
  await expect(this.page.getByTestId('bankaccount-accountNumber-input-helper-text')).toContainText('Enter a valid bank account number');
});

When('I enter a short account number {string} and blur', async function (this: World, value: string) {
  this.bankAccountForm = this.bankAccountForm || new BankAccountForm(this.page as Page);
  await this.bankAccountForm.fillField('accountNumber', value);
});

Then('I should see the account number minimum length error', async function (this: World) {
  await expect(this.page.getByTestId('bankaccount-accountNumber-input-helper-text')).toBeVisible();
  await expect(this.page.getByTestId('bankaccount-accountNumber-input-helper-text')).toContainText('Must contain at least 9 digits');
});

When('I enter a long account number {string} and blur', async function (this: World, value: string) {
  this.bankAccountForm = this.bankAccountForm || new BankAccountForm(this.page as Page);
  await this.bankAccountForm.fillField('accountNumber', value);
});

Then('I should see the account number maximum length error', async function (this: World) {
  await expect(this.page.getByTestId('bankaccount-accountNumber-input-helper-text')).toBeVisible();
  await expect(this.page.getByTestId('bankaccount-accountNumber-input-helper-text')).toContainText('Must contain no more than 12 digits');
});

Then('the submit bank account button should be disabled', async function (this: World) {
  this.bankAccountForm = this.bankAccountForm || new BankAccountForm(this.page as Page);
  await expect(this.bankAccountForm.submitButton).toBeDisabled();
});

When('I soft-delete the first bank account in the list', async function (this: World) {
  this.bankAccountsPage = this.bankAccountsPage || new BankAccountsPage(this.page as Page);
  await this.bankAccountsPage.softDeleteFirstAccount();
});

Then('the bank account is marked as deleted', async function (this: World) {
  this.bankAccountsPage = this.bankAccountsPage || new BankAccountsPage(this.page as Page);
  await this.bankAccountsPage.expectAccountDeleted();
});

Given('I have no bank accounts', async function (this: World) {
  // Ideally make API call or use DB seed to clear bank accounts for the current user
  if (this.api) {
    await this.api.deleteAllBankAccounts();
  }
});

When('I visit the bank accounts page', async function (this: World) {
  this.bankAccountsPage = new BankAccountsPage(this.page as Page);
  await this.bankAccountsPage.goto();
});

Then('I should see a message {string}', async function (this: World, message: string) {
  await expect(this.page.getByTestId('empty-list-header')).toContainText(message);
});

Then('I should see the onboarding modal', async function (this: World) {
  await expect(this.page.getByTestId('user-onboarding-dialog')).toBeVisible();
});

When('I open the side navigation on mobile', async function (this: World) {
  const viewport = await this.page.viewportSize();
  if (viewport && viewport.width < 800) {
    await this.page.getByTestId('sidenav-toggle').click();
  }
});
