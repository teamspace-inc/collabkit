import { EditorContextType } from 'hooks/useEditorContext';
import type { ShapeTarget, State, TableCellTarget, TextCardTarget } from 'state/constants';
import { getEditorViewKey } from 'state/helpers';
import actions from '..';
import { targetEqual } from './targetEqual';

export const startEditing = (
  state: State,
  info: {
    target: ShapeTarget | TableCellTarget | TextCardTarget;
    editorContext: EditorContextType;
    point?: number[];
  }
) => {
  const { editing: editing } = state.store;
  const { target } = info;

  if (targetEqual(editing.editingId, target)) {
    return;
  }

  if (!state.currentSpace) {
    console.warn('[startEditingShape] no current space');
    return;
  }

  if (target.type === 'shape') {
    const item = state.currentSpace.items?.[target.id];

    if (!item) {
      console.warn('[startEditingShape] no item for id', target.id);
      return;
    }

    const { type } = item;

    if (type === 'text' || type === 'sticky') {
      editing.editingId = target;
    }

    if (type === 'table') {
      editing.editingId = { type: 'table', id: item.docId };
    }

    if (type === 'card') {
      editing.editingId = { type: 'card', id: item.docId } as TextCardTarget;

      // we only show the formatting toolbar for cards
      // and we need to set the initial selection before
      // the yTextEditor gets a chance to apply a transaction
      const key = getEditorViewKey(info.editorContext, { type: 'card', id: item.docId });
      const view = editing.editors[key];

      if (!view) {
        console.warn('no editor view for card, something went wrong', item.docId, view);
        return;
      }

      actions.setEditorSelection(state, {
        target: editing.editingId,
        selection: view.state.selection,
        editorContext: info.editorContext,
      });
    }
  } else if (target.type === 'tableCell') {
    state.store.editing.editingId = target;
  } else if (target.type === 'card') {
    state.store.editing.editingId = target;
  }

  actions.enter(state, 'editing');

  actions.loadAutocomplete(state);
};
