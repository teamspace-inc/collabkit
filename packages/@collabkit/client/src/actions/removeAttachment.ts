import { Store } from '@collabkit/core';

export function removeAttachment(
  store: Store,
  props: { workspaceId: string; threadId: string; eventId: string; attachmentId: string }
) {
  const { workspaceId } = props;
  const composer = store.workspaces[workspaceId].composers[props.threadId][props.eventId];
  if (!composer.attachments) return;
  const attachment = composer.attachments[props.attachmentId];
  if (!attachment) return;
  if (attachment.type === 'pin') {
    const openPin =
      store.workspaces[workspaceId].openPins[attachment.objectId]?.[props.attachmentId];
    if (openPin) {
      delete store.workspaces[workspaceId].openPins[attachment.objectId][props.attachmentId];
    }
  }
  delete composer.attachments[props.attachmentId];
}
