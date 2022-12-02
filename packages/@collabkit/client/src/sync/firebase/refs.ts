import { FirebaseId } from '@collabkit/core';
import { getApp } from 'firebase/app';
import { getDatabase, ref as firebaseRef } from 'firebase/database';

export function ref(strings: TemplateStringsArray, ...substitutions: string[]) {
  const path = substitutions.reduce(
    (prev, cur, i) => prev + FirebaseId.encode(cur) + strings[i + 1],
    strings[0]
  );
  return firebaseRef(getDatabase(getApp('CollabKit')), path);
}

ref.path = (strings: TemplateStringsArray, ...substitutions: string[]) => {
  const path = substitutions.reduce(
    (prev, cur, i) => prev + FirebaseId.encode(cur) + strings[i + 1],
    strings[0]
  );
  return path;
};

export function timelineRef(appId: string, workspaceId: string, threadId: string) {
  return ref`/timeline/${appId}/${workspaceId}/${threadId}`;
}

export function typingRef(appId: string, workspaceId: string, threadId: string) {
  return ref`/isTyping/${appId}/${workspaceId}/${threadId}`;
}

export function userTypingRef(
  appId: string,
  workspaceId: string,
  threadId: string,
  userId: string
) {
  return ref`/isTyping/${appId}/${workspaceId}/${threadId}/${userId}`;
}
