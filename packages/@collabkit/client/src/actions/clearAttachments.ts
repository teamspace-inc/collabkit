import { Store } from '@collabkit/core';

export function clearComposerAttachments(
  store: Store,
  props: { workspaceId: string; threadId: string; eventId: string }
) {
  const { workspaceId } = props;
  const composer = store.workspaces[workspaceId].composers[props.threadId][props.eventId];
  composer.attachments = null;
}
