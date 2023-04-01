import { State } from 'state/constants';

export const nextAutocomplete = (state: State) => {
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

  i += 1;
  if (i > results.length - 1) {
    i = results.length - 1;
  }

  autocomplete.selectedId = results[i].item.target;
  autocomplete.navigatedBy = 'keyboard';
};
