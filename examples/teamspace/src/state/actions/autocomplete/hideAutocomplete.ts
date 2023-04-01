import type { State } from 'state/constants';
import actions from '..';

export const hideAutocomplete = (state: State) => {
  if (state.store.editing.autocomplete) {
    state.store.editing.autocomplete.isHidden = true;
  }

  if (state.store.uiState === 'editing.autocomplete.showing') {
    actions.enter(state, 'editing');
  }
};
