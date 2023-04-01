import { test, expect, Page, Locator } from '@playwright/test';
import { createCardAndTypeInIt, $, openNewSpace } from './utils';

const CARDS = [
  { x: 90 + 250, y: 90, width: 50, height: 50 },
  { x: 400, y: 400, width: 50, height: 50 },
  { x: 600, y: 100, width: 50, height: 50 },
  { x: 300, y: 400, width: 50, height: 50 },
];

const methods = {
  click: (page: Page) => page.locator($.autocompleteListItem).nth(0).click(),
  enter: (page: Page) => page.keyboard.press('Enter'),
  tab: (page: Page) => page.keyboard.press('Tab'),
};

test.describe.serial('autocomplete', () => {
  let page: Page;
  let cards: Locator;
  let autocomplete: Locator;
  let autocompleteListItem: Locator;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    cards = page.locator($.card);
    autocomplete = page.locator($.autocomplete);
    autocompleteListItem = page.locator($.autocompleteListItem);
  });

  test('can open a new space', async () => {
    await openNewSpace(page);
  });

  test('is online', async () => {
    await expect(page.locator($.online)).toHaveCount(1);
  });

  test('can create 3 cards', async () => {
    await createCardAndTypeInIt(page, CARDS[0], '# Mars');
    await createCardAndTypeInIt(page, CARDS[1], '# Venus');
  });

  for (const method in methods) {
    test(`can see autocompletes & mention a card using ${method}`, async () => {
      await expect(autocomplete).toBeHidden();
      await createCardAndTypeInIt(page, CARDS[2], '@ Ma');

      await expect(autocomplete).toBeVisible();
      await expect(autocompleteListItem.nth(0)).toHaveText('Mars');

      await methods[method](page);

      await page.waitForTimeout(250);

      await expect(cards.nth(2)).toHaveText('Mars');
      await expect(autocomplete).toBeHidden();

      await page.keyboard.press('Escape');
      await page.keyboard.press('Escape');

      await cards.nth(2).click();
      await cards.nth(2).press('Backspace');
    });
  }

  test('can dismiss autocomplete by pressing Escape', async () => {
    await expect(autocomplete).toBeHidden();
    await createCardAndTypeInIt(page, CARDS[2], '@ Ma');

    await expect(autocomplete).toBeVisible();

    await page.keyboard.press('Escape');

    await expect(autocomplete).toBeHidden();

    await page.keyboard.press('Escape');
    await page.keyboard.press('Escape');
    await cards.nth(2).click();
    await cards.nth(2).press('Backspace');
  });

  test('can dismiss autocomplete by deleting `@` that triggered it', async () => {
    await expect(autocomplete).toBeHidden();
    await createCardAndTypeInIt(page, CARDS[2], '@ Ma');

    await expect(autocomplete).toBeVisible();

    await page.keyboard.press('Backspace');
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Backspace');

    await expect(autocomplete).toBeHidden();

    await page.keyboard.press('Escape');
    await page.keyboard.press('Escape');
    await cards.nth(2).click();
    await cards.nth(2).press('Backspace');
  });

  test('can dismiss autocomplete but keep text by pressing `Enter` when there are no results', async () => {
    await expect(autocomplete).toBeHidden();
    await createCardAndTypeInIt(page, CARDS[2], '@ Fo');

    await expect(autocomplete).toBeVisible();
    await expect(autocompleteListItem).toHaveCount(0);

    await page.keyboard.press('Enter');

    await expect(autocomplete).toBeHidden();
    await expect(cards.nth(2)).toHaveText('@ Fo');

    await page.keyboard.press('Escape');
    await page.keyboard.press('Escape');
    await cards.nth(2).click();
    await cards.nth(2).press('Backspace');
  });
});
