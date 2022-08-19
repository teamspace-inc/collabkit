import { onChildAdded, onChildRemoved, onDisconnect } from 'firebase/database';
import type { Subscriptions, Sync } from '@collabkit/core';
import { typingRef, userTypingRef } from './refs';

export async function subscribeThreadIsTyping(props: {
  appId: string;
  userId?: string;
  workspaceId: string;
  threadId: string;
  subs: Subscriptions;
  onThreadTypingChange: (event: Sync.TypingEvent) => void;
}) {
  const { appId, userId, workspaceId, threadId, subs } = props;

  console.log('subscribeThreadIsTyping', { appId, userId, workspaceId, threadId });

  const key = `isTyping-${workspaceId}/${threadId}`;
  const addedKey = `${key}-added`;
  const removedKey = `${key}-removed`;

  if (userId) {
    await onDisconnect(userTypingRef(appId, workspaceId, threadId, userId)).remove();
  }

  const isTypingRef = typingRef(appId, workspaceId, threadId);

  if (subs[addedKey] && subs[removedKey]) {
    return;
  }

  try {
    subs[addedKey] = onChildAdded(isTypingRef, (snapshot) => {
      const userId = snapshot.key;
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
      const userId = snapshot.key;
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
