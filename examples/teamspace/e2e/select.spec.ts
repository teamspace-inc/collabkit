import { test, expect, Page, Locator } from '@playwright/test';
import {
  $,
  createShape,
  BOUNDS_SELECTOR,
  openNewSpace,
  CARD_SELECTOR,
  SELECTED_SELECTOR,
} from './utils';

const CARDS = [
  { x: 90 + 250, y: 90, width: 50, height: 50 },
  { x: 400, y: 400, width: 50, height: 50 },
  { x: 800, y: 100, width: 50, height: 50 },
  { x: 800, y: 400, width: 50, height: 50 },
];

test.describe.serial('select', () => {
  let page: Page;
  let cards: Locator;
  let selectBox: Locator;
  let cardsSelected: Locator;
  let cardsBounds: Locator;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    cards = page.locator($.card);
    selectBox = page.locator(`${BOUNDS_SELECTOR} .tl-centered-g`);
    cardsSelected = page.locator(SELECTED_SELECTOR);
    cardsBounds = page.locator(`${CARD_SELECTOR} [data-testid="YTextEditor"]`);
  });

  test('can open a new space', async () => {
    await openNewSpace(page);
  });

  test('is online', async () => {
    await expect(page.locator($.online)).toHaveCount(1);
  });

  test('creating a card selects it', async () => {
    await expect(selectBox).toBeHidden();
    await createShape(page, 'card', CARDS[0]);
    await expect(selectBox).toBeVisible();
  });

  test('unselect all', async () => {
    await page.click('#canvas');
    await expect(selectBox).toBeHidden();
  });

  test('press Control+a to select all', async () => {
    await page.keyboard.press('Control+a');
    await expect(cardsSelected).toHaveCount(1);

    const bounds = await selectBox.boundingBox();
    const cardBounds = await cardsBounds.boundingBox();
    expect(Math.abs(bounds.x - cardBounds.x) < 1).toBe(true);
    expect(Math.abs(bounds.y - cardBounds.y) < 1).toBe(true);
    expect(Math.abs(bounds.width - cardBounds.width) < 1).toBe(true);
    expect(Math.abs(bounds.height - cardBounds.height) < 1).toBe(true);
  });

  test('create 3 more cards', async () => {
    await createShape(page, 'card', CARDS[1]);
    await createShape(page, 'card', CARDS[2]);
    await createShape(page, 'card', CARDS[3]);
  });

  test('hold shift to select / deselect an additional card', async () => {
    await page.click('#canvas');
    await expect(cards).toHaveCount(4);
    await expect(cardsSelected).toHaveCount(0);

    await cards.nth(0).click();
    await expect(cardsSelected).toHaveCount(1);

    await page.keyboard.down('Shift');
    await cards.nth(1).click();

    await expect(cardsSelected).toHaveCount(2);
    await cards.nth(1).click();
    await expect(cardsSelected).toHaveCount(1);
    await page.keyboard.up('Shift');
  });

  test('double click on a card to start editing it', async () => {
    await cards.nth(0).click();
    await cards.nth(0).click();

    await expect(cardsSelected).toHaveCount(0);
    await expect(page.locator($.isEditing)).toBeVisible();
  });

  test('clicking another card, while editing one, selects it and stops editing the original card', async () => {
    await cards.nth(2).click();

    await expect(cardsSelected).toHaveCount(1);
    await expect(page.locator($.isEditing)).toBeHidden();

    const bounds = await selectBox.boundingBox();
    const cardBounds = await cardsBounds.nth(2).boundingBox();

    expect(Math.abs(bounds.x - cardBounds.x) < 1).toBe(true);
    expect(Math.abs(bounds.y - cardBounds.y) < 1).toBe(true);
    expect(Math.abs(bounds.width - cardBounds.width) < 1).toBe(true);
    expect(Math.abs(bounds.height - cardBounds.height) < 1).toBe(true);
  });

  test('can drag to select', async () => {
    await page.click('#canvas');
    await expect(selectBox).toHaveCount(0);
    await expect(cardsSelected).toHaveCount(0);

    await page.mouse.move(300, 50);
    await page.mouse.down();
    await page.mouse.move(400, 400, { steps: 10 });
    await page.mouse.up();

    await expect(selectBox).toHaveCount(1);
    await expect(cardsSelected).toHaveCount(2);
  });

  test('add to selection by holding down Shift', async () => {
    await page.keyboard.down('Shift');
    await cards.nth(3).click();
    await page.keyboard.up('Shift');

    await expect(selectBox).toHaveCount(1);
    await expect(cardsSelected).toHaveCount(3);
  });

  test('add deselect selected items by holding down Shift and clicking them', async () => {
    await page.keyboard.down('Shift');
    await cards.nth(1).click();
    await page.keyboard.up('Shift');

    await expect(selectBox).toHaveCount(1);
    await expect(cardsSelected).toHaveCount(2);
  });
});
