import { test, expect, Locator, Page } from '@playwright/test';
import { $, createShape, openNewSpace } from './utils';

const CARDS = [
  { x: 90 + 250, y: 90, width: 50, height: 50 },
  { x: 400, y: 400, width: 50, height: 50 },
  { x: 600, y: 100, width: 50, height: 50 },
  { x: 300, y: 400, width: 50, height: 50 },
];

test.describe.serial('editing', () => {
  let page: Page;
  let cards: Locator;
  let editing: Locator;
  let selected: Locator;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    cards = page.locator($.card);
    editing = page.locator($.isEditing);
    selected = page.locator($.selected);
  });

  async function resetSelection() {
    await page.locator('#canvas').click();
    await cards.nth(0).click();
    await expect(editing).toBeHidden();
    await expect(selected).toHaveCount(1);
  }

  test('can create a card', async () => {
    await openNewSpace(page);
    await createShape(page, 'card', CARDS[0]);
    await expect(cards).toHaveCount(1);
  });

  test('clicking a selected item starts editing mode', async () => {
    await resetSelection();
    await cards.nth(0).click();
    await expect(editing).toBeVisible();
    await expect(selected).toHaveCount(0);
  });

  ['Shift', 'Alt', 'Control', 'Meta', 'Shift+a', 'Alt+3', 'Control+c', 'Control+x'].forEach(
    (modifier) => {
      test(`pressing ${modifier} key, does not start editing a selected item`, async () => {
        await resetSelection();
        await page.keyboard.press(modifier);
        await expect(editing).toHaveCount(0);
      });
    }
  );

  [].forEach((modifier) => {
    test(`pressing ${modifier} key, starts editing a selected item`, async () => {
      await resetSelection();
      await page.keyboard.press(modifier);
      await expect(editing).toHaveCount(0);
    });
  });
});
