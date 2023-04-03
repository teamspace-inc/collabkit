import type { State } from 'state/constants';

export const stopEditing = (state: State) => {
  const { editing: editing } = state.store;

  if (!editing.editingId) {
    return;
  }

  editing.editingId = null;
  editing.translating = null;
  editing.autocomplete.isHidden = true;
  editing.formatting = null;

  window.getSelection()?.removeAllRanges();
};
