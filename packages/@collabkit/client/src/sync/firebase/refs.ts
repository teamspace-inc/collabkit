import { FirebaseId } from '@collabkit/core';
import { getApp } from 'firebase/app';
import { getDatabase, ref as firebaseRef } from 'firebase/database';

export function ref(strings: TemplateStringsArray, ...substitutions: string[]) {
  const path = encodePath(strings, ...substitutions);
  return firebaseRef(getDatabase(getApp('CollabKit')), path);
}

function encodePath(strings: TemplateStringsArray, ...substitutions: string[]) {
  return substitutions.reduce(
    (prev, cur, i) => prev + FirebaseId.encode(cur) + strings[i + 1],
    strings[0]
  );
}

ref.path = encodePath;

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
