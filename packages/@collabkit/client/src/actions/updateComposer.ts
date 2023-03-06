import { ComposerTarget, Store } from '@collabkit/core';
import { LexicalEditor, $getRoot } from 'lexical';
import { actions } from '.';
import { ref } from 'valtio';

export function updateComposer(
  store: Store,
  props: { target: ComposerTarget; editor: LexicalEditor }
) {
  const { target, editor } = props;
  const composer = actions.initComposer(store, target);
  composer.editor = ref(editor);
  let isEmpty = true;
  composer.editor.getEditorState().read(() => {
    isEmpty = $getRoot().getTextContentSize() === 0;
  });
  composer.enabled = !isEmpty;
  composer.hasText = !isEmpty;
  if (isEmpty) {
    actions.isTyping.cancel();
    setTimeout(() => {
      actions.stopTyping(store, { target });
    }, 100);
  } else {
    actions.isTyping(store, { target });
  }
}
