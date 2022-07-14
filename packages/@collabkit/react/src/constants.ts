import { getDatabase, Unsubscribe } from 'firebase/database';
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

export const DB = getDatabase(CollabKitFirebaseApp);

export type Target =
  | ComposerTarget
  | ThreadTarget
  | CommentButtonTarget
  | CommentTarget
  | CommentReactionTarget
  | ThreadResolveButtonTarget
  | ThreadCloseButtonTarget
  | ReopenThreadButtonTarget
  | FloatingCommentButtonTarget
  | CommentableContainer
  | Commentable
  | PinTarget;

export type Commentable = {
  type: 'commentable';
  workspaceId: string;
  pin: BasicPinProps;
};

export type CommentType = 'default' | 'inline-start' | 'inline' | 'inline-end';

export type ThreadType = 'inline' | 'popover';

export type BasicPinProps = {
  selector: string;
  url: string;
  offset: { x: number; y: number };
};

export type PinTarget = {
  type: 'pin';
  pinId: string;
  workspaceId: string;
};

export type CommentableContainer = { type: 'commentableContainer'; workspaceId: string };

export type FloatingCommentButtonTarget = { type: 'floatingCommentButton' };

export type ComposerTarget = { type: 'composer'; threadId: string; workspaceId: string };

export type ThreadTarget = { type: 'thread'; threadId: string; workspaceId: string };

export type CommentButtonTarget = { type: 'commentButton'; threadId: string; workspaceId: string };

export type ClickedOutsidePinTarget = {
  type: 'clickedOutsidePin';
  workspaceId: string;
  pinId: string;
};

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
  workspaceId?: string;
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
  color?: Color;
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

export interface SeenBy {
  [userId: string]: { seenAt: number; seenUntilId: string };
}

export interface Pin {
  selector: string;
  offset: { x: number; y: number };
  url: string;
  createdById: string;
  createdAt: number;
  state: 'pending' | 'open' | 'resolved' | 'deleted';
}

export interface Workspace {
  profiles: { [userId: string]: boolean };
  name: string;
  pins: { [threadId: string]: Pin };
  inbox: { [threadId: string]: WithID<WithName<Event>> };
  timeline: { [threadId: string]: Timeline };
  composers: { [threadId: string]: Composer };
  seen: { [threadId: string]: string }; // lastSeenEventId
  seenBy: { [threadId: string]: SeenBy };
}

export interface Store {
  isConnected: boolean;
  token: string;
  selectedId: null | Target;
  focusedId: null | Target;
  hoveringId: null | Target;
  reactingId: null | Target;
  composingId: null | ThreadTarget;
  viewingId: null | Target;
  config: {
    identify: IdentifyProps | null | undefined;
    setup: SetupProps | null | undefined;
    mentions: MentionProps | null | undefined;
    workspace: { id: string; name?: string } | null | undefined;
  };
  profiles: { [profileId: string]: Profile };
  workspaces: {
    [workspaceId: string]: Workspace;
  };
  appState: 'blank' | 'config' | 'ready';
  uiState: 'idle' | 'selecting' | 'composing' | 'viewing';
  subs: { [subId: string]: Unsubscribe };
}
