import type { Store } from '@collabkit/core';
import { closePopoverContent } from './closePopoverContent';
import { createEvent } from './createEvent';

export async function resolveThread(
  store: Store,
  props: { workspaceId: string; threadId: string }
) {
  const { userId } = store;
  const { workspaceId, threadId } = props;
  if (!userId) {
    console.warn('CollabKit: cannot resolve thread, anonymous user');
    return;
  }
  if (store.isReadOnly) {
    console.warn('CollabKit: cannot resolve thread in read-only mode');
    return;
  }
  closePopoverContent(store, { target: { type: 'thread', workspaceId, threadId } });
  store.workspaces[workspaceId].isOpen[threadId] = false;
  store.workspaces[workspaceId].isResolved[threadId] = true;
  try {
    const event = await createEvent(store, {
      event: {
        type: 'system',
        body: '',
        system: 'resolve',
        createdAt: store.sync.serverTimestamp(),
        createdById: userId,
      },
      parentEvent: null,
      threadId,
    });
    store.callbacks?.onThreadResolve?.({
      userId,
      workspaceId,
      threadId,
      info: store.workspaces[workspaceId].threadInfo[threadId],
    });
    return event;
  } catch (e) {
    console.error('failed to resolve thread', e);
    store.workspaces[workspaceId].isOpen[threadId] = true;
    store.workspaces[workspaceId].isResolved[threadId] = true;
  }
}
