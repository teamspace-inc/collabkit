import { toggleMark as _toggleMark } from 'prosemirror-commands';
import { schemas } from 'editor';
import { Mark } from 'types';
import { EditorContextType } from 'hooks/useEditorContext';
import { getEditorViewKey } from 'state/helpers';
import { State } from 'state/constants';

const em = schemas.markdown.marks.em;
const strong = schemas.markdown.marks.strong;

export const toggleMark = (
  state: State,
  info: { mark: Mark; editorContext: EditorContextType }
) => {
  const { editingId, editors } = state.store.editing;

  if (!editingId || editingId.type !== 'card') {
    console.warn('[toggleMark] blank editingId');
    return;
  }

  const key = getEditorViewKey(info.editorContext, editingId);
  const view = editors[key];

  if (!view) {
    console.warn('[toggleMark] no view for editingId', editingId);
    return;
  }

  let action;
  switch (info.mark) {
    case 'strong':
      action = _toggleMark(strong);
      break;
    case 'em':
      action = _toggleMark(em);
      break;
  }

  action?.(view.state, view.dispatch);
};
