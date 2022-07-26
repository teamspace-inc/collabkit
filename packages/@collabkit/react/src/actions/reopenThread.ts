import { push, serverTimestamp } from 'firebase/database';
import { Event, Store } from '../constants';
import { getConfig, timelineRef, actions } from './index';

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
      createdAt: serverTimestamp(),
      createdById: userId,
    };
    const eventRef = await push(timelineRef(store, workspaceId, threadId), event);
    if (eventRef.key) {
      store.workspaces[workspaceId].timeline[threadId] ||= {};
      store.workspaces[workspaceId].timeline[threadId][eventRef.key] = {
        ...event,
        createdAt: +Date.now(),
      };
      actions.stopTyping(store, { target: { type: 'composer', workspaceId, threadId } });
    } else {
      console.error('CollabKit: failed to open thread');
      // handle failure here
    }
  } catch (e) {
    console.error(e);
    // handle failure here
  }
}
