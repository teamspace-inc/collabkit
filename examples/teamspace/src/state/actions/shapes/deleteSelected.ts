import { TLKeyboardInfo, TLPointerInfo } from '@tldraw/core';
import type { State, Target } from 'state/constants';

export const deleteSelected = (state: State, info?: TLKeyboardInfo | TLPointerInfo<Target>) => {
  const space = state.currentSpace;
  if (!space) {
    console.warn('[deleteSelected] No current space');
    return;
  }

  const { pageState } = space;

  if (
    pageState.hoveredId &&
    state.store.editing.selectedIds.some((target) => target.id === pageState.hoveredId)
  ) {
    pageState.hoveredId = undefined;
  }

  // @todo we need to check if it was only table cells selected and if so
  // just delete the contents but not deselect them

  state.store.editing.selectedIds.forEach((target) => {
    if (target.type === 'shape') {
      space.items[target.id].isDeleted = true;
    }

    if (target.type === 'tableCell') {
      state.store.editing.tables[target.docId].cellValues[target.id] = '';
    }
  });

  state.store.editing.selectedIds = [];
};
