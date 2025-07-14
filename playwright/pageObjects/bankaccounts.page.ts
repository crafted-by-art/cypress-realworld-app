import { Page, expect } from '@playwright/test';

export class LoginPage {
  private page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  async login() {
    await this.page.goto('/login');
    await this.page.fill('[data-test=signin-username]', 'testuser');
    await this.page.fill('[data-test=signin-password]', 'testpassword');
    await this.page.click('[data-test=signin-submit]');
    await expect(this.page).toHaveURL(/dashboard|bankaccounts/);
  }
}

export class BankAccountsPage {
  private page: Page;
  constructor(page: Page) { this.page = page; }

  async goto() {
    await this.page.goto('/bankaccounts');
    await expect(this.page.locator('[data-test=bankaccount-list]')).toBeVisible();
  }

  async clickCreate() {
    await this.page.click('[data-test=bankaccount-new]');
  }

  async enterBankName(bankName: string) {
    await this.page.fill('[data-test=bankaccount-bankName-input]', bankName);
  }

  async enterRoutingNumber(routingNumber: string) {
    await this.page.fill('[data-test=bankaccount-routingNumber-input]', routingNumber);
  }

  async enterAccountNumber(accountNumber: string) {
    await this.page.fill('[data-test=bankaccount-accountNumber-input]', accountNumber);
  }

  async submitForm() {
    await this.page.click('[data-test=bankaccount-submit]');
  }

  async expectAccountInList(bankName: string) {
    await expect(this.page.locator(`[data-test=bankaccount-list] >> text=${bankName}`)).toBeVisible();
  }

  async expectValidationError(errorMessage: string) {
    // General approach: look for text within any error/validation elements beneath form
    const errors = this.page.locator('[data-test^=bankaccount-][data-test$=-input]');
    const count = await errors.count();
    let matched = false;
    for (let i = 0; i < count; ++i) {
      const parent = errors.nth(i).locator('..');
      if (await parent.innerText().then(txt => txt.includes(errorMessage)).catch(() => false)) {
        matched = true;
        break;
      }
    }
    expect(matched).toBeTruthy();
  }

  async createBankAccount(bankName: string, routingNumber: string, accountNumber: string) {
    await this.clickCreate();
    await this.enterBankName(bankName);
    await this.enterRoutingNumber(routingNumber);
    await this.enterAccountNumber(accountNumber);
    await this.submitForm();
  }

  async softDeleteAccount(bankName: string) {
    const entry = this.page.locator(`[data-test=bankaccount-list] >> text=${bankName}`);
    await expect(entry).toBeVisible();
    // Locate closest row and click its [data-test=bankaccount-delete] button
    const deleteBtn = entry.locator('..').locator('[data-test=bankaccount-delete]');
    await expect(deleteBtn).toBeVisible();
    await deleteBtn.click();
  }

  async expectAccountMarkedDeleted(bankName: string) {
    const entry = this.page.locator(`[data-test=bankaccount-list] >> text=${bankName}`);
    await expect(entry).toBeVisible();
    await expect(entry).toHaveText(/deleted/i);
  }

  async ensureNoAccounts() {
    // Loop to delete until empty, since page reloads after delete
    while (true) {
      const rows = await this.page.$$('[data-test=bankaccount-list-item]');
      if (rows.length === 0) break;
      await rows[0].locator('[data-test=bankaccount-delete]').click();
      await this.page.waitForTimeout(200); // minor wait for DOM to refresh
    }
  }

  async expectEmptyState() {
    await expect(this.page.locator('[data-test=bankaccount-list-empty]')).toBeVisible();
  }

  async expectOnboardingDialog() {
    await expect(this.page.locator('[data-test=user-onboarding-dialog]')).toBeVisible();
  }
}
