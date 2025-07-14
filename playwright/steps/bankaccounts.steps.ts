import { Given, When, Then, setWorldConstructor } from '@cucumber/cucumber';
import { LoginPage } from '../pageObjects/LoginPage';
import { BankAccountsPage } from '../pageObjects/BankAccountsPage';

class CustomWorld {
  page: any;
  loginPage: LoginPage;
  bankAccountsPage: BankAccountsPage;
  constructor({ parameters }: any) {
    this.page = parameters.page;
    this.loginPage = new LoginPage(this.page);
    this.bankAccountsPage = new BankAccountsPage(this.page);
  }
}

setWorldConstructor(CustomWorld);

Given('I am logged in', async function() {
  await this.loginPage.login();
});

Given('I am on the bank accounts page', async function() {
  await this.bankAccountsPage.goto();
});

When('I click on {string} bank account', async function(action: string) {
  if (action === 'Create') {
    await this.bankAccountsPage.clickCreate();
  }
});

When('I enter bank name {string}', async function(bankName: string) {
  await this.bankAccountsPage.enterBankName(bankName);
});

When('I enter routing number {string}', async function(routingNumber: string) {
  await this.bankAccountsPage.enterRoutingNumber(routingNumber);
});

When('I enter account number {string}', async function(accountNumber: string) {
  await this.bankAccountsPage.enterAccountNumber(accountNumber);
});

When('I submit the bank account form', async function() {
  await this.bankAccountsPage.submitForm();
});

Then('I should see a new bank account named {string} in the accounts list', async function(bankName: string) {
  await this.bankAccountsPage.expectAccountInList(bankName);
});

Then('I should see the error message {string}', async function(errorMessage: string) {
  await this.bankAccountsPage.expectValidationError(errorMessage);
});

Given('I have a bank account named {string}', async function(bankName: string) {
  await this.bankAccountsPage.goto();
  const entry = this.page.locator(`[data-test=bankaccount-list] >> text=${bankName}`);
  if (!(await entry.isVisible().catch(() => false))) {
    await this.bankAccountsPage.createBankAccount(bankName, '987654321', '123456789');
    await this.bankAccountsPage.expectAccountInList(bankName);
  }
});

When('I choose to delete the bank account named {string}', async function(bankName: string) {
  await this.bankAccountsPage.softDeleteAccount(bankName);
});

Then('I should see that the account named {string} is marked as deleted in the list', async function(bankName: string) {
  await this.bankAccountsPage.expectAccountMarkedDeleted(bankName);
});

Given('I have no bank accounts', async function() {
  await this.bankAccountsPage.goto();
  await this.bankAccountsPage.ensureNoAccounts();
});

When('I view the bank accounts page', async function() {
  await this.bankAccountsPage.goto();
});

Then('I should see the empty accounts message', async function() {
  await this.bankAccountsPage.expectEmptyState();
});

Then('I should see the user onboarding dialog', async function() {
  await this.bankAccountsPage.expectOnboardingDialog();
});
