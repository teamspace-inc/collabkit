import { getApp } from 'firebase/app';
import { getDatabase, ref } from 'firebase/database';

export function timelineRef(appId: string, workspaceId: string, threadId: string) {
  return ref(getDatabase(getApp('CollabKit')), `/timeline/${appId}/${workspaceId}/${threadId}/`);
}

export function typingRef(appId: string, workspaceId: string, threadId: string) {
  return ref(getDatabase(getApp('CollabKit')), `/isTyping/${appId}/${workspaceId}/${threadId}`);
}

export function userTypingRef(
  appId: string,
  workspaceId: string,
  threadId: string,
  userId: string
) {
  return ref(
    getDatabase(getApp('CollabKit')),
    `/isTyping/${appId}/${workspaceId}/${threadId}/${userId}`
  );
}
