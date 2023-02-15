import { onChildAdded, onChildRemoved, onDisconnect } from 'firebase/database';
import type { Subscriptions, Sync } from '@collabkit/core';
import { FirebaseId } from '@collabkit/core';
import { ref } from './refs';

export async function subscribeThreadIsTyping(props: {
  appId: string;
  userId?: string;
  workspaceId: string;
  threadId: string;
  subs: Subscriptions;
  onThreadTypingChange: (event: Sync.TypingEvent) => void;
}) {
  const { appId, userId, workspaceId, threadId, subs } = props;
  const key = `isTyping-${workspaceId}/${threadId}`;
  const addedKey = `${key}-added`;
  const removedKey = `${key}-removed`;
  if (subs[addedKey] && subs[removedKey]) {
    return;
  }

  if (userId) {
    await onDisconnect(ref`/isTyping/${appId}/${workspaceId}/${threadId}/${userId}`).remove();
  }

  const isTypingRef = ref`/isTyping/${appId}/${workspaceId}/${threadId}`;

  try {
    subs[addedKey] = onChildAdded(isTypingRef, (snapshot) => {
      const userId = snapshot.key && FirebaseId.decode(snapshot.key);
      if (userId) {
        props.onThreadTypingChange({
          threadId,
          workspaceId,
          userId,
          isTyping: true,
        });
      }
    });
    subs[removedKey] = onChildRemoved(isTypingRef, (snapshot) => {
      const userId = snapshot.key && FirebaseId.decode(snapshot.key);
      if (userId) {
        props.onThreadTypingChange({
          threadId,
          workspaceId,
          userId,
          isTyping: false,
        });
      }
    });
  } catch (e) {
    console.error(e);
  }
}
