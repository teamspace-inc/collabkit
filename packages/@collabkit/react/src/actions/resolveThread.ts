import { push, set, serverTimestamp, ref } from 'firebase/database';
import { DB, Event, Store } from '../constants';
import { getConfig, timelineRef, actions } from './index';

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
      try {
        set(ref(DB, `pins/${appId}/${workspaceId}/${threadId}/state`), 'resolved');
      } catch (e) {
        console.error('failed to set pin state', e);
      }
      actions.stopTyping(store, { target: { type: 'composer', workspaceId, threadId } });
    } else {
      console.error('CollabKit: failed to resolve thread');
      // handle failure here
    }
  } catch (e) {
    console.error(e);
    // handle failure here
  }
}
