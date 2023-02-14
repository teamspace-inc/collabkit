import type { Store } from '@collabkit/core';
import { createEvent } from './createEvent';
import { actions } from './index';

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
  actions.closePopoverContent(store, { target: { type: 'thread', workspaceId, threadId } });
  delete store.workspaces[workspaceId].openThreads[threadId];
  await createEvent(store, {
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
  store.config.callbacks?.onThreadResolve?.({
    userId,
    workspaceId,
    threadId,
    info: store.workspaces[workspaceId].threadInfo[threadId],
  });
}
