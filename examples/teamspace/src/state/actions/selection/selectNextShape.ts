import { TLKeyboardInfo } from '@tldraw/core';
import type { State } from 'state/constants';

export const selectNextShape = (state: State, info: TLKeyboardInfo) => {
  if (!state.currentSpace) {
    console.warn('[selectNextShape] no current space');
    return;
  }
  const { selectedIds } = state.store.editing;
  const { items } = state.currentSpace;

  let i = 0;

  const anchor = selectedIds[0];

  if (anchor.type !== 'shape') {
    return;
  }

  const orderedItems = Object.values(items)
    .filter((item) => !item.isDeleted)
    .sort((a, b) => {
      if (a.x === b.x) {
        return a.y - b.y;
      } else {
        return a.x - b.x;
      }
    });

  const selectedItems = selectedIds.filter((target) => target.type === 'shape');

  if (selectedItems.length > 0) {
    const itemIndex = orderedItems.findIndex((item) => item.id === anchor.id);
    i = itemIndex + (info.shiftKey ? -1 : 1);
  }

  if (i < 0) {
    i = orderedItems.length - 1;
  }

  if (i === orderedItems.length) {
    i = 0;
  }

  if (i >= 0 && i < orderedItems.length) {
    state.store.editing.selectedIds = [{ type: 'shape', id: orderedItems[i].id }];
  }
};
