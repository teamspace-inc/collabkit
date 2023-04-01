import type { State } from 'state/constants';

export const exitFocusMode = (state: State) => {
  if (state.store.focusModeId) {
    state.store.editing.selectedIds = [state.store.focusModeId];
  }
  state.store.focusModeId = undefined;
  state.store.editing.editingId = null;
};
