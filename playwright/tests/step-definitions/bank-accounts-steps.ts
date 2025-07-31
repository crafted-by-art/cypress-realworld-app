import { Given, When, Then } from '@cucumber/cucumber';
import { BankAccountsPage } from '../pageObjects/BankAccountsPage';
import { expect } from '@playwright/test';

Given('the database is seeded', async function() {
  await this.page.request.post('/api/test/seed');
});

Given('I am logged in as a valid user', async function() {
  await this.page.goto('/login');
  await this.page.locator('[data-test="signin-username"]').fill('testuser');
  await this.page.locator('[data-test="signin-password"]').fill('s3cret');
  await this.page.locator('[data-test="signin-submit"]').click();
  await this.page.waitForURL(/\/home/);
});

Given('I am on the Bank Accounts page', async function() {
  this.bankAccountsPage = new BankAccountsPage(this.page);
  await this.bankAccountsPage.goto();
  await this.page.waitForResponse(resp =>
    resp.url().includes('/graphql') && resp.request().postData()?.includes('ListBankAccount')
  );
});

When('I open the {string} form', async function(formName: string) {
  await this.bankAccountsPage.openNewBankAccountForm();
  await this.page.waitForURL(/\/bankaccounts\/new/);
});

When('I enter bank name {string}', async function(name: string) {
  await this.bankAccountsPage.enterBankName(name);
});
When('I enter routing number {string}', async function(num: string) {
  await this.bankAccountsPage.enterRoutingNumber(num);
});
When('I enter account number {string}', async function(num: string) {
  await this.bankAccountsPage.enterAccountNumber(num);
});

When('I submit the bank account form', async function() {
  const [resp] = await Promise.all([
    this.page.waitForResponse(resp =>
      resp.url().includes('/graphql') && resp.request().postData()?.includes('CreateBankAccount')
    ),
    this.bankAccountsPage.submitForm()
  ]);
  expect(resp.ok()).toBeTruthy();
});

Then('I see the bank account {string} listed', async function(name: string) {
  await this.bankAccountsPage.isBankAccountListed(name);
});

Given('the bank accounts API returns an empty list', async function() {
  await this.page.route('**/graphql', async (route, request) => {
    const body = request.postData();
    if (body && body.includes('ListBankAccount')) {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ data: { listBankAccount: [] } })
      });
    } else {
      route.fallback();
    }
  });
});

When('I visit the Bank Accounts page', async function() {
  this.bankAccountsPage = new BankAccountsPage(this.page);
  await this.bankAccountsPage.goto();
  await this.page.waitForResponse((resp) =>
    resp.url().includes('/graphql') && resp.request().postData()?.includes('ListBankAccount')
  );
});

Then('I should not see a bank account list', async function() {
  await this.bankAccountsPage.expectEmptyList();
});

Then('I should see the message "No Bank Accounts"', async function() {
  await this.bankAccountsPage.expectNoBankAccountsMessage();
});

Then('the user onboarding dialog should be visible', async function() {
  await this.bankAccountsPage.expectOnboardingDialog();
});

Then('the notifications count should be visible', async function() {
  await this.bankAccountsPage.expectNotificationsCountVisible();
});
