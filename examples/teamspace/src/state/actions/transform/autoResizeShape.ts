import { TLAutoResizeInfo } from '@tldraw/core';
import type { ShapeTarget, SpaceStore } from 'state/constants';

function validateSize(n: unknown): n is number {
  return typeof n === 'number' && !isNaN(n);
}

export const autoResizeShape = (space: SpaceStore, info: TLAutoResizeInfo<ShapeTarget>) => {
  const target = info.target;
  const item = space.items[target.id];

  if (!item) {
    return;
  }

  const { width, height } = info;

  if (validateSize(width) && validateSize(height)) {
    space.sizes[target.id] = [width, height];
  }
};
