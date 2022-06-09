import { Unsubscribe } from 'firebase/database';

import { initializeApp } from '@firebase/app';
import { Color } from './colors';

const firebaseConfig = {
  apiKey: 'AIzaSyDYl8MwTEgsIzXO7EHgBlvuN5BLVJqPZ6k',
  authDomain: 'collabkit-dev.firebaseapp.com',
  databaseURL: 'https://collabkit-dev-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'collabkit-dev',
  storageBucket: 'collabkit-dev.appspot.com',
  messagingSenderId: '927079647438',
  appId: '1:927079647438:web:3535f7ba40a758167ee89f',
};

export const CollabKitFirebaseApp = initializeApp(firebaseConfig, 'CollabKit');

export type Target = ComposerTarget | ThreadTarget;

type ComposerTarget = { type: 'composer'; threadId: string };
type ThreadTarget = { type: 'thread'; threadId: string };

export interface Event {
  type: 'message' | 'reaction';
  body: string;
  createdAt: number;
  createdById: string;
  parentId?: string;
}

export type IdentifyProps = {
  userId: string;
  name?: string | null;
  email?: string | null;
  avatar?: string | null;
};

export type SetupProps = {
  appId: string;
  apiKey: string;
  mode: 'UNSECURED' | 'SECURED';
};

export interface Profile {
  name?: string | null;
  avatar?: string | null;
  email?: string | null;
  color: Color;
}

export interface Timeline {
  [eventId: string]: Event;
}

export interface Composer {
  body: string;
}

export interface Store {
  isConnected: boolean;
  token: string;
  selectedId: null | Target;
  focusedId: null | Target;
  config: {
    identify: IdentifyProps | null | undefined;
    setup: SetupProps | null | undefined;
    isSetup: boolean;
    hasIdentified: boolean;
  };
  appState: 'blank' | 'config' | 'ready';
  uiState: 'idle' | 'commenting' | 'selecting' | 'composing';
  timelines: { [threadId: string]: Timeline };
  profiles: { [profileId: string]: Profile };
  composers: {
    [threadId: string]: Composer;
  };
  subs: { [subId: string]: Unsubscribe };
}
