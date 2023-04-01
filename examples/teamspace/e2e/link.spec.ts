import { test, expect } from '@playwright/test';
import { $, createCardAndTypeInIt, openNewSpace, toolSelectors, useSelectors } from './utils';

const CARDS = [
  { x: 90 + 250, y: 90, width: 50, height: 50 },
  { x: 400, y: 400, width: 50, height: 50 },
  { x: 800, y: 100, width: 50, height: 50 },
  { x: 800, y: 500, width: 50, height: 50 },
];

test('can link and unlink two cards using context menu > link', async ({ page }) => {
  await openNewSpace(page);
  const { cards, links, linkMenuItem, unlinkMenuItem } = useSelectors(page);
  await expect(links).toHaveCount(0);
  await createCardAndTypeInIt(page, CARDS[0], 'hello world');
  await createCardAndTypeInIt(page, CARDS[1], 'hello mars');
  await expect(cards).toHaveCount(2);
  await page.click('#canvas');
  await page.keyboard.down('Shift');
  await cards.nth(0).click();
  await cards.nth(1).click({ button: 'right' });
  await page.keyboard.up('Shift');
  await expect(linkMenuItem).toContainText('Link');
  await linkMenuItem.click();
  await expect(links).toHaveCount(1);
  await cards.nth(1).click({ button: 'right' });
  await expect(page.locator($.contextMenu)).toBeVisible();
  await expect(unlinkMenuItem).toContainText('Remove link');
  await unlinkMenuItem.click();
  await expect(links).toHaveCount(0);
});

test('can link cards with link tool', async ({ page }) => {
  await openNewSpace(page);
  const { cards, links, linkMenuItem, unlinkMenuItem } = useSelectors(page);
  await expect(links).toHaveCount(0);
  await createCardAndTypeInIt(page, CARDS[0], 'hello world');
  await createCardAndTypeInIt(page, CARDS[1], 'hello mars');
  await expect(cards).toHaveCount(2);
  await page.keyboard.press('Escape');
  await page.keyboard.press('Escape');
  await page.click(toolSelectors.link);
  await expect(page.locator($.linkToolHint)).toContainText('Choose a card to link from');
  await cards.nth(0).click();
  await expect(page.locator($.linkToolHint)).toContainText('Choose a card to link to');
  await cards.nth(1).click();
  await expect(page.locator($.linkToolHint)).toBeHidden();
  await expect(links).toHaveCount(1);
});

test('can remove all links from a card using the context menu > remove all links', async ({
  page,
}) => {
  await openNewSpace(page);
  const { cards, links, linkMenuItem, unlinkMenuItem } = useSelectors(page);
  await expect(links).toHaveCount(0);

  // create three cards
  await createCardAndTypeInIt(page, CARDS[0], 'hello world');
  await createCardAndTypeInIt(page, CARDS[1], 'hello mars');
  await createCardAndTypeInIt(page, CARDS[2], 'hello venus');
  await expect(cards).toHaveCount(3);
  await page.click('#canvas');

  // link first two
  await page.keyboard.down('Shift');
  await cards.nth(0).click();
  await cards.nth(1).click({ button: 'right' });
  await page.keyboard.up('Shift');
  await expect(linkMenuItem).toContainText('Link');
  await linkMenuItem.click();
  await expect(links).toHaveCount(1);

  // link first and last
  await page.click('#canvas');
  await cards.nth(0).click();
  await cards.nth(2).click({ button: 'right' });
  await expect(linkMenuItem).toContainText('Link');
  await linkMenuItem.click();
  await expect(links).toHaveCount(2);

  // unlink all from first
  await page.click('#canvas');
  await cards.nth(0).click({ button: 'right' });
  await expect(page.locator($.contextMenu)).toBeVisible();
  await expect(unlinkMenuItem).toContainText('Remove all links');
  await unlinkMenuItem.click();
  await expect(links).toHaveCount(0);
});
