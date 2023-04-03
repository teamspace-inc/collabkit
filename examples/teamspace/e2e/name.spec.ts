import { test, expect, Page } from '@playwright/test';
import { $, openNewSpace } from './utils';

test.describe.serial('name', () => {
  let page: Page;
  let url: string;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
  });

  test('can open a new space', async () => {
    await openNewSpace(page);
  });

  test('is online', async () => {
    await expect(page.locator($.online)).toHaveCount(1);
  });

  test('is empty by default', async () => {
    const spaceName = page.locator($.spaceName);
    await expect(spaceName).toHaveText('');
  });

  test('can write a name', async () => {
    url = page.url();
    await page.locator($.spaceName).click();
    await page.locator($.spaceName).type('My Space');
    await expect(page.locator($.spaceName)).toHaveText('My Space');
    await expect(page).toHaveTitle('My Space | Neuron');
    await expect(page).toHaveURL(url + '#My%20Space');
  });

  test('can see the name reflected in other clients', async ({ browser }) => {
    const context2 = await browser.newContext();
    const page2 = await context2.newPage();
    await page2.goto(url);
    await expect(page2.locator($.spaceName)).toHaveText('My Space');
    await expect(page2).toHaveTitle('My Space | Neuron');
    await expect(page2).toHaveURL(url + '#My%20Space');
  });
});
