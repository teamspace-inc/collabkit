import type { Color } from '@collabkit/colors';
import type { LexicalEditor } from 'lexical';
import type { SyncAdapter } from './sync';

export * as Sync from './sync';
export interface ThreadMeta {
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
  onPinClick?: (data: {
    userId: string;
    workspaceId: string;
    objectId: string;
    state: object;
  }) => void;
  onPinHover?: (data: {
    userId: string;
    workspaceId: string;
    threadId: string;
    objectId: string;
    state: object;
  }) => void;
  onPinUnhover?: (data: {
    userId: string;
    workspaceId: string;
    threadId: string;
    objectId: string;
  }) => void;
  onPinDeselect?: (data: {
    userId: string;
    workspaceId: string;
    threadId: string;
    objectId: string;
  }) => void;
  onPinAttach?: (data: {
    userId: string;
    threadId: string;
    workspaceId: string;
    objectId: string;
  }) => object;
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
  | ChannelActonButtonTarget
  | AttachPinTarget
  | PinTarget
  | PinDeleteButton
  | CommentSaveButtonTarget
  | CommentCancelButtonTarget
  | PinCursorTarget
  | OverlayTarget
  | CommentReplyCountButtonTarget
  | CommentReplyButtonTarget
  | EmojiTarget
  | CommentAddEmojiButtonTarget
  | CommentActionsEmojiButtonTarget
  | ChannelTarget;

export type CommentReplyCountButtonTarget = {
  type: 'commentReplyCountButton';
  threadId: string;
  workspaceId: string;
  eventId: string;
};

export type CommentReplyButtonTarget = {
  type: 'commentReplyButton';
  threadId: string;
  workspaceId: string;
  eventId: string;
};

export type EmojiTarget = {
  type: 'emoji';
  emoji: Emoji;
  workspaceId: string;
  threadId: string;
  eventId: string;
};

export type Emoji = {
  n: string[];
  u: string;
  a: string;
};

export type PinCursorTarget = {
  type: 'pinCursor';
};

export type PinTarget = {
  type: 'pin';
  objectId: string;
  id: string;
  threadId: string;
  workspaceId: string;
  isPending?: boolean;
  eventId: string;
};

export type AttachPinTarget = {
  type: 'attachPin';
  objectId: string;
  x: number;
  y: number;
};

export type OverlayTarget = {
  type: 'overlay';
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
  composer: ComposerTarget;
  pinId?: string | null;
  objectId?: string | null;
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
  isNewThread?: boolean;
};

export type ChannelComposerTarget = {
  type: 'channelComposer';
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

export type CommentEmojiButtonTargets =
  | CommentAddEmojiButtonTarget
  | CommentActionsEmojiButtonTarget;

export type CommentAddEmojiButtonTarget = {
  type: 'commentAddEmojiButton';
  workspaceId: string;
  threadId: string;
  eventId: string;
};

export type CommentActionsEmojiButtonTarget = {
  type: 'commentActionsEmojiButton';
  workspaceId: string;
  threadId: string;
  eventId: string;
};

export type CommentReactionTarget = {
  type: 'commentReaction';
  emoji: string;
  eventId: string;
  threadId: string;
  workspaceId: string;
};

export type CommentEditButtonTarget = {
  type: 'commentEditButton';
  workspaceId: string;
  threadId: string;
  eventId: string;
  treeId: string;
};

export type CommentDeleteButtonTarget = {
  type: 'commentDeleteButton';
  workspaceId: string;
  threadId: string;
  eventId: string;
  treeId: string;
};

export type CommentSaveButtonTarget = {
  type: 'commentSaveButton';
  workspaceId: string;
  threadId: string;
  eventId: string;
};

export type CommentCancelButtonTarget = {
  type: 'commentCancelButton';
  workspaceId: string;
  threadId: string;
  eventId: string;
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

export type ChannelTarget = {
  type: 'channel';
  threadId: string;
  workspaceId: string;
  channelId: string;
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
  reactions?: EventReactions;
};

export type WithShowHeader<T> = T & {
  showHeader?: boolean;
};

export type EventReactions = { [emojiU: string]: { count: number; userIds: string[] } };

export type WithName<T> = T & {
  name: string;
};

export type WithID<T> = T & {
  id: string;
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
  [eventId: string]: WithID<Event>;
}

export interface Composer {
  editor: LexicalEditor | null;
  enabled: boolean;
  isTypingTimeoutID?: ReturnType<typeof setTimeout>;
  isTyping: { [endUserId: string]: boolean };
  isMentioning: boolean;
  pendingPin: null | PendingPin;
  hasText: boolean;
}

export type FirebasePin = {
  x: number;
  y: number;
  threadId: string;
  eventId: string;
  createdById: string;
  state: string;
};

export type Pin = {
  id: string;
  objectId: string;
  x: number;
  y: number;
  workspaceId: string;
  threadId: string;
  eventId: string;
  createdById: string;
  state: object;
};

export type PendingPin = Pin & {
  isPending: true;
};

export interface SeenBy {
  [userId: string]: { seenAt: number; seenUntilId: string };
}

export interface Workspace {
  profiles: { [userId: string]: boolean };
  name: string;
  openThreads: { [threadId: string]: { meta: ThreadMeta } };
  pendingThreadInfo: { [threadId: string]: ThreadInfo };
  pendingThreads: { [objectId: string]: string };
  inbox: { [threadId: string]: WithID<Event> };
  timeline: { [threadId: string]: Timeline };
  composers: { [threadId: string]: { [eventId: string]: Composer } };
  seen: { [threadId: string]: string }; // lastSeenEventId
  threadInfo: { [threadId: string]: ThreadInfo };
  threadProfiles: { [threadId: string]: { [userId: string]: boolean } };
  openPins: { [objectId: string]: { [pinId: string]: Pin } };
  eventPins: { [eventId: string]: Pin };
  computed: {
    [threadId: string]: {
      isResolved: boolean;
      hasFetchedAllProfiles: boolean;
      messageEvents: WithShowHeader<WithID<Event>>[];
      unreadCount: number;

      reactions: { [eventId: string]: EventReactions | null };
      replyCount: number;
      // resolves events to their latest edit if available
      canonicalEvents: { [eventId: string]: WithID<Event> | null };
    };
  };
}

type CommentableObject = {
  objectId: string;

  // null indicates a disconnected pin
  element: HTMLElement | SVGElement | null;
};

// get all pins for the workspace that have an open thread attached to them (we don't want resolved ones)
// get all threads for these pins in one query (comment sidebar speed)

export interface UnconfiguredStore {
  appId: null | string;
  sync: null | SyncAdapter;
  isPinningEnabled: boolean;
  isReadOnly: boolean;
  isConnected: boolean;
  isSidebarOpen: boolean;
  isDemo: boolean;
  userId: string | null;
  user: UserProps | null;
  workspaceId: string | null;
  focusedId: null | Target;
  reactingId: null | Target;
  selectedId: null | Target;
  hoveringId: null | Target;
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
  nextThreadId: null | string;
  subs: Subscriptions;
  callbacks?: Callbacks;
  clientX: number;
  clientY: number;
  commentables: { [objectId: string]: CommentableObject };
  expandedThreadIds: string[];
  pinsVisible: boolean;
  dragPinObjectId: string;
  dragPinUpdate: Function[];
}

export interface Store extends UnconfiguredStore {
  sync: SyncAdapter;
  config: Config;
  allPins: (Pin | PendingPin)[];
  reactions: {
    [threadId: string]: {
      [eventId: string]: { [emoji: string]: { count: number; userIds: string[] } };
    };
  };
}

export type Unsubscribe = () => void;
export type Subscriptions = { [subId: string]: Unsubscribe };

export type SidebarButtonType =
  | 'resolveThreadButton'
  | 'sidebarEmojiButton'
  | 'sidebarElementOptionsButton'
  | 'sidebarReplyButton';

export type ChannelActonButtonTarget = {
  type: SidebarButtonType;
  threadId: string;
  workspaceId: string;
};
