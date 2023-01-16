import type { ComposerTarget, Store } from '@collabkit/core';

export function disableComposerCommentButton(store: Store, props: { target: ComposerTarget }) {
  const { workspaceId, threadId, eventId } = props.target;
  store.workspaces[workspaceId].composers[threadId][eventId].enabled = false;
}
