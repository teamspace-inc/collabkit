import { State } from 'state/constants';

export const prevAutocomplete = (state: State) => {
  const { autocomplete } = state.store.editing;
  if (!autocomplete) {
    return;
  }

  const { results, selectedId: selectedResultId } = autocomplete;

  if (!results || results.length === 0) {
    autocomplete.selectedId = null;
    return;
  }

  let i = results.findIndex((result) => result.item.target === selectedResultId);

  i -= 1;
  if (i < 0) {
    i = 0;
  }

  const result = results[i];

  autocomplete.selectedId = result?.item.target;
  autocomplete.navigatedBy = 'keyboard';
};
