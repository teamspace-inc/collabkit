import { Event, Store } from '../constants';
import { actions, getConfig } from './index';

export async function reopenThread(store: Store, workspaceId: string, threadId: string) {
  const { userId } = getConfig(store);
  if (!userId) {
    console.warn('CollabKit: cannot reopen thread, anonymous user');
    return;
  }

  if (store.isReadOnly) {
    console.warn('CollabKit: cannot reopen thread in read-only mode');
    return;
  }
  // todo optimistic send
  try {
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
    };
    actions.stopTyping(store, { target: { type: 'composer', workspaceId, threadId } });
  } catch (e) {
    console.error(e);
    // handle failure here
  }
}
