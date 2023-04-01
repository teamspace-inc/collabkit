import { test, expect, Page, Locator } from '@playwright/test';
import { createCardAndTypeInIt, openNewSpace, renameSpace, $ } from './utils';

const CARDS = [
  { x: 90 + 250, y: 90, width: 50, height: 50 },
  { x: 400, y: 400, width: 50, height: 50 },
  { x: 600, y: 100, width: 50, height: 50 },
  { x: 300, y: 400, width: 50, height: 50 },
];

test.describe.serial('sidebar', () => {
  let page: Page;
  let spaces: Locator;
  let addSpace: Locator;
  let cards: Locator;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    spaces = page.locator($.sidebarSpace);
    addSpace = page.locator($.sidebarAddSpace);
    cards = page.locator($.card);
  });

  test('can open a new space', async () => {
    await openNewSpace(page);
  });

  test('is online', async () => {
    await expect(page.locator($.online)).toHaveCount(1);
  });

  test('can see spaces in the sidebar', async () => {
    await expect(spaces.first()).toHaveText('Untitled');
  });

  test('name the space `Journal`', async () => {
    await renameSpace(page, 'Journal');
  });

  test('can add a space', async () => {
    await addSpace.click();
    await expect(spaces).toHaveCount(2);
    await expect(spaces.nth(0)).toHaveText('Journal');
    await expect(spaces.nth(1)).toHaveText('Untitled');
  });

  test('can rename a space', async () => {
    await renameSpace(page, 'Apollo');
    await expect(spaces.nth(0)).toHaveText('Journal');
    await expect(spaces.nth(1)).toHaveText('Apollo');
    await page.keyboard.press('Escape');
  });

  test('can hide a space', async () => {
    await spaces.last().hover();
    await page.locator($.sidebarSpace).nth(1).click({ button: 'right' });
    await page.locator($.contextMenu).locator('text=Hide').click();
    await expect(spaces).toHaveCount(1);
  });

  test('can see cards in the sidebar', async () => {
    await page.reload(); // this is broken without this reload, seems like switching spaces breaks item creation

    const sidebarItem1 = page.locator($.sidebarCard).nth(0);
    const sidebarItem2 = page.locator($.sidebarCard).nth(1);

    await expect(sidebarItem1).toBeHidden();

    await createCardAndTypeInIt(page, CARDS[0], '');

    await expect(cards).toHaveCount(1);

    await expect(sidebarItem1).toBeVisible();
    await expect(sidebarItem1).toHaveText('Untitled');

    await createCardAndTypeInIt(page, CARDS[1], '# Project Plan');

    await page.waitForTimeout(250);

    await page.click('#canvas');

    await expect(cards).toHaveCount(2);

    // most recently created is first
    await expect(sidebarItem1).toBeVisible();
    await expect(sidebarItem1).toHaveText('Project Plan');

    await expect(sidebarItem2).toBeVisible();
    await expect(sidebarItem2).toHaveText('Untitled');
  });
});
