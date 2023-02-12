import type { Event, Store } from '@collabkit/core';
import { generateObjectIdFromCellId } from '../utils/generateObjectIdFromCellId';
import { actions } from './index';

export async function resolveThread(
  store: Store,
  props: { workspaceId: string; threadId: string }
) {
  const { appId, userId } = store;
  const { workspaceId, threadId } = props;

  if (!appId) {
    console.warn('CollabKit: cannot resolve thread, no appId');
    return;
  }

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
    store.config.callbacks?.onThreadResolve?.({
      userId,
      workspaceId,
      threadId,
      info: generateObjectIdFromCellId(store.workspaces[workspaceId].threadInfo[threadId]),
    });
  } catch (e) {
    console.error('failed to set thread state', e);
  }
  await actions.stopTyping(store, {
    target: { workspaceId, threadId, eventId: 'default' },
  });
  return id;
}
