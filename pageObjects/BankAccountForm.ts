import { Page } from '@playwright/test';

export class BankAccountForm {
  constructor(public page: Page) { }
  get bankNameInput() { return this.page.locator('[data-test*="bankName-input"] input'); }
  get routingNumberInput() { return this.page.locator('[data-test*="routingNumber-input"] input'); }
  get accountNumberInput() { return this.page.locator('[data-test*="accountNumber-input"] input'); }
  get submitButton() { return this.page.locator('[data-test="bankaccount-submit"]'); }

  async fillField(field: 'bankName'|'routingNumber'|'accountNumber', value: string) {
    const locator = 
      field === 'bankName' ? this.bankNameInput :
      field === 'routingNumber' ? this.routingNumberInput :
      this.accountNumberInput;
    await locator.fill(value);
    await locator.blur();
  }

  async leaveFieldEmpty(field: 'bankName'|'routingNumber'|'accountNumber') {
    const locator = 
      field === 'bankName' ? this.bankNameInput :
      field === 'routingNumber' ? this.routingNumberInput :
      this.accountNumberInput;
    await locator.fill('');
    await locator.blur();
  }

  async submit() {
    await this.submitButton.click();
  }
}
