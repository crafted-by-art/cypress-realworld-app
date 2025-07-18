import { Page, Locator, expect } from '@playwright/test';

export class BankAccountPage {
  readonly page: Page;
  readonly newButton: Locator;
  readonly bankNameInput: Locator;
  readonly routingNumberInput: Locator;
  readonly accountNumberInput: Locator;
  readonly submitButton: Locator;
  readonly accountList: Locator;
  readonly onboardingDialog: Locator;
  readonly emptyStateMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newButton = page.locator('[data-test=bankaccount-new]');
    this.bankNameInput = page.locator('[data-test=bankaccount-bankName-input]');
    this.routingNumberInput = page.locator('[data-test=bankaccount-routingNumber-input]');
    this.accountNumberInput = page.locator('[data-test=bankaccount-accountNumber-input]');
    this.submitButton = page.locator('[data-test=bankaccount-submit]');
    this.accountList = page.locator('[data-test=bankaccount-list]');
    this.onboardingDialog = page.locator('[data-test=onboarding-dialog]');
    this.emptyStateMessage = page.locator('[data-test=bankaccount-list-empty]');
  }

  async goto() {
    await this.page.goto('/bankaccounts');
  }

  async clickNew() {
    await this.newButton.click();
  }

  async enterBankName(name: string) {
    await this.bankNameInput.fill(name);
  }

  async enterRoutingNumber(number: string) {
    await this.routingNumberInput.fill(number);
  }

  async enterAccountNumber(number: string) {
    await this.accountNumberInput.fill(number);
  }

  async submitForm() {
    await this.submitButton.click();
  }

  async findBankAccountRow(name: string) {
    return this.page.locator(`[data-test=bankaccount-list-row]:has-text("${name}")`);
  }

  async clickDeleteFor(name: string) {
    await (await this.findBankAccountRow(name)).locator('[data-test=bankaccount-delete]').click();
  }

  async isAccountDeleted(name: string) {
    const row = await this.findBankAccountRow(name);
    await expect(row).toHaveClass(/bankaccount-list-item--deleted/);
  }

  async getFieldError(field: string) {
    return this.page.locator(`[data-test="bankaccount-${field}-input-error"]`);
  }

  async isSubmitDisabled() {
    await expect(this.submitButton).toBeDisabled();
  }

  async onboardingVisible() {
    await expect(this.onboardingDialog).toBeVisible();
  }

  async emptyStateVisible() {
    await expect(this.emptyStateMessage).toBeVisible();
  }
}
