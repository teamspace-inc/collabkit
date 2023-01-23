import type { Store } from '@collabkit/core';
import { actions } from '..';

export async function deletePinAndMessage(
  store: Store,
  props: { workspaceId: string; objectId: string; id: string }
) {
  const { workspaceId, objectId, id } = props;
  console.log('deletePinAndMessage', props, store.workspaces[workspaceId]);
  const { threadId, eventId } = store.workspaces[workspaceId].openPins[objectId][id];
  await actions.deleteMessage(store, { workspaceId, threadId, eventId });
}
