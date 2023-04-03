import { EditorContextType } from 'hooks/useEditorContext';
import type { State } from 'state/constants';
import { getEditorViewKey } from 'state/helpers';
import actions from '..';
import { filterAutocompleteResults } from '../quickSearch/_filterSearchResults';

export const autocomplete = (state: State, info: { editorContext: EditorContextType }) => {
  const { search } = state.store;
  const { autocomplete, editors, editingId } = state.store.editing;

  if (!editingId || editingId.type !== 'card') {
    console.warn('autocomplete: not editing a card');
    return;
  }

  if (!autocomplete) {
    console.warn('autocomplete: is blank');
    return;
  }

  if (typeof autocomplete.from !== 'number') {
    return;
  }

  const key = getEditorViewKey(info.editorContext, editingId);

  const view = editors[key];

  const range = {
    from: autocomplete.from,
    to: view.state.tr.selection.from,
  };

  let query = view.state.doc.textBetween(range.from, range.to, '\n', '\0');

  if (!query.startsWith('@')) {
    actions.hideAutocomplete(state);
    return;
  }

  query = query.slice(1);

  autocomplete.query = query;

  if (autocomplete.query.length === 0 || !autocomplete.query) {
    autocomplete.results = Object.values(search.indexedItems)
      .filter((indexedItem) => filterAutocompleteResults({ item: indexedItem, refIndex: 1 }, state))
      .map((indexedItem) => ({ item: indexedItem, refIndex: 0, score: 0 }));

    autocomplete.selectedId = autocomplete.results[0]?.item.target;
    return;
  }

  autocomplete.results = search.engine
    .search(query)
    .filter((result) => filterAutocompleteResults(result, state));

  autocomplete.selectedId = autocomplete.results[0]?.item.target;
  autocomplete.scrollTop = 0;
};
