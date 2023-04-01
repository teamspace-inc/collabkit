import { TLBoundsWithCenter, Utils } from '@tldraw/core';
import { StateWithSpace } from 'state/constants';
import { mutables } from 'state/mutables';
import { shapeUtils } from '../../../shapes';
import { itemToShape } from 'state/helpers';

export const setSnapInfo = (state: StateWithSpace) => {
  const { selectedIds } = state.store.editing;
  const { items, pageState } = state.currentSpace;
  const all: TLBoundsWithCenter[] = [];
  const others: TLBoundsWithCenter[] = [];

  for (let [id, item] of Object.entries(items)) {
    if (item.isDeleted) {
      continue;
    }

    if (pageState.hiddenIds.includes(id)) {
      continue;
    }

    const bounds = shapeUtils[item.type].getBounds(itemToShape(state.currentSpace.sizes, item));

    if (!bounds) {
      continue;
    }

    const boundsWithCenter = Utils.getBoundsWithCenter(bounds);

    all.push(boundsWithCenter);

    if (!selectedIds.some((target) => target.type === 'shape' && target.id === id)) {
      others.push(boundsWithCenter);
    }
  }

  const bounds = Utils.getCommonBounds(
    selectedIds
      .filter((target) => target.type === 'shape')
      .map((target) => items[target.id])
      .map(
        (item) =>
          item && shapeUtils[item.type].getBounds(itemToShape(state.currentSpace.sizes, item))
      )
      .filter((bounds) => !!bounds)
  );

  if (!bounds) {
    return;
  }

  const initialBounds = Utils.getBoundsWithCenter(bounds);

  mutables.snapInfo = {
    initialBounds,
    all,
    others,
  };
};
