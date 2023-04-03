import { test, expect, Page, Locator } from '@playwright/test';
import { createShape, openNewSpace, $ } from './utils';

const CARDS = [
  { x: 90 + 250, y: 90, width: 50, height: 50 },
  { x: 400, y: 400, width: 50, height: 50 },
  { x: 600, y: 100, width: 50, height: 50 },
  { x: 300, y: 400, width: 50, height: 50 },
];

test.describe.serial('undo', () => {
  let page: Page;
  let cards: Locator;
  let stickies: Locator;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    cards = page.locator($.card);
    stickies = page.locator($.sticky);
  });

  test('can open a new space', async () => {
    await openNewSpace(page);
  });

  test('is online', async () => {
    await expect(page.locator($.online)).toHaveCount(1);
  });

  test.describe('single card', () => {
    test('can create a card', async () => {
      await createShape(page, 'card', CARDS[0]);
      await expect(cards).toHaveCount(1);
    });

    test('can undo creating that card', async () => {
      await page.keyboard.press('Control+z');
      await expect(cards).toHaveCount(0);
    });

    test('can redo creating that card', async () => {
      await page.keyboard.press('Control+Shift+z');
      await expect(cards).toHaveCount(1);
    });

    test('can write some text in the card', async () => {
      await cards.nth(0).click();
      await cards.nth(0).click();
      await cards.nth(0).type('Hello World', { delay: 25 });
      await expect(cards.nth(0)).toHaveText('Hello World');
    });

    test('can undo writing the text', async () => {
      await page.keyboard.press('Control+z');
      await expect(cards.nth(0)).toHaveText('');
    });

    test('can redo writing the text', async () => {
      await page.keyboard.press('Control+Shift+z');
      await expect(cards.nth(0)).toHaveText('Hello World');
    });
  });

  test.describe('now with multiple cards', () => {
    test('create 2 more cards', async () => {
      await createShape(page, 'card', CARDS[1]);
      await createShape(page, 'card', CARDS[2]);
      await expect(cards).toHaveCount(3);
    });

    test('can undo creating those cards', async () => {
      await page.keyboard.press('Control+z');
      await page.keyboard.press('Control+z');
      await expect(cards).toHaveCount(1);
    });

    test('can redo creating those cards', async () => {
      await page.keyboard.press('Control+Shift+z');
      await page.keyboard.press('Control+Shift+z');
      await expect(cards).toHaveCount(3);
    });
  });

  test.describe('and with stickies too', async () => {
    test('create a sticky', async () => {
      await createShape(page, 'sticky', CARDS[3]);
      await expect(cards).toHaveCount(3);
      await expect(stickies).toHaveCount(1);
    });

    test('can undo creating that sticky', async () => {
      await page.keyboard.press('Control+z');
      await expect(stickies).toHaveCount(0);
    });

    test('can redo creating that sticky', async () => {
      await page.keyboard.press('Control+Shift+z');
      await expect(stickies).toHaveCount(1);
    });
  });
});
