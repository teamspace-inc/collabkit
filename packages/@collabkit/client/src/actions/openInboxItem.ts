import { Store } from '@collabkit/core';
import { select } from './select';

export function openInboxItem(store: Store, props: { threadId: string; workspaceId: string }) {
  const { threadId, workspaceId } = props;
  const { workspaces, userId } = store;
  if (!userId) return;
  const workspace = workspaces[workspaceId];
  const eventId = Object.keys(workspace.computed[threadId].canonicalEvents)[0];
  const event = workspace.computed[threadId].canonicalEvents[eventId];

  // if we detect a pin return that
  if (event?.attachments) {
    const attachmentIds = Object.keys(event.attachments);
    for (const attachmentId of attachmentIds) {
      const attachment = event.attachments[attachmentId];
      if (attachment.type === 'pin') {
        const pinTarget = {
          type: 'pin',
          id: attachmentId,
          workspaceId,
          objectId: attachment.objectId,
          threadId,
          eventId,
        } as const;
        select(store, {
          target: pinTarget,
        });
        return;
      }
    }
  }

  store.callbacks?.onInboxThreadClick?.({
    userId,
    workspaceId,
    threadId,
    info: {},
  });
}
