import type { ShapeTarget, StateWithSpace } from 'state/constants';
import { TLKeyboardInfo, TLPointerInfo, Utils } from '@tldraw/core';

import { mutables } from '../../mutables';
import { getPagePoint } from 'state/helpers';
import { getBounds } from '../../../shapes';
import { targetEqual } from '../shapes/targetEqual';
import { itemToShape } from 'state/helpers';

export const updateBrush = (state: StateWithSpace, payload: TLPointerInfo | TLKeyboardInfo) => {
  const { selectedIds } = state.store.editing;
  const { items, pageState, sizes } = state.currentSpace;
  const { initialPoint } = mutables;

  const pagePoint = getPagePoint(payload.point, pageState);

  const brushBounds = Utils.getBoundsFromPoints([pagePoint, initialPoint]);

  pageState.brush = brushBounds;

  const hits: ShapeTarget[] = Object.values(items)
    .filter((item) => {
      const itemBounds = sizes[item.id] && getBounds(itemToShape(state.currentSpace.sizes, item));
      return (
        itemBounds &&
        (Utils.boundsContain(brushBounds, itemBounds) ||
          (!payload.metaKey && Utils.boundsCollide(brushBounds, itemBounds)))
      );
    })
    .map((item) => ({ type: 'shape', id: item.id }));

  if (payload.shiftKey) {
    // we only want to flip something from selected to unselected (or
    // vice-versa) if it is a new item hitting the brush
    // (as this action is called for every) pixel the pointer moves
    const newHits = hits.filter((hit) => !mutables.brushHits?.includes(hit.id));

    newHits.forEach((hit) => {
      const i = selectedIds.findIndex((target) => targetEqual(target, hit));
      if (i > -1) {
        selectedIds.splice(i, 1);
      } else {
        selectedIds.push(hit);
      }
    });
  } else {
    state.store.editing.selectedIds = hits;
  }

  mutables.brushHits = hits.map((hit) => hit.id);

  state.currentSpace.optimistic.selectBox = [...initialPoint, ...pagePoint];
};
