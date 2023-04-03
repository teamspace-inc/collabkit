import { TLPointerInfo } from '@tldraw/core';
import Vec from '@tldraw/vec';
import type { SelectableTarget, StateWithSpace } from 'state/constants';
import { duplicateShape, getItemPoint } from 'state/helpers';
import { setClipboard } from './_setClipboard';

const PASTE_OFFSET = 10;

function getTopLeftPoint(points: number[][]) {
  let x = points[0][0];
  let y = points[0][1];

  for (let i = 0; i < points.length; i++) {
    if (points[i][0] < x) {
      x = points[i][0];
    }
    if (points[i][1] < y) {
      y = points[i][1];
    }
  }

  return [x, y];
}

export const paste = (state: StateWithSpace, payload?: TLPointerInfo) => {
  if (!state.currentSpace.doc) {
    console.warn('tried to paste with no data.doc');
    return;
  }

  let { ids, state: clipboardState, count } = state.currentSpace.pageState.clipboard;

  let offset = [0, 0];

  count += 1;

  const { canvasPoint } = state.store.contextMenu;

  if (payload && canvasPoint) {
    // put it where the pointer is
    const topLeftPoint = getTopLeftPoint(
      ids
        .map((id) => [state.currentSpace.items[id].x, state.currentSpace.items[id].y])
        .filter(
          (point): point is number[] => typeof point[0] === 'number' && typeof point[1] === 'number'
        )
    );
    offset = Vec.sub(canvasPoint, topLeftPoint);
  } else if (clipboardState === 'cut' && count == 1) {
    offset = [0, 0];
  } else {
    offset = [PASTE_OFFSET, PASTE_OFFSET];
  }

  const shouldDuplicate = clipboardState === 'copy' || (clipboardState === 'cut' && count > 1);

  let newTargets: SelectableTarget[] = [];

  state.currentSpace.doc.transact(() => {
    for (const id of ids) {
      const item = shouldDuplicate
        ? duplicateShape(state, state.currentSpace.items[id])
        : state.currentSpace.items[id];
      if (item) {
        item.isDeleted = false;
        const point = getItemPoint(item);
        if (!point) {
          console.warn('[paste] item has no point', item);
          continue;
        }
        const [x, y] = Vec.add(point, offset);
        item.x = x;
        item.y = y;
        state.currentSpace.items[item.id] = item;
        newTargets.push({ type: 'shape', id: item.id });
      } else {
        console.warn('[paste] failed to diplicate shape during paste');
      }
    }
  }, 'valtio');

  setClipboard(state.currentSpace, {
    ids: newTargets.map((target) => target.id),
    count,
    state: clipboardState,
  });

  state.store.editing.selectedIds = newTargets;
  state.currentSpace.pageState.hiddenIds = [];
};
