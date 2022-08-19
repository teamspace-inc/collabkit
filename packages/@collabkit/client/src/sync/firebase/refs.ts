import { ref } from 'firebase/database';
import { DB } from './setup';

export function timelineRef(appId: string, workspaceId: string, threadId: string) {
  return ref(DB, `/timeline/${appId}/${workspaceId}/${threadId}/`);
}

export function typingRef(appId: string, workspaceId: string, threadId: string) {
  return ref(DB, `/isTyping/${appId}/${workspaceId}/${threadId}`);
}

export function userTypingRef(
  appId: string,
  workspaceId: string,
  threadId: string,
  userId: string
) {
  return ref(DB, `/isTyping/${appId}/${workspaceId}/${threadId}/${userId}`);
}
