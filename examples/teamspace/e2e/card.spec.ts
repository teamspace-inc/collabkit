import { test, expect, Page, Locator } from '@playwright/test';
import { $, createShape, getBounds, openNewSpace, toolSelectors } from './utils';

const CARDS = [
  { x: 90 + 250, y: 90, width: 50, height: 50 },
  { x: 400, y: 400, width: 50, height: 50 },
  { x: 600, y: 100, width: 50, height: 50 },
  { x: 300, y: 400, width: 50, height: 50 },
];

test.describe.serial('card', () => {
  let page1: Page;
  let page2: Page;
  let url: string;
  let cards1: Locator;
  let cards2: Locator;
  let modal1: Locator;

  test.beforeAll(async ({ browser }) => {
    page1 = await browser.newPage();
    cards1 = page1.locator(`${$.card} ${$.yTextEditor}`);
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

  test('can see created card in another client', async ({ browser }) => {
    const context2 = await browser.newContext();
    page2 = await context2.newPage();
    await page2.goto(url);
    cards2 = page2.locator($.card);

    await expect(cards2).toHaveCount(1);
  });

  test('can create cards in the other client and see them in the original client', async () => {
    await createShape(page2, 'card', CARDS[1]);
    await createShape(page2, 'card', CARDS[2]);
    await createShape(page2, 'card', CARDS[3]);

    await expect(cards1).toHaveCount(4);
    await expect(cards2).toHaveCount(4);
  });

  test('placed cards have the same bounds in both clients', async () => {
    const bounds1 = await getBounds(page1, 'card');
    const bounds2 = await getBounds(page2, 'card');
    expect(bounds1).toStrictEqual(bounds2);
  });

  test('can double click a card to start editing it', async () => {
    await page1.keyboard.press('Escape');
    await page1.mouse.click(CARDS[0].x, CARDS[0].y);
    await page1.mouse.click(CARDS[0].x, CARDS[0].y);
  });

  test('writing in a card in one client is reflected in the other client', async () => {
    await cards1.nth(0).type('Hello World');
    await expect(cards2.nth(0)).toHaveText('Hello World');
  });

  test('can open a card modal by pressing Control+o', async () => {
    await page1.locator('#canvas').click();
    await page1.mouse.click(CARDS[0].x, CARDS[0].y);
    await page1.keyboard.press('Control+o');

    await expect(modal1).toBeVisible();
    await expect(modal1.locator($.yTextEditor)).toHaveText('Hello World');
  });

  test('can close card modal by pressing `Escape` twice', async () => {
    await expect(modal1).toBeVisible();
    await page1.keyboard.press('Escape');
    await page1.keyboard.press('Escape');
    await expect(modal1).toBeHidden();
  });

  test('can reopen card modal', async () => {
    await page1.keyboard.press('Control+o');

    await expect(modal1).toBeVisible();
    await expect(modal1.locator($.yTextEditor)).toHaveText('Hello World');
  });

  // test('can also close modal by pressing `Control+o`', async () => {
  //   await page1.keyboard.press('Control+o');
  //   await expect(modal1).toBeHidden();
  // });
});
