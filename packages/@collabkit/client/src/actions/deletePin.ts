import type { Store } from '@collabkit/core';
import { deleteMessage } from './deleteMessage';

export async function deletePin(
  store: Store,
  props: {
    workspaceId: string;
    threadId: string;
    eventId: string;
  }
) {
  const { workspaceId } = props;

  const composer = store.workspaces[workspaceId].composers[props.threadId][props.eventId];

  const pin = store.workspaces[workspaceId].eventPins[props.eventId];

  for (const id in composer.attachments) {
    const attachment = composer.attachments[id];
    if (attachment.type === 'pin') {
      delete composer.attachments[id];
    }
  }

  if (pin) {
    await deleteMessage(store, { workspaceId, threadId: props.threadId, eventId: pin.eventId });
  }
}
