import { Store } from '@collabkit/core';
import { $getRoot } from 'lexical';

export function clearComposer(
  store: Store,
  props: { workspaceId: string; threadId: string; eventId: string }
) {
  const { workspaceId, threadId, eventId } = props;
  const workspace = store.workspaces[workspaceId];
  const composer = workspace.composers[threadId][eventId];
  composer.editor?.update(() => {
    $getRoot().clear();
  });
}
