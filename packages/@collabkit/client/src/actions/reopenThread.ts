import type { Event, Store } from '@collabkit/core';
import { generateObjectIdFromCellId } from '..';
import { actions } from './index';

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
  // todo optimistic send
  const event: Event = {
    type: 'system',
    body: '',
    system: 'reopen',
    createdAt: store.sync.serverTimestamp(),
    createdById: userId,
  };
  const { id } = await store.sync.saveEvent({
    appId: store.config.appId,
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
  store.config.callbacks?.onThreadReopen?.({
    userId,
    workspaceId,
    threadId,
    info: generateObjectIdFromCellId(store.workspaces[workspaceId].threadInfo[threadId]),
  });
  await actions.stopTyping(store, {
    target: { workspaceId, threadId, eventId: 'default' },
  });
  return id;
}
