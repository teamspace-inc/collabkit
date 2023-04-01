import { test, expect, Page, Locator } from '@playwright/test';
import { $, createShape, getBounds, openNewSpace, openSpace } from './utils';

const boxes = [
  { x: 90 + 250, y: 90, width: 50, height: 50 },
  { x: 400, y: 400, width: 50, height: 50 },
  { x: 600, y: 100, width: 50, height: 50 },
  { x: 300, y: 400, width: 50, height: 50 },
];

test.describe.serial('stickies', () => {
  let page1, page2: Page;
  let stickies1, stickies2: Locator;

  test.beforeAll(async ({ browser }) => {
    page1 = await browser.newPage();
    stickies1 = page1.locator($.sticky);
  });

  test('can open a new space', async () => {
    await openNewSpace(page1);
  });

  test('is online', async () => {
    await expect(page1.locator($.online)).toHaveCount(1);
  });

  test('can place a sticky note', async () => {
    await createShape(page1, 'sticky', boxes[0]);
    await expect(stickies1).toHaveCount(1);
  });

  test('can see the sticky note in another client', async ({ browser }) => {
    const context2 = await browser.newContext();
    page2 = await context2.newPage();
    stickies2 = page2.locator($.sticky);
    await openSpace(page2, page1.url());
    expect(stickies1).toHaveCount(1);
    expect(stickies2).toHaveCount(1);
  });

  test('can place another sticky note and see it in the other client', async () => {
    await createShape(page2, 'sticky', boxes[1]);
    await createShape(page2, 'sticky', boxes[2]);
    await createShape(page2, 'sticky', boxes[3]);
    await expect(stickies2).toHaveCount(4);
    await expect(stickies1).toHaveCount(4);
  });

  test('stickies are in the same position', async () => {
    const bounds1 = await getBounds(page1, 'sticky');
    const bounds2 = await getBounds(page2, 'sticky');
    expect(bounds1).toStrictEqual(bounds2);
  });

  test('can write in a sticky note, and see it in the other client', async () => {
    await stickies1.nth(0).click();
    await stickies1.nth(0).type('hello world');
    await expect(stickies2.nth(0)).toHaveText('hello world');
  });
});
