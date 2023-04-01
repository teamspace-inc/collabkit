import { EditorContextType } from 'hooks/useEditorContext';
import { State, TextCardTarget } from 'state/constants';
import { getEditorViewKey } from 'state/helpers';

export const editorViewDestroyed = (
  state: State,
  info: { target: TextCardTarget; editorContext: EditorContextType }
) => {
  const { editors } = state.store.editing;
  const key = getEditorViewKey(info.editorContext, info.target);

  if (!editors[key]) {
    console.warn('[editorViewDestroyed] No editor found with id', info.target.id);
    return;
  }

  delete editors[key];
};
