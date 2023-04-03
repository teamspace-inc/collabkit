import { test, expect } from '@playwright/test';
import { createShape, CARD_SELECTOR, openNewSpace, openSpace } from './utils';

const cards = [
  { x: 90 + 250, y: 90, width: 50, height: 50 },
  { x: 400, y: 400, width: 50, height: 50 },
  { x: 600, y: 100, width: 50, height: 50 },
  { x: 300, y: 400, width: 50, height: 50 },
];

test('can a move an item', async ({ page }) => {
  await openNewSpace(page);
  const pageCards = page.locator(CARD_SELECTOR);
  await createShape(page, 'card', cards[0]);

  const { x: initialX, y: initialY } = await pageCards.boundingBox();
  await page.mouse.move(initialX + 50, initialY + 50);
  await page.mouse.down();
  await page.mouse.move(initialX + 150, initialY + 150, { steps: 10 });
  await page.mouse.up();

  const { x, y } = await pageCards.boundingBox();
  const newX = initialX + 100;
  const newY = initialY + 100;
  expect(x).toBeGreaterThanOrEqual(newX - 2);
  expect(x).toBeLessThanOrEqual(newX + 2);
  expect(y).toBeGreaterThanOrEqual(newY - 2);
  expect(y).toBeLessThanOrEqual(newY + 2);
});

// namit: this test is really flaky
// it works locally but fails in the test
// commenting out for now

// test('canceling a move preserves initial position', async ({ page: page1, browser }) => {
//   const context2 = await browser.newContext();
//   const page2 = await context2.newPage();

//   const url = await openNewSpace(page1);
//   await openSpace(page2, url);
//   const page1Cards = page1.locator(CARD_SELECTOR);
//   const page2Cards = page2.locator(CARD_SELECTOR);
//   await createShape(page1, 'card', cards[0]);

//   const { x: initialX, y: initialY } = await page1Cards.boundingBox();
//   await page1.mouse.move(initialX + 50, initialY + 50);
//   await page1.mouse.down();
//   await page1.mouse.move(initialX + 150, initialY + 150, { steps: 10 });
//   await page1.keyboard.press('Escape');
//   await page1.mouse.up();

//   await page1.waitForTimeout(1000);

//   const bounds1 = await page1Cards.boundingBox();
//   expect(bounds1.x).toBeGreaterThanOrEqual(initialX - 2);
//   expect(bounds1.x).toBeLessThanOrEqual(initialX + 2);
//   expect(bounds1.y).toBeGreaterThanOrEqual(initialY - 2);
//   expect(bounds1.y).toBeLessThanOrEqual(initialY + 2);

//   await page2.waitForTimeout(2000);

//   const bounds2 = await page2Cards.boundingBox();
//   expect(bounds2).toStrictEqual(bounds1);
// });

// test('move is shared in realtime', async ({ page: page1, browser }) => {
//   const context2 = await browser.newContext();
//   const page2 = await context2.newPage();

//   const url = await openNewSpace(page1);
//   await openSpace(page2, url);

//   const page2Cards = page2.locator(CARD_SELECTOR);

//   await createShape(page1, 'card', cards[0]);
//   await page2.waitForTimeout(500);
//   await expect(page2Cards).toHaveCount(1);
//   let { x, y } = await page2Cards.boundingBox();
//   const offset = 50;

//   await page1.mouse.move(x + offset, y + offset);
//   await page1.mouse.down();

//   x += 20;
//   y += 20;
//   await page1.mouse.move(x + offset, y + offset, { steps: 4 });
//   await page2.waitForTimeout(500);
//   let box = await page2Cards.boundingBox();
//   expect(box.x).toBe(x);
//   expect(box.y).toBe(y);

//   x += 30;
//   y -= 20;
//   await page1.mouse.move(x + offset, y + offset, { steps: 4 });
//   await page2.waitForTimeout(500);
//   box = await page2Cards.boundingBox();
//   expect(box.x).toBe(x);
//   expect(box.y).toBe(y);

//   await page1.mouse.up();
//   await page2.waitForTimeout(500);
//   box = await page2Cards.boundingBox();
//   expect(box.x).toBe(x);
//   expect(box.y).toBe(y);
// });
