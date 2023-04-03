import { TLKeyboardInfo, TLPointerInfo } from '@tldraw/core';
import type { State, Target } from 'state/constants';
import { setClipboard } from './_setClipboard';

export const cutSelectedShapes = (state: State, info?: TLPointerInfo<Target> | TLKeyboardInfo) => {
  if (!state.currentSpace) {
    console.warn('[copySelectedShapes] No current space');
    return;
  }

  // @todo this is temporary until TLClipboard is
  // converted to use Targets
  const ids = state.store.editing.selectedIds
    .filter((target) => target.type === 'shape' && !state.currentSpace?.items[target.id].isDeleted)
    .map((shapeTarget) => shapeTarget.id);

  setClipboard(state.currentSpace, {
    ids,
    count: 0,
    state: 'cut',
  });
};
