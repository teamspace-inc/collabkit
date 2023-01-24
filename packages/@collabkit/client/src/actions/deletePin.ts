import type { Store } from '@collabkit/core';
import { actions } from '..';

export async function deletePin(
  store: Store,
  props: { workspaceId: string; objectId: string; id: string }
) {
  const { workspaceId, objectId, id } = props;
  const { threadId, eventId } = store.workspaces[workspaceId].openPins[objectId][id];
  await actions.deleteMessage(store, { workspaceId, threadId, eventId });
}
