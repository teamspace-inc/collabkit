import { Unsubscribe } from 'firebase/database';
import { initializeApp } from '@firebase/app';
import { Color } from './colors';
import { LexicalEditor } from 'lexical';

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

export type Target =
  | ComposerTarget
  | ThreadTarget
  | CommentButtonTarget
  | CommentTarget
  | CommentReactionTarget
  | ThreadResolveButtonTarget
  | ThreadCloseButtonTarget
  | ReopenThreadButtonTarget;

export type ComposerTarget = { type: 'composer'; threadId: string; workspaceId: string };
export type ThreadTarget = { type: 'thread'; threadId: string; workspaceId: string };
export type CommentButtonTarget = { type: 'commentButton'; threadId: string; workspaceId: string };

export type CommentReactionTarget = {
  type: 'commentReaction';
  emoji: string;
  comment: CommentTarget;
};

export type ThreadResolveButtonTarget = {
  type: 'resolveThreadButton';
  threadId: string;
  workspaceId: string;
};

export type ReopenThreadButtonTarget = {
  type: 'reopenThreadButton';
  threadId: string;
  workspaceId: string;
};

export type ThreadCloseButtonTarget = {
  type: 'closeThreadButton';
  threadId: string;
  workspaceId: string;
};

export type CommentTarget = {
  type: 'comment';
  threadId: string;
  workspaceId: string;
  eventId: string;
};

export type Event = {
  type: 'message' | 'reaction' | 'adminMessage' | 'system';
  body: string;
  system?: 'resolve' | 'reopen';
  createdAt: number | object;
  createdById: string;
  parentId?: string;
};

export type WithName<T> = T & {
  name: string;
};

export type WithID<T> = T & {
  id: string;
};

export type IdentifyProps = {
  workspaceId: string;
  userId: string;
  workspaceName?: string | null;
  name?: string | null;
  email?: string | null;
  avatar?: string | null;
};

export type SetupProps = {
  appId: string;
  apiKey: string;
  mode: 'UNSECURED' | 'SECURED';
};

export type MentionProps = Mention[];

export interface Mention extends BasicProfile {
  workspaceId: string;
  userId: string;
}

export type BasicProfile = {
  name?: string | null;
  avatar?: string | null;
  email?: string | null;
};

export interface Profile extends BasicProfile {
  color: Color;
}

export interface Timeline {
  [eventId: string]: Event;
}

export interface Composer {
  editor: LexicalEditor;
  $$body: string;
  isTypingTimeoutID?: number | NodeJS.Timeout;
  isTyping: { [endUserId: string]: boolean };
}

export interface Workspace {
  name: string;
  inbox: { [threadId: string]: WithName<Event> };
  timeline: { [threadId: string]: Timeline };
  composers: { [threadId: string]: Composer };
  seen: { [threadId: string]: string }; // lastSeenEventId
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
    mentions: MentionProps | null | undefined;
  };
  profiles: { [profileId: string]: Profile };
  workspaces: {
    [workspaceId: string]: Workspace;
  };
  appState: 'blank' | 'config' | 'ready';
  uiState: 'idle' | 'reacting';
  reactingId: null | Target;
  subs: { [subId: string]: Unsubscribe };
}
