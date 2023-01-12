import type { Store } from '@collabkit/core';
import { $createParagraphNode, $getSelection, $isRangeSelection, $getRoot } from 'lexical';
import { $createInlineTextNode, $createPinNode } from '@collabkit/editor';
import { $getPrevChar } from './startMentioning';

export function insertComposerPin(
  store: Store,
  props: { threadId: string; workspaceId: string; eventId: string }
) {
  const { workspaceId, threadId, eventId } = props;
  const workspace = store.workspaces[workspaceId];
  const { editor } = workspace.composers[threadId][eventId];
  const pinId = 'foo'; // todo replace this
  editor?.update(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const prevChar = $getPrevChar();
      const p = $createParagraphNode();
      if (!prevChar?.match(/[\s]/) && prevChar !== '') {
        p.append($createInlineTextNode(' '));
      }
      p.append($createPinNode(pinId), $createInlineTextNode(' '));
      if ($getRoot().isEmpty()) {
        $getRoot().append(p);
        p.select();
      } else {
        selection.insertNodes([p]);
      }
    }
  });
}
