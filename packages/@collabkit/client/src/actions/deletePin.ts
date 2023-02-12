import type { Store } from '@collabkit/core';
import { getConfig } from 'getConfig';
import { deleteMessage } from './deleteMessage';

export async function deletePin(
  store: Store,
  props: {
    workspaceId: string;
    threadId: string;
    eventId: string;
  }
) {
  const { appId } = getConfig(store);
  const { workspaceId } = props;

  const composer = store.workspaces[workspaceId].composers[props.threadId][props.eventId];

  const pin = store.workspaces[workspaceId].eventPins[props.eventId];

  if (composer?.pendingPin) {
    composer.pendingPin = null;
  }

  if (pin) {
    await deleteMessage(store, { workspaceId, threadId: props.threadId, eventId: pin.eventId });
  }
}
