import type { Store } from '@collabkit/core';
import { $getRoot, $getSelection, $isRangeSelection } from 'lexical';
import { $getPrevChar, CLOSE_MENTIONS_COMMAND, OPEN_MENTIONS_COMMAND } from '@collabkit/editor';

export function startMentioning(
  store: Store,
  props: { threadId: string; workspaceId: string; eventId: string }
) {
  const { isMentioning, editor } =
    store.workspaces[props.workspaceId].composers[props.threadId][props.eventId];

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
            const prevChar = $getPrevChar();
            if (prevChar?.endsWith('@')) {
              editor.dispatchCommand(OPEN_MENTIONS_COMMAND, undefined);
            } else if (prevChar?.endsWith(' ') || $getRoot().isEmpty()) {
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
