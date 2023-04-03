import { test, expect, Page } from '@playwright/test';
import { $, openNewSpace } from './utils';

test.describe.serial('presence', () => {
  let page: Page;
  let url: string;

  let page2: Page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    url = await openNewSpace(page);
  });

  test('can see oneself when space loads', async () => {
    await expect(page.locator($.facepileSelf)).toHaveCount(1);
  });

  test('can see another person when they load the space', async ({ browser }) => {
    const context2 = await browser.newContext();
    page2 = await context2.newPage();
    await page2.goto(url);
    await expect(page2.locator($.online)).toHaveCount(1);
    await expect(page.locator($.facepile)).toHaveCount(1);
    await expect(page2.locator($.facepile)).toHaveCount(1);
  });

  test('can see the other person leave when they close the page', async () => {
    await expect(page.locator($.facepile)).toBeVisible();
    await page2.close();
    await expect(page.locator($.facepile)).toBeHidden();
  });
});
