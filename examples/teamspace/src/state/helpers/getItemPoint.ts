import { Item } from 'state/constants';

export function getItemPoint(item: Item) {
  if (!item) {
    return;
  }
  if (typeof item.x !== 'number' || typeof item.y !== 'number') {
    return;
  }
  return [item.x, item.y];
}
