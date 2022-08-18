import type { Color } from '@collabkit/colors';
import type { LexicalEditor } from 'lexical';
import type { SyncAdapter } from './sync';

export * as Sync from './sync';

export { SyncAdapter };

export type SecureProps = {
  appId: string;
  token: string;
};

export type UserProps = {
  id: string;
  userId?: string;
} & OptionalUserProps;

export type OptionalUserProps = {
  name?: string | null;
  email?: string | null;
  avatar?: string | null;
};

export type WorkspaceProps = {
  id: string;
} & OptionalWorkspaceProps;

export type OptionalWorkspaceProps = {
  name?: string | null;
};

export type UnsecureProps = {
  apiKey: string;
  appId: string;
  user?: UserProps | null;
  workspace?: WorkspaceProps | null;
};

export type ConfigProps = {
  mentionableUsers: MentionProps;
  onAuthenticationRequired?: () => void;
  colorScheme?: 'light' | 'dark' | 'auto';
  readOnly?: boolean;
  _demoStore?: Store;
  _isDemo?: boolean;
};

export type Config = (SecureProps | UnsecureProps) & ConfigProps;

export enum Edge {
  Top = 'top_edge',
  Right = 'right_edge',
  Bottom = 'bottom_edge',
  Left = 'left_edge',
}

export enum Corner {
  TopLeft = 'top_left_corner',
  TopRight = 'top_right_corner',
  BottomRight = 'bottom_right_corner',
  BottomLeft = 'bottom_left_corner',
}

export type Intersection =
  | Corner.TopLeft
  | Corner.TopRight
  | Corner.BottomRight
  | Corner.BottomLeft
  | Edge.Top
  | Edge.Right
  | Edge.Bottom
  | Edge.Left
  | 'none'
  | 'pending';

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

export type MentionProps = readonly Mention[];

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
  isTypingTimeoutID?: ReturnType<typeof setTimeout>;
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
  state: 'new' | 'pending' | 'open' | 'resolved' | 'deleted';
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
  threadInfo: { [threadId: string]: { name?: string; url?: string } };
}

export interface Store {
  sync: SyncAdapter;
  isReadOnly: boolean;
  isConnected: boolean;
  isSignedIn: boolean;
  isDemo: boolean;
  userId: string | null;
  user: UserProps | null;
  workspaceId: string | null;
  selectedId: null | Target;
  focusedId: null | Target;
  hoveringId: null | Target;
  reactingId: null | Target;
  composingId: null | ThreadTarget;
  viewingId: null | Target;
  config: Config;
  profiles: { [profileId: string]: Profile };
  workspaces: {
    [workspaceId: string]: Workspace;
  };
  appState: 'blank' | 'config' | 'ready';
  uiState: 'idle' | 'selecting' | 'continuous';
  subs: Subscriptions;
}

export type Unsubscribe = () => void;
export type Subscriptions = { [subId: string]: Unsubscribe };
