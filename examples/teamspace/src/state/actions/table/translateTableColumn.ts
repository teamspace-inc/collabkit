import { TLBoundsEdge, TLPointerInfo, Utils } from '@tldraw/core';
import Vec from '@tldraw/vec';

import { State, TableColumnTarget } from 'state/constants';
import { getPagePoint } from 'state/helpers';
import { mutables } from 'state/mutables';

export const translateTableColumn = (state: State, info: TLPointerInfo<TableColumnTarget>) => {
  const { initialPoint } = mutables;

  let delta = Vec.sub(getPagePoint(info.point, state.currentSpace!.pageState), initialPoint);

  const target = state.store.editing.pointingId;

  if (!target || target.type !== 'tableColumn') {
    console.warn('translateTableColumn: invalid target', target);
    return;
  }

  if (!mutables.table) {
    console.warn('translateTableColumn: mutables.table is blank', mutables.table);
    return;
  }

  if (!state.store.editing.translating) {
    console.warn('translateTableColumn: state.store.editing.translating is blank');
    return;
  }

  const originalColumn =
    mutables.table.columns[
      mutables.table.columns.findIndex((column) => column.id === target.id) ?? -1
    ];

  if (!originalColumn) {
    console.warn(
      'translateTableColumn: mutables.table does not contain the original column',
      originalColumn
    );
    return;
  }

  // bounds of the column being dragged
  const centerDragX = Utils.getBoundsCenter(
    Utils.translateBounds(originalColumn.bounds, [delta[0], 0])
  )[0];

  let nearestDistance = Number.MAX_SAFE_INTEGER;
  let nearestIndex = -1;
  let index = 0;
  let edge = TLBoundsEdge.Left;

  for (const column of mutables.table.columns) {
    const colCenterX = Utils.getBoundsCenter(column.bounds)[0];
    const distance = Math.abs(colCenterX - centerDragX);

    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearestIndex = index;
      edge = centerDragX < colCenterX ? TLBoundsEdge.Left : TLBoundsEdge.Right;
    }

    index += 1;
  }

  state.store.editing.translating.edge = edge;
  state.store.editing.translating.index = nearestIndex;
  state.store.editing.translating.delta[0] = delta[0];
};
