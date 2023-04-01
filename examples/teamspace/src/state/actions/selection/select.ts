import type { TLContextMenuInfo, TLPointerInfo, TLTarget } from '@tldraw/core';

import type {
  ShapeTarget,
  State,
  TableCellTarget,
  TableColumnTarget,
  TableRowTarget,
  TableTarget,
  Target,
  TextCardTarget,
} from 'state/constants';
import { targetEqual } from '../shapes/targetEqual';

export interface Info<T extends TLTarget> {
  shiftKey: boolean;
  target: T;
}

function isChildShape(
  target: Target
): target is TableRowTarget | TableColumnTarget | TableCellTarget {
  return target.type === 'tableRow' || target.type === 'tableColumn' || target.type === 'tableCell';
}

function isParentSelected(
  selectedIds: Target[],
  target: TableCellTarget | TableColumnTarget | TableRowTarget
) {
  return !!selectedIds.find(
    (selectedTarget) => selectedTarget.type === 'table' && selectedTarget.id === target.docId
  );
}

export const select = (
  state: State,
  payload:
    | TLPointerInfo<
        | ShapeTarget
        | TableCellTarget
        | TableRowTarget
        | TableColumnTarget
        | TextCardTarget
        | TableTarget
      >
    | TLContextMenuInfo<
        | ShapeTarget
        | TableCellTarget
        | TableRowTarget
        | TableColumnTarget
        | TextCardTarget
        | TableTarget
      >
    | Info<
        | ShapeTarget
        | TableCellTarget
        | TableColumnTarget
        | TableRowTarget
        | TextCardTarget
        | TableTarget
      >
) => {
  const { selectedIds } = state.store.editing;

  const { target } = payload;

  if (
    !(
      target.type === 'shape' ||
      target.type === 'tableCell' ||
      target.type === 'tableColumn' ||
      target.type === 'tableRow'
    )
  ) {
    console.warn('[selectShape] target is not a shape, table cell, row or column', target);
    return;
  }

  if (isChildShape(target)) {
    console.log({ isChildShape: true });
    if (!isParentSelected(selectedIds, target)) {
      console.log({ isParentSelected: false });
      state.store.editing.selectedIds = [{ type: 'table', id: target.docId }, target];
      return;
    }
  }

  if (payload.shiftKey) {
    const selectedIndex = selectedIds.findIndex((target) => targetEqual(target, payload.target));

    if (selectedIndex !== -1) {
      selectedIds.splice(selectedIndex, 1);
    } else {
      selectedIds.push(target);
    }
  } else {
    state.store.editing.selectedIds = [target];
  }
};
