import type { Color } from '@collabkit/colors';
import type { LexicalEditor } from 'lexical';
import type { SyncAdapter } from './sync';

export * as Sync from './sync';
export interface ThreadMeta {
  viewId?: string;
  cellId?: string;
}

export type ThreadInfo = {
  name?: string | null;
  url?: string | null;
  meta?: ThreadMeta | null;
};

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

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

export type Callbacks = {
  onCommentSend?: (data: {
    userId: string;
    workspaceId: string;
    threadId: string;
    event: WithID<Event>;
  }) => void;
  onTimestampClick?: (data: {
    userId: string;
    workspaceId: string;
    threadId: string;
    event: WithID<Event> | null;
    timestamp: string;
  }) => void;
  onMentionClick?: (data: {
    userId: string;
    workspaceId: string;
    threadId: string;
    event: WithID<Event> | null;
    mention: MentionWithColor;
  }) => void;
};

export type ConfigProps = {
  mentionableUsers: MentionProps;
  onAuthenticationRequired?: () => void;
  colorScheme?: 'light' | 'dark' | 'auto';
  callbacks?: Callbacks;
  readOnly?: boolean;
  _demoStore?: Store;
  _isDemo?: boolean;
  _firebaseConfig?: FirebaseConfig;
};

export type FirebaseConfig = {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
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
  mentions?: {
    [userId: string]: boolean;
  } | null;
};

export type WithName<T> = T & {
  name: string;
};

export type WithID<T> = T & {
  id: string;
};

export type WithHasProfile<T> = T & {
  hasProfile?: boolean;
};

export type MentionProps = readonly Mention[] | 'allWorkspace';

export interface Mention extends BasicProfile {
  workspaceId: string;
  id: string;
}

export interface MentionWithColor extends Mention {
  color: Color;
}

export type BasicProfile = {
  name?: string | null;
  avatar?: string | null;
  email?: string | null;
};

export interface Profile extends BasicProfile {
  color: Color;
  id: string;
}

export interface Timeline {
  [eventId: string]: WithHasProfile<Event>;
}

export interface Composer {
  editor: LexicalEditor | null;
  $$body: string;
  $$mentions: MentionWithColor[];
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
  openThreads: { [threadId: string]: { meta: ThreadMeta } };
  pins: { [threadId: string]: Pin };
  inbox: { [threadId: string]: WithHasProfile<WithID<WithName<Event>>> };
  timeline: { [threadId: string]: Timeline };
  composers: { [threadId: string]: Composer };
  seen: { [threadId: string]: string }; // lastSeenEventId
  seenBy: { [threadId: string]: SeenBy };
  threadInfo: { [threadId: string]: ThreadInfo };
  likelyFetchedAllProfiles: boolean;
}

export interface UnconfiguredStore {
  sync: null | SyncAdapter;
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
  previewingId: null | Target;
  config: null | Config;
  profiles: { [profileId: string]: Profile };
  workspaces: {
    [workspaceId: string]: Workspace;
  };
  mentionableUsers: { [userId: string]: MentionWithColor };
  appState: 'blank' | 'config' | 'ready';
  uiState: 'idle' | 'selecting' | 'continuous';
  subs: Subscriptions;
  callbacks?: Callbacks;
}

export interface Store extends UnconfiguredStore {
  sync: SyncAdapter;
  config: Config;
}

export type Unsubscribe = () => void;
export type Subscriptions = { [subId: string]: Unsubscribe };
