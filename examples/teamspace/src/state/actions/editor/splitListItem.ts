import type { State } from 'state/constants';
import { splitListItem as _splitListItem } from 'prosemirror-schema-list';
import React from 'react';
import { getEditorViewKey } from 'state/helpers';
import { EditorContextType } from 'hooks/useEditorContext';

export const splitListItem = (
  state: State,
  info: { e: KeyboardEvent | React.KeyboardEvent; editorContext: EditorContextType }
) => {
  const { editingId, editors } = state.store.editing;
  if (!editingId || editingId.type !== 'card') {
    console.warn('[splitListItem] blank or invalid editingId');
    return;
  }
  const key = getEditorViewKey(info.editorContext, editingId);
  const view = editors[key];
  const didSplit = _splitListItem(view.state.schema.nodes.list_item)(view.state, view.dispatch);
  if (didSplit) {
    info.e.preventDefault();
  }
};
