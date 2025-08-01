import { Before, Given, When, Then } from '@cucumber/cucumber';
import { BankAccountsPage } from '../pageObjects/BankAccountsPage';
import { expect } from '@playwright/test';

// --- Utility for backend task calls ---
async function seedDatabase(page) {
  // Example using Playwright's request API
  // Adjust endpoint as needed for your backend test helpers
  await page.request.post('/api/test/reset-db', { data: { seed: true } }); 
}
async function clearBankAccounts(page) {
  await page.request.post('/api/test/clear-bankaccounts');
}
async function login(page) {
  // Prefer API login for speed, falling back to UI if necessary
  // Example for API login:
  await page.request.post('/api/login', { data: { username: 'testuser', password: 's3cr3t' }});
  // Set session cookie, or ensure authenticated for UI
  // Or implement UI login:
  /*
  await page.goto('/login');
  await page.fill('input[name="username"]', 'testuser');
  await page.fill('input[name="password"]', 's3cr3t');
  await page.click('button[type="submit"]');
  */
}

Before(async function({ page }) {
  // Seed the database and login for every scenario for parallel resilience
  await seedDatabase(page);
  await login(page);
});

Given('the database is seeded', async function({ page }) {
  await seedDatabase(page);
});
Given('there are no bank accounts in the system', async function({ page }) {
  await clearBankAccounts(page);
});
Given('I am logged in', async function({ page }) {
  await login(page);
});
Given('I navigate to the bank accounts page', async function({ page }) {
  const bankAccountsPage = new BankAccountsPage(page);
  await bankAccountsPage.navigate();
});

When('I click on the {string} bank account button', async function({ page }, btn) {
  const bankAccountsPage = new BankAccountsPage(page);
  if (/create/i.test(btn)) {
    await bankAccountsPage.clickCreateBankAccount();
  }
});

When('I fill in the bank name with {string}', async function({ page }, name) {
  const bankAccountsPage = new BankAccountsPage(page);
  await bankAccountsPage.fillBankName(name);
});

When('I blur the bank name input', async function({ page }) {
  const bankAccountsPage = new BankAccountsPage(page);
  await bankAccountsPage.blurBankName();
});

When('I fill in the routing number with {string}', async function({ page }, value) {
  const bankAccountsPage = new BankAccountsPage(page);
  await bankAccountsPage.fillRoutingNumber(value);
});

When('I blur the routing number input', async function({ page }) {
  const bankAccountsPage = new BankAccountsPage(page);
  await bankAccountsPage.blurRoutingNumber();
});

When('I fill in the account number with {string}', async function({ page }, value) {
  const bankAccountsPage = new BankAccountsPage(page);
  await bankAccountsPage.fillAccountNumber(value);
});

When('I blur the account number input', async function({ page }) {
  const bankAccountsPage = new BankAccountsPage(page);
  await bankAccountsPage.blurAccountNumber();
});

When('I submit the bank account form', async function({ page }) {
  const bankAccountsPage = new BankAccountsPage(page);
  await bankAccountsPage.submitForm();
});

Then('I see the new bank account {string} in the accounts list', async function({ page }, name) {
  const bankAccountsPage = new BankAccountsPage(page);
  expect(await bankAccountsPage.isBankAccountVisible(name)).toBeTruthy();
});

Then('I should see the bank name required error', async function({ page }) {
  const bankAccountsPage = new BankAccountsPage(page);
  await expect(bankAccountsPage.getBankNameRequiredError()).resolves.toBeVisible();
});

Then('I should see a minimum length error for bank name', async function({ page }) {
  const bankAccountsPage = new BankAccountsPage(page);
  await expect(bankAccountsPage.getBankNameMinLengthError()).resolves.toBeVisible();
});

Then('I should see the routing number required error', async function({ page }) {
  const bankAccountsPage = new BankAccountsPage(page);
  await expect(bankAccountsPage.getRoutingNumberRequiredError()).resolves.toBeVisible();
});

Then('I should see an invalid length error for routing number', async function({ page }) {
  const bankAccountsPage = new BankAccountsPage(page);
  await expect(bankAccountsPage.getRoutingNumberLengthError()).resolves.toBeVisible();
});

Then('I should see the account number required error', async function({ page }) {
  const bankAccountsPage = new BankAccountsPage(page);
  await expect(bankAccountsPage.getAccountNumberRequiredError()).resolves.toBeVisible();
});

Then('I should see an invalid account number length error', async function({ page }) {
  const bankAccountsPage = new BankAccountsPage(page);
  await expect(bankAccountsPage.getAccountNumberLengthError()).resolves.toBeVisible();
});

Then('the bank account form submit button should be disabled', async function({ page }) {
  const bankAccountsPage = new BankAccountsPage(page);
  expect(await bankAccountsPage.isSubmitDisabled()).toBeTruthy();
});

When('I click the delete button for the bank account named {string}', async function({ page }, name) {
  const bankAccountsPage = new BankAccountsPage(page);
  await bankAccountsPage.clickDeleteBankAccount(name);
});

Then('I should see the bank account {string} marked as deleted in the accounts list', async function({ page }, name) {
  const bankAccountsPage = new BankAccountsPage(page);
  expect(await bankAccountsPage.seeBankAccountMarkedDeleted(name)).toBeTruthy();
});

When('I navigate to the bank accounts page', async function({ page }) {
  const bankAccountsPage = new BankAccountsPage(page);
  await bankAccountsPage.navigate();
});

Then('I should see the onboarding dialog for adding a new bank account', async function({ page }) {
  const bankAccountsPage = new BankAccountsPage(page);
  expect(await bankAccountsPage.onboardingDialogVisible()).toBeTruthy();
});

Then('I should see a message indicating no bank accounts are available', async function({ page }) {
  const bankAccountsPage = new BankAccountsPage(page);
  expect(await bankAccountsPage.emptyStateMessageVisible()).toBeTruthy();
});