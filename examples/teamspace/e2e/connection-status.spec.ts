import { test, expect } from '@playwright/test';
import { ONLINE_SELECTOR } from './utils';

test('connection status should become "online"', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator(ONLINE_SELECTOR)).toHaveCount(1);
});

// test('connection status should become "offline" when browser goes offline, and shows a toast', async ({
//   page,
// }) => {
//   await page.goto('/');
//   await expect(page.locator(ONLINE_SELECTOR)).toHaveCount(1);
//   await page.context().setOffline(true);
//   await page.waitForTimeout(250);
//   const offline = await page.locator('.toast.offline-notification');
//   expect(offline).toBeVisible();
// });
