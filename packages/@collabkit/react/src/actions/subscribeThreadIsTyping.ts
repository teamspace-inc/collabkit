import { DB, Store } from '../constants';
import { ref, onChildAdded, onChildRemoved, onDisconnect } from 'firebase/database';
import { getConfig } from './index';

export function subscribeThreadIsTyping(store: Store, workspaceId: string, threadId: string) {
  const { appId, userId } = getConfig(store);

  const key = `isTyping-${workspaceId}/${threadId}`;
  const addedKey = `${key}-added`;
  const removedKey = `${key}-removed`;

  onDisconnect(ref(DB, `/isTyping/${workspaceId}/${threadId}/${userId}`)).remove();

  if (store.subs[addedKey] && store.subs[removedKey]) {
    return;
  }

  const isTypingRef = ref(DB, `/isTyping/${appId}/${workspaceId}/${threadId}`);

  try {
    store.subs[addedKey] = onChildAdded(isTypingRef, (snapshot) => {
      const userId = snapshot.key;
      if (userId) {
        store.workspaces[workspaceId].composers[threadId].isTyping[userId] = true;
      }
    });
    store.subs[removedKey] = onChildRemoved(isTypingRef, (snapshot) => {
      const userId = snapshot.key;
      if (userId) {
        store.workspaces[workspaceId].composers[threadId].isTyping[userId] = false;
      }
    });
  } catch (e) {
    console.error(e);
  }
}
