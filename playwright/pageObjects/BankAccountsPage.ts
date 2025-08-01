import { Page, expect } from '@playwright/test';

export class BankAccountsPage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('/bankaccounts');
  }

  async clickCreateBankAccount() {
    await this.page.getByRole('button', { name: /create/i }).click();
  }

  async fillBankName(bankName: string) {
    await this.page.getByLabel(/bank name/i).fill(bankName);
  }

  async blurBankName() {
    await this.page.getByLabel(/bank name/i).blur();
  }

  async fillRoutingNumber(routingNumber: string) {
    await this.page.getByLabel(/routing number/i).fill(routingNumber);
  }

  async blurRoutingNumber() {
    await this.page.getByLabel(/routing number/i).blur();
  }

  async fillAccountNumber(accountNumber: string) {
    await this.page.getByLabel(/account number/i).fill(accountNumber);
  }

  async blurAccountNumber() {
    await this.page.getByLabel(/account number/i).blur();
  }

  async submitForm() {
    await this.page.getByRole('button', { name: /save/i }).click();
  }

  async isBankAccountVisible(bankName: string) {
    return await this.page.getByText(bankName, { exact: false }).isVisible();
  }

  async seeBankAccountMarkedDeleted(bankName: string) {
    // This requires the DOM to use a deleted style (e.g., strikethrough)
    const row = this.page.locator(`[data-test="bankaccount-list"]`).getByText(bankName, { exact: false });
    // Adjust this selector as needed to match "deleted" style
    return await row.locator('.MuiTypography-root.strike').isVisible();
  }

  async clickDeleteBankAccount(bankName: string) {
    const row = this.page.locator(`[data-test="bankaccount-list"]`).getByText(bankName, { exact: false }).first();
    await row.getByRole('button', { name: /delete/i }).click();
  }

  async getBankNameRequiredError() {
    return this.page.getByText('Enter a bank name', { exact: false });
  }

  async getBankNameMinLengthError() {
    return this.page.getByText('Must contain at least 5 characters', { exact: false });
  }

  async getRoutingNumberRequiredError() {
    return this.page.getByText('Enter a valid bank routing number', { exact: false });
  }

  async getRoutingNumberLengthError() {
    return this.page.getByText('Must contain a valid routing number', { exact: false });
  }

  async getAccountNumberRequiredError() {
    return this.page.getByText('Enter a valid bank account number', { exact: false });
  }

  async getAccountNumberLengthError() {
    return this.page.getByText('Must contain at least 9 digits', { exact: false });
  }

  async isSubmitDisabled() {
    return await this.page.getByRole('button', { name: /save/i }).isDisabled();
  }

  async onboardingDialogVisible() {
    return await this.page.getByRole('dialog', { name: /add a bank account/i }).isVisible();
  }

  async emptyStateMessageVisible() {
    return await this.page.getByText(/no bank accounts/i, { exact: false }).isVisible();
  }
}