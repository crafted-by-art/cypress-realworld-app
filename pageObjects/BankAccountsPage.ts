import { Page, Locator, expect } from '@playwright/test';

export class BankAccountsPage {
  readonly page: Page;
  constructor(page: Page) { this.page = page; }

  get sidenavBankAccounts() { return this.page.locator('[data-test="sidenav-bankaccounts"]'); }
  get createBankAccountButton() { return this.page.locator('[data-test="bankaccount-new"]'); }
  get bankAccountList() { return this.page.locator('[data-test^="bankaccount-list-item"]'); }
  get deleteButtons() { return this.page.locator('[data-test*="bankaccount-delete"]'); }
  get submitButton() { return this.page.locator('[data-test="bankaccount-submit"]'); }

  async goto() {
    await this.page.goto('/bankaccounts');
    await this.page.waitForLoadState('networkidle');
  }

  async openCreateForm() {
    await this.createBankAccountButton.waitFor({ state: 'visible' });
    await this.createBankAccountButton.click();
  }

  async fillBankDetails(details: { bankName: string, routingNumber: string, accountNumber: string }) {
    await this.page.locator('[data-test*="bankName-input"] input').fill(details.bankName);
    await this.page.locator('[data-test*="routingNumber-input"] input').fill(details.routingNumber);
    await this.page.locator('[data-test*="accountNumber-input"] input').fill(details.accountNumber);
  }

  async submit() {
    await this.submitButton.click();
  }

  async expectAccountVisible(bankName: string) {
    await expect(this.bankAccountList.filter({ hasText: bankName }).first()).toBeVisible();
  }

  async softDeleteFirstAccount() {
    await this.deleteButtons.first().click();
  }

  async expectAccountDeleted() {
    await expect(this.bankAccountList.first().locator('text=Deleted')).toBeVisible();
  }

  async expectEmptyState() {
    await expect(this.page.locator('[data-test="empty-list-header"]')).toBeVisible();
  }
}
