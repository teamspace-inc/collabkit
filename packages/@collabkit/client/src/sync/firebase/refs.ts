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
