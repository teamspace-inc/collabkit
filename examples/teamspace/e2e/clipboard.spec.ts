import { test, expect } from '@playwright/test';
import { CARD_SELECTOR, openNewSpace, createCardAndTypeInIt } from './utils';

const cards = [
  { x: 90 + 250, y: 90, width: 50, height: 50 },
  { x: 400, y: 400, width: 50, height: 50 },
  { x: 600, y: 100, width: 50, height: 50 },
  { x: 300, y: 400, width: 50, height: 50 },
];

test.describe('clipboard, using keyboard', () => {
  test('copy + paste', async ({ page }) => {
    await openNewSpace(page);

    await createCardAndTypeInIt(page, cards[0], 'hello world');
    expect(await page.locator(CARD_SELECTOR).count()).toBe(1);

    // select the text box
    await page.click('#canvas');
    await page.press('body', 'Control+a');
    await page.waitForTimeout(250);

    // copy
    await page.press('body', 'Control+c');
    await page.waitForTimeout(250);

    // paste
    await page.press('body', 'Control+v');
    await page.waitForTimeout(250);

    // check we have two now & text is copied
    expect(await page.locator(CARD_SELECTOR).count()).toBe(2);
    expect(await page.locator(CARD_SELECTOR).allTextContents()).toStrictEqual([
      'hello world',
      'hello world',
    ]);

    const texts = await page.$$(CARD_SELECTOR);

    const textBox0 = await texts[0].boundingBox();
    const textBox1 = await texts[1].boundingBox();

    expect(textBox1.x - textBox0.x).toStrictEqual(10);
    expect(textBox1.y - textBox0.y).toStrictEqual(10);
  });

  test('cut + paste', async ({ page }) => {
    await openNewSpace(page);

    await createCardAndTypeInIt(page, cards[0], 'hello world');
    await page.waitForTimeout(250);
    await expect(page.locator(CARD_SELECTOR)).toBeVisible();
    const textBoxBefore = await page.locator(CARD_SELECTOR).boundingBox();

    // select the text box
    await page.click('#canvas');
    await page.press('body', 'Control+a');
    await page.waitForTimeout(250);

    // cut it
    await page.press('body', 'Control+x');
    await page.waitForTimeout(250);
    expect(await page.locator(CARD_SELECTOR)).toBeHidden();

    // paste it
    await page.press('body', 'Control+v');
    await page.waitForTimeout(500);

    // check it's there and is in the same position
    expect(await page.locator(CARD_SELECTOR).count()).toBe(1);
    expect(await page.locator(CARD_SELECTOR).allTextContents()).toStrictEqual(['hello world']);
    const textBoxAfter = await page.locator(CARD_SELECTOR).boundingBox();
    expect(textBoxAfter.x - textBoxBefore.x).toStrictEqual(0);
    expect(textBoxAfter.y - textBoxBefore.y).toStrictEqual(0);
  });
});

test.describe('clipboard, using mouse', () => {
  test('copy + paste', async ({ page }) => {
    await openNewSpace(page);

    // add a text box
    await createCardAndTypeInIt(page, cards[0], 'hello world');
    expect(await page.locator(CARD_SELECTOR).count()).toBe(1);

    // copy it
    await page.click('#canvas');
    await page.mouse.click(cards[0].x, cards[0].y, { button: 'right' });
    await page.click('text=Copy');

    // paste it
    await page.locator('#canvas').click({ button: 'right' });
    await page.click('text="Paste"');

    // check there are two
    await page.waitForTimeout(500);
    expect(await page.locator(CARD_SELECTOR).count()).toBe(2);
  });

  test('cut + paste', async ({ page }) => {
    await openNewSpace(page);

    // add a text box
    await createCardAndTypeInIt(page, cards[0], 'hello world');
    expect(await page.locator(CARD_SELECTOR).count()).toBe(1);

    // cut it
    await page.click('#canvas');
    await page.mouse.click(cards[0].x, cards[0].y, { button: 'right' });
    await page.click('text=Cut');

    // check it's hidden
    expect(await page.locator(CARD_SELECTOR)).toBeHidden();

    // paste it
    await page.mouse.click(500, 500, { button: 'right' });
    await page.click('text="Paste"');

    // check it's been pasted
    const textBox = await page.locator(CARD_SELECTOR).boundingBox();
    await page.waitForTimeout(500);
    expect(await page.locator(CARD_SELECTOR).count()).toBe(1);
    expect(textBox.x).toBe(500);
    expect(textBox.y).toBe(500);
  });
});
