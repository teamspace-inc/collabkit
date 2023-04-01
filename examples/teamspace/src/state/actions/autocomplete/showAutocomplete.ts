import Vec from '@tldraw/vec';
import { EditorContextType } from 'hooks/useEditorContext';
import { State } from 'state/constants';
import { getEditorViewKey } from 'state/helpers';
import actions from '..';

export const showAutocomplete = (state: State, info: { editorContext: EditorContextType }) => {
  if (!state.store.editing.autocomplete) {
    return;
  }

  if (!state.store.editing.editingId) {
    return;
  }

  if (state.store.editing.editingId.type !== 'card') {
    return;
  }

  const key = getEditorViewKey(info.editorContext, state.store.editing.editingId);

  const view = state.store.editing.editors[key];

  if (!view) {
    return;
  }
  const selectionRect = view.coordsAtPos(view.state.selection.from);
  const editorRect = view.dom.getBoundingClientRect();

  let point = [0, 0];

  if (selectionRect && editorRect) {
    const x = selectionRect.left - editorRect.left;
    const y = selectionRect.bottom - editorRect.top + 5.5;

    point = [x, y];
  }

  if (state.currentSpace && !state.store.focusModeId) {
    state.store.editing.autocomplete.point = Vec.div(
      point,
      state.currentSpace.pageState.camera.zoom
    );
  } else {
    state.store.editing.autocomplete.point = point;
  }

  state.store.editing.autocomplete.isHidden = false;
  state.store.editing.autocomplete.from = view.state.selection.from;
  state.store.editing.autocomplete.scrollTop = 0;

  console.log('[showAutocomplete]', state.store.editing.autocomplete.point);

  actions.enter(state, 'editing.autocomplete.showing');
};
