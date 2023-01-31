import { ComposerTarget, Store } from '@collabkit/core';
import { LexicalEditor, $getRoot } from 'lexical';
import { actions } from '.';
import { markRaw } from '../store';

export function updateComposer(
  store: Store,
  props: { target: ComposerTarget; editor: LexicalEditor }
) {
  const { target, editor } = props;
  const composer = actions.initComposer(store, target);
  composer.editor = markRaw(editor);
  let isEmpty = true;
  composer.editor.getEditorState().read(() => {
    isEmpty = $getRoot().getTextContentSize() === 0;
  });
  if (isEmpty) {
    actions.isTyping.cancel();
    setTimeout(() => {
      actions.stopTyping(store, { target });
    }, 100);
  } else {
    actions.isTyping(store, { target });
  }
}
