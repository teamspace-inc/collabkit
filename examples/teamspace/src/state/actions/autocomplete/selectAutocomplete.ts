import type { State, TextCardTarget } from 'state/constants';
import { targetEqual } from 'state/helpers';

export const selectAutocomplete = (state: State, payload: { selectedId: TextCardTarget }) => {
  const { autocomplete } = state.store.editing;
  if (!autocomplete) {
    return;
  }

  if (!autocomplete.results || autocomplete.results.length === 0 || !payload.selectedId) {
    autocomplete.selectedId = null;
    return;
  }

  const result = autocomplete.results?.find((result) =>
    targetEqual(result.item.target, payload.selectedId)
  );

  if (result) {
    autocomplete.selectedId = result.item.target;
  } else {
    console.warn('could not find result with id', payload.selectedId);
  }
};
