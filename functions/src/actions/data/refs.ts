import * as FirebaseId from './FirebaseId';
import { database } from 'firebase-admin';

export function ref(strings: TemplateStringsArray, ...substitutions: string[]) {
  const path = substitutions.reduce(
    (prev, cur, i) => prev + FirebaseId.encode(cur) + strings[i + 1],
    strings[0]
  );
  return database().ref(path);
}
