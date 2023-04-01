import type { State } from 'state/constants';
import actions from '..';

export const stopEditingName = (state: State) => {
  const { editing: editing } = state.store;
  editing.editingId = null;
  editing.autocomplete.isHidden = true;
  editing.formatting = null;
  actions.enter(state, 'idle');
};
