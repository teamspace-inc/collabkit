import type { Store } from '@collabkit/core';
import { $createParagraphNode, $getSelection, $isRangeSelection, $getRoot } from 'lexical';
import { $getPrevChar, $createInlineTextNode, $createPinNode } from '@collabkit/editor';

export function insertComposerPin(store: Store, props: { pinId: string }) {
  const { composerId } = store;
  if (!composerId) throw new Error('CollabKit: no composerId set');
  const { pinId } = props;
  const { workspaceId, threadId, eventId } = composerId;
  const workspace = store.workspaces[workspaceId];
  const { editor } = workspace.composers[threadId][eventId];
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
