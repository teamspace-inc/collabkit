import { TLPointerInfo, TLTarget } from '@tldraw/core';
import type { StateWithSpace } from 'state/constants';

export const clearHovered = (state: StateWithSpace, info: TLPointerInfo<TLTarget>) => {
  state.store.editing.hoveringId = null;
};
