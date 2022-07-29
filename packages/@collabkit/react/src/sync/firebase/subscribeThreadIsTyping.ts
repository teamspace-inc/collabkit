import { Subscriptions } from '../../constants';
import { onChildAdded, onChildRemoved, onDisconnect } from 'firebase/database';
import { TypingEvent } from '../types';
import { typingRef } from './refs';

export function subscribeThreadIsTyping(props: {
  appId: string;
  userId: string;
  workspaceId: string;
  threadId: string;
  subs: Subscriptions;
  onThreadTypingChange: (event: TypingEvent) => void;
}) {
  const { appId, userId, workspaceId, threadId, subs } = props;

  const key = `isTyping-${workspaceId}/${threadId}`;
  const addedKey = `${key}-added`;
  const removedKey = `${key}-removed`;

  const isTypingRef = typingRef(appId, workspaceId, threadId, userId);
  onDisconnect(isTypingRef).remove();

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
