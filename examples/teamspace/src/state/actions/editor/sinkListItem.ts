import type { State } from 'state/constants';
import { sinkListItem as _sinkListItem } from 'prosemirror-schema-list';
import { EditorContextType } from 'hooks/useEditorContext';
import { getEditorViewKey } from 'state/helpers';

export const sinkListItem = (state: State, info: { editorContext: EditorContextType }) => {
  const { editingId, editors } = state.store.editing;
  if (!editingId || editingId.type !== 'card') {
    return;
  }
  const key = getEditorViewKey(info.editorContext, editingId);
  const view = editors[key];
  _sinkListItem(view.state.schema.nodes.list_item)(view.state, view.dispatch);
};
