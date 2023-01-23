import type { Color } from '@collabkit/colors';
import type { LexicalEditor } from 'lexical';
import type { SyncAdapter } from './sync';

export * as Sync from './sync';
export interface ThreadMeta {
  viewId?: string;
  cellId?: string; // todo rename to threadId
  [x: string]: unknown;
}

export interface ObjectMeta {
  [x: string]: any;
}

export type ObjectProps = {
  objectId: string;
  objectName?: string;
  objectUrl?: string;
};

export type ThreadInfo = {
  name?: string | null;
  url?: string | null;
  meta?: ThreadMeta | null;
  defaultSubscribers?: readonly string[];
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
  onThreadCreated?: (data: {
    userId: string;
    workspaceId: string;
    threadId: string;
    info: ThreadInfo;
    event: WithID<Event>;
  }) => void;
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
  onInboxThreadClick?: (data: {
    userId: string;
    workspaceId: string;
    threadId: string;
    info: ThreadInfo;
  }) => void;
  onThreadResolve?: (data: {
    userId: string;
    workspaceId: string;
    threadId: string;
    info: ThreadInfo;
  }) => void;
  onThreadReopen?: (data: {
    userId: string;
    workspaceId: string;
    threadId: string;
    info: ThreadInfo;
  }) => void;
  onInboxCloseButtonClick?: (data: { userId: string; workspaceId: string }) => void;
};

