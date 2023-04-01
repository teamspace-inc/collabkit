import { TLPointerInfo } from '@tldraw/core';
import { State, TableTargets } from 'state/constants';

export const clearTableHovering = (state: State, info: TLPointerInfo<TableTargets>) => {
  state.store.editing.hoveringId = null;
};
