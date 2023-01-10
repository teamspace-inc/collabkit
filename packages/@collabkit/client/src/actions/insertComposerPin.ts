import type { Store } from '@collabkit/core';
import { $createParagraphNode, $getSelection, $isRangeSelection } from 'lexical';
import { $createPinNode } from '@collabkit/editor';

export function insertComposerPin(
  store: Store,
  props: { threadId: string; workspaceId: string; eventId: string }
) {
  const { workspaceId, threadId } = props;
  const workspace = store.workspaces[workspaceId];
  const { editor } = workspace.composers[threadId];
  editor?.update(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      selection.insertNodes([$createPinNode('foo')]);
    }
  });
}
