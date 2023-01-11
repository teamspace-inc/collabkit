import type { Store } from '@collabkit/core';
import { $createRangeSelection, $getSelection, $isRangeSelection } from 'lexical';
import { CLOSE_MENTIONS_COMMAND, OPEN_MENTIONS_COMMAND } from '@collabkit/editor';

export function toggleComposerMentions(
  store: Store,
  props: { threadId: string; workspaceId: string; eventId: string }
) {
  const { isMentioning, editor } = store.workspaces[props.workspaceId].composers[props.threadId];

  if (!editor) {
    return;
  }

  if (isMentioning) {
    editor.dispatchCommand(CLOSE_MENTIONS_COMMAND, undefined);
  } else {
    editor.focus(
      () => {
        editor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            // we want to see if the previous character is an @
            // and if so toggle the mentions picker open
            // if not we want to add an @ which triggers
            // the mentions plugin to open it for us
            const prevChar = $createRangeSelection();
            prevChar.anchor.offset =
              selection.anchor.offset - 1 < 0 ? 0 : selection.anchor.offset - 1;
            prevChar.focus.offset = selection.anchor.offset;
            const prevCharText = prevChar.getTextContent();
            if (prevCharText.endsWith('@')) {
              editor.dispatchCommand(OPEN_MENTIONS_COMMAND, undefined);
            } else if (prevCharText.endsWith(' ')) {
              selection.insertRawText('@');
            } else {
              selection.insertRawText(' @');
            }
          }
        });
      },
      { defaultSelection: 'rootEnd' }
    );
  }
}
