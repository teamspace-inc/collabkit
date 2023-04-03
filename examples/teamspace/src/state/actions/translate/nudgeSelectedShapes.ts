import { TLKeyboardInfo } from '@tldraw/core';
import Vec from '@tldraw/vec';
import { Item, State } from 'state/constants';

function getItemPoint(item: Item) {
  if (!item) {
    return;
  }
  if (typeof item.x !== 'number' || typeof item.y !== 'number') {
    return;
  }
  return [item.x, item.y];
}

export const nudgeSelectedShapes = (data: State, info: TLKeyboardInfo) => {
  const space = data.currentSpace;
  if (!space) {
    console.warn('[nudgeSelectedShapes] No current space');
    return;
  }

  let delta = [0, 0];

  switch (info.key) {
    case 'ArrowUp': {
      delta[1] = -1;
      break;
    }

    case 'ArrowDown': {
      delta[1] = 1;
      break;
    }
    case 'ArrowLeft': {
      delta[0] = -1;
      break;
    }
    case 'ArrowRight': {
      delta[0] = 1;
      break;
    }
  }

  if (info.shiftKey) {
    delta[0] = delta[0] * 10;
    delta[1] = delta[1] * 10;
  }

  for (const target of data.store.editing.selectedIds) {
    if (target.type === 'shape' && space.items[target.id]) {
      const itemPoint = getItemPoint(space.items[target.id]);
      if (!itemPoint) {
        continue;
      }
      const nextPoint = Vec.add(itemPoint, delta);
      space.items[target.id].x = nextPoint[0];
      space.items[target.id].y = nextPoint[1];
    }
  }
};
