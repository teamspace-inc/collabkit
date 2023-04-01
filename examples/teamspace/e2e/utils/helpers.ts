import { createShape, SPACE_URL_REGEX, $ } from '.';
import { expect, Page } from '@playwright/test';
import { nanoid } from '../../src/utils/nanoid';

export async function openNewSpace(page: Page) {
  await page.goto('/' + nanoid());
  await page.waitForLoadState('networkidle');
  await expect(page.locator($.online)).toHaveCount(1);
  return page.url();
}

export async function renameSpace(page: Page, name: string) {
  const spaceName = page.locator($.spaceName);
  await spaceName.click();
  await spaceName.type(name);
  await expect(spaceName).toHaveText(name);
}

export async function openSpace(page: Page, url: string) {
  await Promise.allSettled([
    page.goto(url),
    page.waitForNavigation({ url: SPACE_URL_REGEX, timeout: 2000 }),
  ]);
  await expect(page.locator($.online)).toHaveCount(1);
}

export async function toggleSearchBar(page: Page) {
  await page.keyboard.press('Control+k');
  await page.waitForTimeout(1000);
}

export async function openSearchBar(page: Page) {
  await toggleSearchBar(page);
  await expect(page.locator($.searchBarInput)).toHaveCount(1);
}

export async function closeSearchBar(page: Page) {
  await toggleSearchBar(page);
  await expect(page.locator($.searchBarInput)).toHaveCount(0);
}

export async function createCardAndTypeInIt(
  page: Page,
  card: { x: number; y: number; width: number; height: number },
  text: string
) {
  await page.click('#canvas');
  await createShape(page, 'card', card);
  await page.mouse.click(card.x + card.width / 2, card.y + card.height / 2);
  await page.mouse.click(card.x + card.width / 2, card.y + card.height / 2);
  await page.type($.card, text, { delay: 10 });
}
