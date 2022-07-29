import { Event, Store } from '../constants';
import { getConfig, actions } from './index';

export async function reopenThread(store: Store, workspaceId: string, threadId: string) {
  const { userId } = getConfig(store);
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
      appId: store.config.setup!.appId,
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
