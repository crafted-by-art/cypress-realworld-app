import { Page, expect } from '@playwright/test';

export class BankAccountsPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  get bankAccountsUrl() {
    return '/bankaccounts';
  }
  async goto() {
    await this.page.goto(this.bankAccountsUrl);
  }
  async openNewBankAccountForm() {
    await this.page.locator('[data-test="bankaccount-new"]').click();
  }
  async enterBankName(name: string) {
    await this.page.locator('[data-test^="bankName-input"]').fill(name);
  }
  async enterRoutingNumber(routing: string) {
    await this.page.locator('[data-test^="routingNumber-input"]').fill(routing);
  }
  async enterAccountNumber(account: string) {
    await this.page.locator('[data-test^="accountNumber-input"]').fill(account);
  }
  async submitForm() {
    await this.page.locator('[data-test^="submit"]').click();
  }
  async isBankAccountListed(name: string) {
    const items = this.page.locator('[data-test^="bankaccount-list-item"]');
    await expect(items.filter({ hasText: name })).toHaveCount(1);
  }
  async leaveBankNameEmptyAndBlur() {
    const bankNameInput = this.page.locator('[data-test^="bankName-input"]');
    await bankNameInput.fill('');
    await bankNameInput.dispatchEvent('blur');
  }
  async enterBankNameAndBlur(name: string) {
    const bankNameInput = this.page.locator('[data-test^="bankName-input"]');
    await bankNameInput.fill(name);
    await bankNameInput.dispatchEvent('blur');
  }
  async leaveRoutingNumberEmptyAndBlur() {
    const routingInput = this.page.locator('[data-test^="routingNumber-input"]');
    await routingInput.fill('');
    await routingInput.dispatchEvent('blur');
  }
  async enterRoutingNumberAndBlur(routing: string) {
    const routingInput = this.page.locator('[data-test^="routingNumber-input"]');
    await routingInput.fill(routing);
    await routingInput.dispatchEvent('blur');
  }
  async leaveAccountNumberEmptyAndBlur() {
    const accountNumberInput = this.page.locator('[data-test^="accountNumber-input"]');
    await accountNumberInput.fill('');
    await accountNumberInput.dispatchEvent('blur');
  }
  async enterAccountNumberAndBlur(account: string) {
    const accountNumberInput = this.page.locator('[data-test^="accountNumber-input"]');
    await accountNumberInput.fill(account);
    await accountNumberInput.dispatchEvent('blur');
  }
  async expectErrorMessage(message: string) {
    await expect(this.page.locator(`text=${message}`)).toBeVisible();
  }
  async expectNoRoutingNumberError() {
    await expect(this.page.locator('#bankaccount-routingNumber-input-helper-text')).toBeHidden();
  }
  async expectNoAccountNumberError() {
    await expect(this.page.locator('#bankaccount-accountNumber-input-helper-text')).toBeHidden();
  }
  async expectSubmitDisabled() {
    const submitBtn = this.page.locator('[data-test^="submit"]');
    await expect(submitBtn).toBeDisabled();
  }
  async deleteFirstBankAccount() {
    await this.page.locator('[data-test^="bankaccount-delete"]').first().click();
  }
  async expectFirstAccountDeleted() {
    const firstRow = this.page.locator('[data-test^="bankaccount-list-item"]').first();
    await expect(firstRow.locator('text=Deleted')).toBeVisible();
  }
  async expectEmptyList() {
    await expect(this.page.locator('[data-test^="bankaccount-list-item"]')).toHaveCount(0);
  }
  async expectNoBankAccountsMessage() {
    await expect(this.page.locator('[data-test="empty-list-header"]')).toHaveText(/No Bank Accounts/);
  }
  async expectOnboardingDialog() {
    await expect(this.page.locator('[data-test="user-onboarding-dialog"]')).toBeVisible();
  }
  async expectNotificationsCountVisible() {
    await expect(this.page.locator('[data-test="nav-top-notifications-count"]')).toBeVisible();
  }
}
