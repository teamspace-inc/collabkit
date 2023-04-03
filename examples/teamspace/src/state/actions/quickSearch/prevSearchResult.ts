import type { State } from 'state/constants';
import { targetEqual } from 'state/helpers';

export const prevSearchResult = (state: State) => {
  const { search } = state.store;
  const { results, selectedId: selectedResultId } = search;

  if (!results || results.length === 0) {
    search.selectedId = null;
    return;
  }

  let i = results.findIndex((result) => targetEqual(result.item.target, selectedResultId));

  i -= 1;
  if (i < 0) {
    i = results.length - 1;
  }

  const result = results[i];

  search.selectedId = result?.item.target;
};
