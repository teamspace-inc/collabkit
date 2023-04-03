import { test, expect } from '@playwright/test';
import { createShape, CARD_SELECTOR, openNewSpace } from './utils';

const CARDS = [
  { x: 90 + 250, y: 90, width: 50, height: 50 },
  { x: 400, y: 400, width: 50, height: 50 },
  { x: 600, y: 100, width: 50, height: 50 },
  { x: 300, y: 400, width: 50, height: 50 },
];

test('can clone a card', async ({ page }) => {
  await openNewSpace(page);
  const cards = page.locator(CARD_SELECTOR);
  await createShape(page, 'card', CARDS[0]);
  await expect(cards).toHaveCount(1);

  const { x: initialX, y: initialY } = await cards.boundingBox();
  await page.keyboard.down('Alt');
  await page.mouse.move(initialX + 50, initialY + 50);
  await page.mouse.down();
  await page.mouse.move(initialX + 150, initialY + 150, { steps: 10 });
  await page.mouse.up();
  await page.keyboard.up('Alt');

  await expect(cards).toHaveCount(2);

  const { x: x0, y: y0 } = await cards.nth(0).boundingBox();
  expect(x0).toBeGreaterThanOrEqual(initialX);
  expect(y0).toBeGreaterThanOrEqual(initialY);

  const { x: x1, y: y1 } = await cards.nth(1).boundingBox();
  const newX = initialX + 100;
  const newY = initialY + 100;
  expect(x1).toBeGreaterThanOrEqual(newX - 2);
  expect(x1).toBeLessThanOrEqual(newX + 2);
  expect(y1).toBeGreaterThanOrEqual(newY - 2);
  expect(y1).toBeLessThanOrEqual(newY + 2);
});
