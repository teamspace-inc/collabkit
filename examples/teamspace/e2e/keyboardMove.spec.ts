import { createShape, openNewSpace, $ } from './utils';
import { test, expect, Page, Locator } from '@playwright/test';

const CARDS = [
  { x: 90 + 250, y: 90, width: 50, height: 50 },
  { x: 400, y: 400, width: 50, height: 50 },
  { x: 600, y: 100, width: 50, height: 50 },
  { x: 300, y: 400, width: 50, height: 50 },
];

test.describe.serial('keyboard move', () => {
  let page: Page;
  let cards: Locator;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    cards = page.locator($.card);
  });

  test('can open a new space', async () => {
    await openNewSpace(page);
  });

  test('is online', async () => {
    await expect(page.locator($.online)).toHaveCount(1);
  });

  test('can create a card', async () => {
    await createShape(page, 'card', CARDS[0]);
  });

  ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].forEach((key) => {
    const expectedDelta = {
      ArrowUp: { x: 0, y: -1 },
      ArrowDown: { x: 0, y: 1 },
      ArrowLeft: { x: -1, y: 0 },
      ArrowRight: { x: 1, y: 0 },
    };

    const shiftModifier = 10;

    test(`can move an item by pressing ${key}`, async () => {
      const { x: initialX, y: initialY } = await cards.nth(0).boundingBox();
      await page.keyboard.press('Control+a');
      await page.keyboard.press(key);

      const { x, y } = await cards.nth(0).boundingBox();
      const newX = initialX + expectedDelta[key].x;
      const newY = initialY + expectedDelta[key].y;

      expect(x).toBeGreaterThanOrEqual(newX);
      expect(x).toBeLessThanOrEqual(newX);
      expect(y).toBeGreaterThanOrEqual(newY);
      expect(y).toBeLessThanOrEqual(newY);
    });

    test(`can move an item by pressing Meta+Shift+${key}`, async () => {
      const { x: initialX, y: initialY } = await cards.boundingBox();
      await page.keyboard.press('Control+a');
      await page.keyboard.press(`Control+Shift+${key}`);

      const { x, y } = await cards.nth(0).boundingBox();
      const newX = initialX + expectedDelta[key].x * shiftModifier;
      const newY = initialY + expectedDelta[key].y * shiftModifier;

      expect(x).toBeGreaterThanOrEqual(newX);
      expect(x).toBeLessThanOrEqual(newX);
      expect(y).toBeGreaterThanOrEqual(newY);
      expect(y).toBeLessThanOrEqual(newY);
    });
  });
});
