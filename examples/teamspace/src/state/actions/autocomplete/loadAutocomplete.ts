import { State } from 'state/constants';
import { filterAutocompleteResults } from '../quickSearch/_filterSearchResults';

export const loadAutocomplete = (state: State) => {
  const { search } = state.store;

  if (!state.store.editing.editingId) {
    return;
  }

  if (state.store.editing.editingId.type !== 'card') {
    console.warn('[loadAutocomplete] auto complete not supported for non-card items', {
      editingId: state.store.editing.editingId,
    });
    return;
  }

  const results = Object.values(search.indexedItems)
    .filter((indexedItem) => filterAutocompleteResults({ item: indexedItem, refIndex: 1 }, state))
    .slice(0, 5)
    .map((indexedItem) => ({ item: indexedItem, refIndex: 0, score: 0 }));

  const selectedId = results[0]?.item.target;

  state.store.editing.autocomplete = {
    query: '@',
    results,
    selectedId,
    hoveredId: null,
    isHidden: true,
    from: 0,
    point: [0, 0],
    scrollTop: 0,
    navigatedBy: 'mouse',
  };
};
