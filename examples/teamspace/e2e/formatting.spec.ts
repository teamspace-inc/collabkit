import { test, expect, Locator, Page } from '@playwright/test';
import { createCardAndTypeInIt, openNewSpace, $ } from './utils';

const CARDS = [
  { x: 90 + 250, y: 90, width: 50, height: 50 },
  { x: 400, y: 400, width: 50, height: 50 },
  { x: 600, y: 100, width: 50, height: 50 },
  { x: 300, y: 400, width: 50, height: 50 },
];

test.describe.serial('formatting toolbar', () => {
  let page: Page;
  let cards: Locator;
  let formattingToolbar: Locator;
  let numberedList: Locator;
  let numberedListOption: Locator;
  let blockTypeSelect: Locator;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    cards = page.locator($.card);
    formattingToolbar = page.locator($.formattingToolbar);
    numberedList = page.locator(`${$.card} ol li`);
    numberedListOption = page.locator($.formattingToolbarOption('ol'));
    blockTypeSelect = page.locator($.formattingToolbarSelect);
  });

  test('can open a new space', async () => {
    await openNewSpace(page);
  });

  test('is online', async () => {
    await expect(page.locator($.online)).toHaveCount(1);
  });

  test('can create a card', async () => {
    await expect(formattingToolbar).toBeHidden();
    await createCardAndTypeInIt(
      page,
      CARDS[0],
      "Dozens of Ukrainian soldiers are killed as the government vowed an “all-out defense.” NATO's secretary general condemned the “reckless and unprovoked attack” by Russia."
    );
  });

  test('can see formatting toolbar while editing a card', async () => {
    await expect(formattingToolbar).toBeVisible();
    await expect(formattingToolbar).toHaveText('Title');
  });

  test('shows the current block type', async () => {
    await expect(formattingToolbar).toBeVisible();
    await expect(formattingToolbar).toHaveText('Title');
  });

  test('can change the block type', async () => {
    await expect(numberedList).toBeHidden();
    await expect(formattingToolbar).toBeVisible();
    await blockTypeSelect.click();
    await numberedListOption.click();
    await expect(numberedList).toContainText('Dozens of Ukrainian');
  });
});
