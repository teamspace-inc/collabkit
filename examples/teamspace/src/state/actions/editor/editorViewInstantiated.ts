import { EditorContextType } from 'hooks/useEditorContext';
import { EditorView } from 'prosemirror-view';
import type { TextCardTarget, State } from 'state/constants';
import { getEditorViewKey } from 'state/helpers';
import { ref } from 'valtio';

export const editorViewInstantiated = (
  state: State,
  info: { target: TextCardTarget; view: EditorView; editorContext: EditorContextType }
) => {
  const key = getEditorViewKey(info.editorContext, info.target);

  state.store.editing.editors[key] = ref(info.view);
};
