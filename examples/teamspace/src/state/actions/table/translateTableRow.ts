import { TLBoundsEdge, TLPointerInfo, Utils } from '@tldraw/core';
import Vec from '@tldraw/vec';

import { State, TableRowTarget } from 'state/constants';
import { getPagePoint } from 'state/helpers';
import { mutables } from 'state/mutables';

export const translateTableRow = (state: State, info: TLPointerInfo<TableRowTarget>) => {
  const { initialPoint } = mutables;

  let delta = Vec.sub(getPagePoint(info.point, state.currentSpace!.pageState), initialPoint);

  const target = state.store.editing.pointingId;

  if (!target || target.type !== 'tableRow') {
    console.warn('translateTableRow: invalid target', target);
    return;
  }

  if (!mutables.table) {
    console.warn('translateTableRow: mutables.table is blank', mutables.table);
    return;
  }

  if (!state.store.editing.translating) {
    console.warn('translateTableRow: state.store.editing.translating is blank');
    return;
  }

  const originalRow = mutables.table.rows[target.id];

  if (!originalRow) {
    console.warn(
      'translateTableRow: mutables.table does not contain the original row',
      originalRow
    );
    return;
  }

  // bounds of the row being dragged
  const centerDragY = Utils.getBoundsCenter(
    Utils.translateBounds(originalRow.bounds, [0, delta[1]])
  )[1];

  let nearestDistance = Number.MAX_SAFE_INTEGER;
  let nearestIndex = -1;
  let index = 0;
  let edge = TLBoundsEdge.Top;

  for (const rowId of Object.keys(mutables.table.rows)) {
    const colCenterY = Utils.getBoundsCenter(mutables.table.rows[rowId].bounds)[1];
    const distance = Math.abs(colCenterY - centerDragY);

    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearestIndex = index;
      edge = centerDragY < colCenterY ? TLBoundsEdge.Top : TLBoundsEdge.Bottom;
    }

    index += 1;
  }

  state.store.editing.translating.edge = edge;
  state.store.editing.translating.index = nearestIndex;
  state.store.editing.translating.delta[1] = delta[1];
};
