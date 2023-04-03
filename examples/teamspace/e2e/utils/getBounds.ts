import { Page } from '@playwright/test';
import { CARD_SELECTOR } from '.';
import { BOX_SELECTOR, TEXT_SELECTOR, STICKY_SELECTOR } from './selectors';

export type ShapeType = 'box' | 'text' | 'sticky' | 'card';

export async function getBounds(page: Page, type: ShapeType) {
  const itemSelectors = {
    box: BOX_SELECTOR,
    text: TEXT_SELECTOR,
    sticky: STICKY_SELECTOR,
    card: CARD_SELECTOR,
  };
  const elementHandles = await page.$$(itemSelectors[type]);
  const boxes = await Promise.all(elementHandles.map((handle) => handle.boundingBox()));
  boxes.sort((a, b) => {
    if (a.x - b.x === 0) {
      return a.y - b.y;
    }
    return a.x - b.x;
  });
  return boxes;
}
