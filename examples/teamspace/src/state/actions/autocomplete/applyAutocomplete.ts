import type { State } from 'state/constants';
import { schema } from 'editor/schemas/markdownSchema';
import actions from '..';
import { getEditorViewKey } from 'state/helpers';
import { EditorContextType } from 'hooks/useEditorContext';

export const applyAutocomplete = (state: State, info: { editorContext: EditorContextType }) => {
  const { search } = state.store;
  const { autocomplete, editors, editingId } = state.store.editing;

  if (editingId?.type !== 'card') {
    return;
  }

  if (!autocomplete) {
    return;
  }

  if (typeof autocomplete.from !== 'number') {
    return;
  }

  if (!autocomplete.selectedId || !editingId) {
    return;
  }

  const cardTitle = search.indexedItems[autocomplete.selectedId.id].title;

  if (!cardTitle) {
    console.warn('[applyAutocomplete] no card title for', autocomplete.selectedId);
    return;
  }

  const key = getEditorViewKey(info.editorContext, editingId);

  const view = editors[key];

  if (!view) {
    console.warn('[applyAutocomplete] no view for', editingId);
    return;
  }

  const mention = schema.node('mention', {
    'data-target-id': autocomplete.selectedId.id,
    'data-target-type': autocomplete.selectedId.type,
  });

  const range = {
    from: autocomplete.from,
    to: view.state.tr.selection.from,
  };

  const tr = view.state.tr.replaceRangeWith(range.from, range.to, mention);
  tr.insertText(' ');

  view.dispatch(tr);
  view.focus();

  actions.hideAutocomplete(state);
};
