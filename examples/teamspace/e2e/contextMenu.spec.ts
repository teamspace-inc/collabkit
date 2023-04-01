import { test, expect, Page } from '@playwright/test';
import { openNewSpace, createCardAndTypeInIt, $ } from './utils';

const cards = [
  { x: 90 + 250, y: 90, width: 50, height: 50 },
  { x: 400, y: 400, width: 50, height: 50 },
  { x: 600, y: 100, width: 50, height: 50 },
  { x: 300, y: 400, width: 50, height: 50 },
];

test.describe.serial('context menu', () => {
  let page: Page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await openNewSpace(page);
  });

  test('can create a card', async () => {
    await createCardAndTypeInIt(page, cards[0], 'hello world');
    await expect(page.locator($.card)).toHaveCount(1);
  });

  test('right click on an item to see context menu', async () => {
    await page.click('#canvas');
    await page.click($.card, { button: 'right' });
    await expect(page.locator($.contextMenu)).toContainText('Link to');
    await expect(page.locator($.contextMenu)).toContainText('Copy');
    await expect(page.locator($.contextMenu)).toContainText('Cut');
    await expect(page.locator($.contextMenu)).toContainText('Delete');
  });

  test('can dismiss menu with esc', async () => {
    await page.keyboard.press('Escape');
    await expect(page.locator($.contextMenu)).toBeHidden();
  });
});
