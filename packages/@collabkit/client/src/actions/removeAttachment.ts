import { Store } from '@collabkit/core';

export function removeAttachment(
  store: Store,
  props: { workspaceId: string; threadId: string; eventId: string; attachmentId: string }
) {
  const { workspaceId } = props;
  const composer = store.workspaces[workspaceId].composers[props.threadId][props.eventId];
  if (composer.attachments && composer.attachments[props.attachmentId]) {
    delete composer.attachments[props.attachmentId];
  }
}
