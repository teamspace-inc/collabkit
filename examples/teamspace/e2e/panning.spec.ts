import { Page, test, expect, Locator } from '@playwright/test';
import { openNewSpace, $ } from './utils';

async function panCanvas(
  page: Page,
  { x, y, panX, panY }: { x: number; y: number; panX: number; panY: number }
) {
  await page.mouse.move(x, y);
  await page.keyboard.down(' ');
  await page.mouse.down();
  await page.mouse.move(x + panX, y + panY, { steps: 10 });
  await page.mouse.up();
  await page.keyboard.up(' ');
}

test.describe.serial('panning', () => {
  let page: Page;
  let cards: Locator;
  let canvas: Locator;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    cards = page.locator($.card);
    canvas = page.locator($.canvas);
  });

  test('can open a new space', async () => {
    await openNewSpace(page);
  });

  test('is online', async () => {
    await expect(page.locator($.online)).toHaveCount(1);
  });

  [
    [100, 200],
    [-100, 0],
    [0, 100],
    [-200, -50],
  ].forEach((panBy) => {
    test(`pan by ${panBy.join(', ')}`, async () => {
      const [panX, panY] = panBy;

      const before = await canvas.boundingBox();

      await panCanvas(page, { x: 500, y: 500, panX, panY });

      const after = await canvas.boundingBox();

      expect(before.x).toStrictEqual(after.x - panX);
      expect(before.y).toStrictEqual(after.y - panY);
    });
  });
});
