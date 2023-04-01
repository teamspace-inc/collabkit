import { test, expect, Page, Locator } from '@playwright/test';
import { $, openNewSpace, toolSelectors } from './utils';

const CARDS = [
  { x: 90 + 250, y: 90, width: 50, height: 50 },
  { x: 400, y: 400, width: 50, height: 50 },
  { x: 600, y: 100, width: 50, height: 50 },
  { x: 300, y: 400, width: 50, height: 50 },
];

test.describe.serial('card', () => {
  let page1: Page;
  let url: string;
  let cards1: Locator;
  let modal1: Locator;

  test.beforeAll(async ({ browser }) => {
    page1 = await browser.newPage();
    cards1 = page1.locator($.card);
    modal1 = page1.locator($.modal);
  });

  test('can open a new space', async () => {
    url = await openNewSpace(page1);
  });

  test('is online', async () => {
    await expect(page1.locator($.online)).toHaveCount(1);
  });

  test('can create a card', async () => {
    await page1.click(toolSelectors['card']);
    await page1.mouse.click(CARDS[0].x, CARDS[0].y);
    await expect(cards1).toHaveCount(1);
  });

  test('can set the color of a card', async ({ browser }) => {
    await page1.mouse.click(CARDS[0].x, CARDS[0].y);
    await page1.mouse.click(CARDS[0].x, CARDS[0].y);

    await page1.click($.colorPicker);
    await page1.click($.colorPickerColor('amber'));

    await expect(page1.locator($.cardBackground)).toHaveCSS(
      'backgroundColor',
      'rgb(255, 227, 162)'
    );
  });
});
