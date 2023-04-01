import { Page } from '@playwright/test';
import { toolSelectors, ShapeType } from '.';

export type Shape = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export async function createShape(page: Page, type: ShapeType, { x, y, width, height }: Shape) {
  await page.click(toolSelectors[type]);
  if (type === 'text' || type === 'box') {
    const { mouse } = page;
    await mouse.move(x, y);
    await mouse.down();
    await mouse.move(x + width, y + height, { steps: 4 });
    await mouse.up();
  } else {
    const { mouse } = page;
    await mouse.click(x, y, { delay: 25 });
  }
}
