import { Page } from '@playwright/test';

export async function interceptBankAccountsAndNotifications(page: Page) {
  await page.route('**/bankaccounts', route => route.continue());
  await page.route('**/notifications', route => route.continue());
}

export async function mockNoBankAccounts(page: Page) {
  await page.route('**/bankaccounts', route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([])
    });
  });
}
