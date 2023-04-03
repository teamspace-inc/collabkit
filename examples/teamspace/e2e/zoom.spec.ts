import { test, expect } from '@playwright/test';
import { openNewSpace, ZOOM_CONTROLS_SELECTOR } from './utils';

test('can zoom in and out, and see zoom level', async ({ page }) => {
  await openNewSpace(page);

  await expect(page.locator(ZOOM_CONTROLS_SELECTOR)).toHaveText('100%');
  await page.keyboard.press('Control+=');

  await expect(page.locator(ZOOM_CONTROLS_SELECTOR)).toHaveText('110%');

  await page.keyboard.press('Control+-');

  await expect(page.locator(ZOOM_CONTROLS_SELECTOR)).toHaveText('100%');

  await page.keyboard.press('Control+-');

  await expect(page.locator(ZOOM_CONTROLS_SELECTOR)).toHaveText('75%');

  await page.keyboard.press('Control+0');

  await expect(page.locator(ZOOM_CONTROLS_SELECTOR)).toHaveText('100%');
});

test('can zoom out to 10%', async ({ page }) => {
  await openNewSpace(page);

  await expect(page.locator(ZOOM_CONTROLS_SELECTOR)).toHaveText('100%');

  await page.keyboard.press('Control+-');
  await expect(page.locator(ZOOM_CONTROLS_SELECTOR)).toHaveText('75%');

  await page.keyboard.press('Control+-');
  await expect(page.locator(ZOOM_CONTROLS_SELECTOR)).toHaveText('50%');

  await page.keyboard.press('Control+-');
  await expect(page.locator(ZOOM_CONTROLS_SELECTOR)).toHaveText('25%');

  await page.keyboard.press('Control+-');
  await expect(page.locator(ZOOM_CONTROLS_SELECTOR)).toHaveText('10%');
});

test('can zoom in to 500%', async ({ page }) => {
  await openNewSpace(page);

  await expect(page.locator(ZOOM_CONTROLS_SELECTOR)).toHaveText('100%');

  await page.keyboard.press('Control+=');
  await expect(page.locator(ZOOM_CONTROLS_SELECTOR)).toHaveText('110%');

  await page.keyboard.press('Control+=');
  await expect(page.locator(ZOOM_CONTROLS_SELECTOR)).toHaveText('125%');

  await page.keyboard.press('Control+=');
  await expect(page.locator(ZOOM_CONTROLS_SELECTOR)).toHaveText('150%');

  await page.keyboard.press('Control+=');
  await expect(page.locator(ZOOM_CONTROLS_SELECTOR)).toHaveText('175%');

  await page.keyboard.press('Control+=');
  await expect(page.locator(ZOOM_CONTROLS_SELECTOR)).toHaveText('200%');

  await page.keyboard.press('Control+=');
  await expect(page.locator(ZOOM_CONTROLS_SELECTOR)).toHaveText('250%');

  await page.keyboard.press('Control+=');
  await expect(page.locator(ZOOM_CONTROLS_SELECTOR)).toHaveText('300%');

  await page.keyboard.press('Control+=');
  await expect(page.locator(ZOOM_CONTROLS_SELECTOR)).toHaveText('400%');

  await page.keyboard.press('Control+=');
  await expect(page.locator(ZOOM_CONTROLS_SELECTOR)).toHaveText('500%');
});
