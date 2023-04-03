import type { State } from 'state/constants';

export const deselectAll = (state: State) => {
  state.store.editing.selectedIds = [];
  state.store.editing.pointingId = null;
};