export type ConfigProps = {
  mentionableUsers: MentionProps;
  onAuthenticationRequired?: () => void;
  colorScheme?: 'light' | 'dark' | 'auto';
  callbacks?: Callbacks;
  readOnly?: boolean;
  _demoStore?: Store;
  _isDemo?: boolean;
  _test?: boolean;
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
  | MenuTarget
  | CommentMenuTarget
  | CommentEditButtonTarget
  | CommentDeleteButtonTarget
  | ShowSidebarButtonTarget
  | HideSidebarButtonTarget
  | ComposerPinButtonTarget
  | ComposerMentionsButtonTarget
  | AttachPinTarget
  | PinTarget
  | PinDeleteButton
  | CommentSaveButtonTarget
  | CommentCancelButtonTarget;

export type PinTarget = {
  type: 'pin';
  objectId: string;
  id: string;
  threadId: string;
  workspaceId: string;
  isPending?: boolean;
};

export type AttachPinTarget = {
  type: 'attachPin';
  objectId: string;
  x: number;
  y: number;
};

export type ComposerMentionsButtonTarget = {
  type: 'composerMentionsButton';
  threadId: string;
  workspaceId: string;
  eventId: string | 'default';
};

export type ComposerPinButtonTarget = {
  type: 'composerPinButton';
  threadId: string;
  workspaceId: string;
  eventId: string | 'default';
};

export type MenuTarget = {
  type: 'menu';
  nodeId: string;
  parentId: string | null;
  context?: Target;
};

export type PinDeleteButton = {
  type: 'pinDeleteButton';
  pin: PinTarget;
};

export type CommentMenuTarget = MenuTarget & CommentTarget;

export type Commentable = {
  type: 'commentable';
  workspaceId: string;
};

export type CommentType = 'default' | 'inline-start' | 'inline' | 'inline-end';

export type CommentableContainer = { type: 'commentableContainer'; workspaceId: string };

export type FloatingCommentButtonTarget = { type: 'floatingCommentButton' };

export type ComposerTarget = {
  type: 'composer';
  threadId: string;
  workspaceId: string;
  eventId: string | 'default';
};

export type ThreadTarget = { type: 'thread'; threadId: string; workspaceId: string };

export type CommentButtonTarget = { type: 'commentButton'; threadId: string; workspaceId: string };

export type ShowSidebarButtonTarget = { type: 'showSidebarButton'; workspaceId: string };

export type HideSidebarButtonTarget = {
  type: 'hideSidebarButton';
  workspaceId: string;
};

export type CommentReactionTarget = {
  type: 'commentReaction';
  emoji: string;
  comment: CommentTarget;
};

export type CommentEditButtonTarget = {
  type: 'commentEditButton';
  comment: CommentTarget;
};

export type CommentDeleteButtonTarget = {
  type: 'commentDeleteButton';
  comment: CommentTarget;
};

export type CommentSaveButtonTarget = {
  type: 'commentSaveButton';
  comment: CommentTarget;
};

export type CommentCancelButtonTarget = {
  type: 'commentCancelButton';
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
  treeId: string;
};

export type EventType = 'message' | 'reaction' | 'adminMessage' | 'system' | 'delete' | 'edit';

// TODO: this should be a union of different message types
export type Event = {
  type: EventType;
  body: string;
  system?: 'resolve' | 'reopen';
  createdAt: number | object;
  createdById: string;
  parentId?: string;
  mentions?: readonly string[];
  pinId?: string;
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
  [eventId: string]: WithHasProfile<WithID<Event>>;
}

export interface Composer {
  editor: LexicalEditor | null;
  $$body: string;
  mentions: string[];
  enabled: boolean;
  isTypingTimeoutID?: ReturnType<typeof setTimeout>;
  isTyping: { [endUserId: string]: boolean };
  isMentioning: boolean;
  pendingPin: null | PendingPin;
}

export type FirebasePin = {
  x: number;
  y: number;
  threadId: string;
  eventId: string;
};

export type Pin = {
  id: string;
  objectId: string;
  x: number;
  y: number;
  workspaceId: string;
  threadId: string;
  eventId: string;
};

export type PendingPin = Pin & {
  isPending: true;
};

export interface SeenBy {
  [userId: string]: { seenAt: number; seenUntilId: string };
}

type OpenThreadIds = string[];

export interface Workspace {
  profiles: { [userId: string]: boolean };
  name: string;
  openThreads: { [threadId: string]: { meta: ThreadMeta } };
  pendingThreadInfo: { [threadId: string]: ThreadInfo };
  pendingThreads: { [objectId: string]: string };
  objects: { [objectId: string]: OpenThreadIds };
  inbox: { [threadId: string]: WithID<Event> };
  timeline: { [threadId: string]: Timeline };
  timelineInitialFetchComplete: { [threadId: string]: boolean };
  composers: { [threadId: string]: { [eventId: string]: Composer } };
  seen: { [threadId: string]: string }; // lastSeenEventId
  seenBy: { [threadId: string]: SeenBy };
  threadInfo: { [threadId: string]: ThreadInfo };
  likelyFetchedAllProfiles: boolean;
  threadProfiles: { [threadId: string]: { [userId: string]: boolean } };
  fetchedProfiles: { [threadId: string]: { [userId: string]: boolean } };
  openPins: { [objectId: string]: { [pinId: string]: Pin } };
  eventPins: { [eventId: string]: Pin };
}

// get all pins for the workspace that have an open thread attached to them (we don't want resolved ones)
// get all threads for these pins in one query (comment sidebar speed)

export interface UnconfiguredStore {
  featureToggles: { [feature: string]: boolean };
  appId: null | string;
  sync: null | SyncAdapter;
  isReadOnly: boolean;
  isConnected: boolean;
  isSidebarOpen: boolean;
  isDemo: boolean;
  userId: string | null;
  user: UserProps | null;
  workspaceId: string | null;
  focusedId: null | Target;
  reactingId: null | Target;
  menuId: null | Target;
  viewingId: null | Target;
  previewingId: null | Target;
  editingId: null | CommentTarget;
  composerId: null | ComposerTarget;
  config: null | Config;
  avatarErrors: { [avatar: string]: boolean };
  profiles: { [profileId: string]: Profile | undefined };
  workspaces: {
    [workspaceId: string]: Workspace;
  };
  mentionableUsers: { [userId: string]: MentionWithColor };
  appState: 'blank' | 'config' | 'ready';
  uiState: 'idle' | 'selecting';
  subs: Subscriptions;
  callbacks?: Callbacks;
  clientX: number;
  clientY: number;
  commentableElements: Map<string, HTMLElement | SVGElement>;
}

export interface Store extends UnconfiguredStore {
  sync: SyncAdapter;
  config: Config;
  allPins: Pin[];
}

export type Unsubscribe = () => void;
export type Subscriptions = { [subId: string]: Unsubscribe };
