import { Event, Store } from '../constants';
import { getConfig, actions } from './index';

export async function resolveThread(store: Store, workspaceId: string, threadId: string) {
  const { appId, userId } = getConfig(store);
  if (store.isReadOnly) {
    console.warn('CollabKit: cannot resolve thread in read-only mode');
    return;
  }
  // todo optimistic send
  try {
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
    };
    try {
      store.sync.markResolved;
    } catch (e) {
      console.error('failed to set pin state', e);
    }
    actions.stopTyping(store, { target: { type: 'composer', workspaceId, threadId } });
  } catch (e) {
    console.error(e);
    // handle failure here
  }
}
