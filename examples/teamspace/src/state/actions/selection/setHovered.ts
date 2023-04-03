import type { TLPointerInfo, TLTarget } from '@tldraw/core';
import type { State, Target } from 'state/constants';

export const setHovered = (state: State, payload: TLPointerInfo<TLTarget>) => {
  state.store.editing.hoveringId = payload.target as Target;
};
