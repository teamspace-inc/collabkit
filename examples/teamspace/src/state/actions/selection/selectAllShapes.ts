import { TLKeyboardInfo, TLPointerInfo } from '@tldraw/core';
import type { State, Target } from 'state/constants';
import { getVisibleItems } from 'state/helpers';

export const selectAllShapes = (state: State, info?: TLPointerInfo<Target> | TLKeyboardInfo) => {
  if (!state.currentSpace) {
    console.warn('[selectAllShapes] No current space');
    return;
  }
  state.store.editing.selectedIds = getVisibleItems(state.currentSpace).map((item) => ({
    type: 'shape',
    id: item.id,
  }));
};
