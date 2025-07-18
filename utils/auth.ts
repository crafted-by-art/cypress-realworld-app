import { Page, expect } from '@playwright/test';

export async function seedDatabase() {
  // Implementation depends on how you reset your backend/database
  // Typically use fixture loading or API POST/exec if available
}

export async function login(page: Page, username: string, password: string) {
  await page.goto('/login');
  await page.fill('[data-test=signin-username]', username);
  await page.fill('[data-test=signin-password]', password);
  await page.click('[data-test=signin-submit]');
  await expect(page).toHaveURL(/.*home/);
}
