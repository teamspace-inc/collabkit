import type { Store } from '@collabkit/core';
import { ref, snapshot } from 'valtio';
import { initComposer } from './initComposer';
import { select } from './select';

export function startEditing(
  store: Store,
  target: { eventId: string; workspaceId: string; threadId: string; treeId: string }
) {
  store.editingId = {
    ...target,
    type: 'comment',
  };
  store.editingEventSnapshots[target.eventId] = ref(
    snapshot(store.workspaces[target.workspaceId].timeline[target.threadId][target.eventId])
  );
  initComposer(store, target);

  const { eventId, workspaceId, threadId } = target;
  const { attachments } = store.workspaces[workspaceId].timeline[threadId][eventId];
  if (attachments) {
    store.workspaces[workspaceId].composers[threadId][eventId].attachments = JSON.parse(
      JSON.stringify(attachments)
    );
    const pinId = Object.keys(attachments).find((id) => attachments[id].type === 'pin');
    if (pinId) {
      const pin = attachments[pinId];
      const pinTarget = {
        type: 'pin',
        id: pinId,
        workspaceId,
        threadId,
        objectId: pin.objectId,
        eventId,
      } as const;
      select(store, { target: pinTarget });
    }
  }
}
