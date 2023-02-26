import type { Store } from '@collabkit/core';
import { createEvent } from './createEvent';

export async function reopenThread(store: Store, props: { workspaceId: string; threadId: string }) {
  const { workspaceId, threadId } = props;
  const { userId } = store;
  if (!userId) {
    console.warn('CollabKit: cannot reopen thread, anonymous user');
    return;
  }
  if (store.isReadOnly) {
    console.warn('CollabKit: cannot reopen thread in read-only mode');
    return;
  }
  const event = await createEvent(store, {
    event: {
      type: 'system',
      body: '',
      system: 'reopen',
      createdAt: store.sync.serverTimestamp(),
      createdById: userId,
    },
    parentEvent: null,
    threadId,
  });
  store.callbacks?.onThreadReopen?.({
    userId,
    workspaceId,
    threadId,
    info: store.workspaces[workspaceId].threadInfo[threadId],
  });
  return event;
}
