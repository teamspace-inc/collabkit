import type { Event, Store } from '@collabkit/core';
import { getConfig, actions } from './index';

export async function resolveThread(store: Store, workspaceId: string, threadId: string) {
  const { appId, userId } = getConfig(store);
  if (!userId) {
    console.warn('CollabKit: cannot resolve thread, anonymous user');
    return;
  }

  if (store.isReadOnly) {
    console.warn('CollabKit: cannot resolve thread in read-only mode');
    return;
  }

  actions.closeThread(store);
  delete store.workspaces[workspaceId].openThreads[threadId];

  const event: Event = {
    type: 'system',
    body: '',
    system: 'resolve',
    createdAt: store.sync.serverTimestamp(),
    createdById: userId,
  };
  const { id } = await store.sync.saveEvent({
    appId,
    workspaceId,
    threadId,
    event,
  });

  store.workspaces[workspaceId].timeline[threadId] ||= {};
  store.workspaces[workspaceId].timeline[threadId][id] = {
    ...event,
    createdAt: +Date.now(),
    id,
  };
  try {
    await store.sync.markResolved({ appId, workspaceId, threadId });
    if (store.workspaces[workspaceId].pins[threadId]) {
      store.workspaces[workspaceId].pins[threadId].state = 'resolved';
    }
  } catch (e) {
    console.error('failed to set thread state', e);
  }
  actions.stopTyping(store, {
    target: { type: 'composer', workspaceId, threadId, eventId: 'default' },
  });
}
