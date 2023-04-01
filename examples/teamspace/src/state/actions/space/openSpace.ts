import { State } from 'state/constants';
import actions from '..';

export function openSpace(state: State, spaceId: string) {
  // reset
  actions.cancel(state);
  state.store.editing.editingId = null;
  state.store.editing.selectedIds = [];
  state.store.uiState = 'idle';
  if (state.currentSpace) {
    state.currentSpace.pageState.tool = 'select';
  }
  history.pushState(null, '', `/${spaceId}`);
}
