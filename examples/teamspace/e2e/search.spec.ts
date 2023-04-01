import { test, expect, Page, Locator } from '@playwright/test';
import { createCardAndTypeInIt, $, openNewSpace } from './utils';

const CARDS = [
  { x: 90 + 250, y: 90, width: 50, height: 50 },
  { x: 400, y: 400, width: 50, height: 50 },
  { x: 600, y: 100, width: 50, height: 50 },
  { x: 300, y: 400, width: 50, height: 50 },
];

test.describe.serial('search', () => {
  let page: Page;
  let searchBarInput: Locator;
  let cards: Locator;
  let sidebarSearch: Locator;
  let firstSearchResult: Locator;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    searchBarInput = page.locator($.searchBarInput);
    cards = page.locator($.card);
    sidebarSearch = page.locator($.sidebarSearch);
    firstSearchResult = page.locator($.searchBarResult(0));
  });

  test('can open a new space', async () => {
    await openNewSpace(page);
  });

  test('is online', async () => {
    await expect(page.locator($.online)).toHaveCount(1);
  });

  test('open search bar with control+k', async () => {
    await expect(searchBarInput).toBeHidden();
    await page.keyboard.press('Control+k');
    await expect(searchBarInput).toBeVisible();
  });

  test('close search bar with control+k', async () => {
    await expect(searchBarInput).toBeVisible();
    await page.keyboard.press('Control+k');
    await expect(searchBarInput).toBeHidden();
  });

  test('open search bar by clicking `quick search`', async () => {
    await expect(searchBarInput).toBeHidden();
    await sidebarSearch.click();
    await expect(searchBarInput).toBeVisible();
  });

  test('close search by pressing `Escape`', async () => {
    await expect(searchBarInput).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(searchBarInput).toBeHidden();
  });

  test('create 4 cards', async () => {
    await createCardAndTypeInIt(page, CARDS[0], '# Foobar');
    await createCardAndTypeInIt(page, CARDS[1], '# Another title');
    await createCardAndTypeInIt(page, CARDS[2], '# This one has a body \n And a body here');
    await createCardAndTypeInIt(page, CARDS[3], '# Something');
    await page.waitForTimeout(250);
    await expect(cards).toHaveCount(4);
  });

  test('type to search and find cards', async () => {
    await expect(firstSearchResult).toBeHidden();
    await sidebarSearch.click();
    await page.keyboard.type('Foobar', { delay: 25 });
    await expect(firstSearchResult).toBeVisible();
    await expect(firstSearchResult).toHaveText(' Foobar No description');
  });

  test('ensure deleted items are not in search results', async () => {
    await page.keyboard.press('Escape');
    await page.mouse.click(CARDS[0].x, CARDS[0].y);
    await page.keyboard.press('Backspace');
    await expect(cards).toHaveCount(3);
    await page.keyboard.press('Control+k');
    await expect(firstSearchResult).toBeHidden();
  });

  test('updating a card updates search results', async () => {
    await expect(cards).toHaveCount(3);
    await page.keyboard.press('Escape');
    await page.mouse.click(CARDS[2].x, CARDS[2].y);
    await page.mouse.click(CARDS[2].x, CARDS[2].y);
    await expect(page.locator($.isEditing)).toBeVisible();
    await page.keyboard.press('Control+a');
    await page.keyboard.press('Backspace');
    await page.keyboard.type('# Mars!');
    await page.waitForTimeout(250);
    await page.keyboard.press('Control+k');
    await page.keyboard.type('Mars');
    await expect(firstSearchResult).toBeVisible();
    await expect(firstSearchResult).toContainText('Mars!');
  });

  test('blank cards show up as `Untitled` in search results', async () => {
    await page.keyboard.press('Escape');
    await page.keyboard.press('Escape');
    await createCardAndTypeInIt(page, CARDS[0], '\nJust an idea');
    await page.keyboard.press('Control+k');
    await page.keyboard.type('Just an idea', { delay: 25 });
    await expect(firstSearchResult).toBeVisible();
    await expect(firstSearchResult).toContainText('Untitled Just an idea');
  });

  // This test is last because it pans the canvas and would cause the
  // other tests relying on coordinates to fail.
  test('ArrowDown + Enter to navigate to the first result', async () => {
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    await expect(firstSearchResult).toBeHidden();
    await expect(page.locator($.selected)).toBeVisible();
  });
});
