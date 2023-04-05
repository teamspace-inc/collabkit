import type { Color } from '@collabkit/colors';
import type { LexicalEditor } from 'lexical';
import type { SyncAdapter } from './sync';
import type { INTERNAL_Snapshot } from 'valtio';
export * as Sync from './sync';

export interface ThreadMeta {
  [x: string]: unknown;
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

type ThreadCallbackProps = {
  userId: string;
  workspaceId: string;
  threadId: string;
};

type PendingPinCallbackProps = {
  objectId: string;
  userId: string;
  workspaceId: string;
  threadId: string;
};

type PinCallbackProps = {
  objectId: string;
  userId: string;
  workspaceId: string;
  threadId: string;
  meta: string | null;
};

export type Callbacks = {
  onPinClick?: (data: PinCallbackProps) => void;
  onPinHover?: (data: PinCallbackProps) => void;
  onPinUnhover?: (data: PinCallbackProps) => void;
  onPinDeselect?: (data: PinCallbackProps) => void;
  onPinAttach?: (data: PendingPinCallbackProps) => string;
  onThreadCreated?: (
    data: ThreadCallbackProps & {
      event: WithID<Event>;
    }
  ) => void;
  onCommentSend?: (
    data: ThreadCallbackProps & {
      event: WithID<Event>;
    }
  ) => void;
  onTimestampClick?: (
    data: ThreadCallbackProps & {
      event: WithID<Event> | null;
      timestamp: string;
    }
  ) => void;
  onMentionClick?: (
    data: ThreadCallbackProps & {
      event: WithID<Event> | null;
      mention: MentionWithColor;
    }
  ) => void;
  onInboxThreadClick?: (
    data: ThreadCallbackProps & {
      info: ThreadInfo;
    }
  ) => void;
  onThreadResolve?: (
    data: ThreadCallbackProps & {
      info: ThreadInfo;
    }
  ) => void;
  onThreadReopen?: (
    data: ThreadCallbackProps & {
      info: ThreadInfo;
    }
  ) => void;
  onInboxCloseButtonClick?: (data: { userId: string; workspaceId: string }) => void;
  onAuthenticationRequired?: () => void;
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

export type UnsecureConfig = {
  apiKey: string;
  appId: string;
  user?: UserProps | null;
  workspace?: WorkspaceProps | null;
};

export type SecureConfig = {
  appId: string;
  token: string;
};

export type Config = (SecureConfig | UnsecureConfig) & {
  mentionableUsers: MentionableUsers;
  _test?: boolean;
} & Callbacks;

export type Target =
  | ComposerTarget
  | ThreadTarget
  | CommentButtonTarget
  | CommentTarget
  | ThreadResolveButtonTarget
  | ThreadCloseButtonTarget
  | ReopenThreadButtonTarget
  | MenuTarget
  | CommentEditButtonTarget
  | CommentDeleteButtonTarget
  | ShowSidebarButtonTarget
  | HideSidebarButtonTarget
  | ComposerPinButtonTarget
  | ComposerMentionsButtonTarget
  | ChannelActonButtonTarget
  | PinTarget
  | PinDeleteButton
  | CommentSaveButtonTarget
  | CommentCancelButtonTarget
  | OverlayTarget
  | CommentReplyCountButtonTarget
  | CommentReplyButtonTarget
  | EmojiTarget
  | CommentReactionsListAddEmojiButtonTarget
  | CommentActionsEmojiButtonTarget
  | ChannelTarget
  | ChannelToggleShowResolvedTarget
  | ComposerPinTarget
  | PinCommentButtonTarget
  | PinPrevThreadIconButtonTarget
  | PinNextThreadIconButtonTarget
  | PinThreadResolveIconButtonTarget
  | PinThreadCloseIconButtonTarget
  | CommentPinTarget
  | InboxItemTarget
  | PopoverInboxTarget
  | PinThreadPreviewTarget
  | PopoverChannelTarget
  | ToggleSidebarButtonTarget;

export type PinThreadPreviewTarget = {
  type: 'pinThreadPreview';
  threadId: string;
  workspaceId: string;
  objectId: string;
  eventId: string;
  id: string;
};

export type PopoverInboxTarget = {
  type: 'popoverInbox';
};

export type PopoverChannelTarget = {
  type: 'popoverChannel';
};

export type InboxItemTarget = {
  type: 'inboxItem';
  threadId: string;
  workspaceId: string;
};

export type PinPrevThreadIconButtonTarget = {
  type: 'pinPrevThreadIconButton';
  id: string;
  objectId: string;
  workspaceId: string;
  threadId: string;
  eventId: string;
};

export type PinNextThreadIconButtonTarget = {
  type: 'pinNextThreadIconButton';
  id: string;
  objectId: string;
  workspaceId: string;
  threadId: string;
  eventId: string;
};

export type PinThreadResolveIconButtonTarget = {
  type: 'pinThreadResolveIconButton';
  workspaceId: string;
  threadId: string;
};

export type PinThreadCloseIconButtonTarget = {
  type: 'pinThreadCloseIconButton';
};

export type CommentReplyCountButtonTarget = {
  type: 'commentSeeAllRepliesButton';
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

export type PinTarget = {
  type: 'pin';
  objectId: string;
  id: string;
  threadId: string;
  workspaceId: string;
  isPending?: boolean;
  eventId: string;
};

export type CommentPinTarget = {
  type: 'commentPin';
  objectId: string;
  id: string;
  threadId: string;
  isPending?: false;
  workspaceId: string;
  eventId: string;
};

export type OverlayTarget = {
  type: 'overlay';
  objectId: string;
  x: number;
  y: number;
};

export type PinCommentButtonTarget = {
  type: 'pinCommentButton';
  workspaceId: string;
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

export type ComposerPinTarget = {
  type: 'composerPin';
  pinId: string;
  objectId: string;
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
  pinId: string;
  threadId: string;
  workspaceId: string;
  eventId: string;
  objectId: string;
};

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

export type ChannelToggleShowResolvedTarget = {
  type: 'channelToggleShowResolved';
  channelId: string;
};

export type ThreadTarget = { type: 'thread'; threadId: string; workspaceId: string };

export type CommentButtonTarget = { type: 'commentButton'; threadId: string; workspaceId: string };

export type ShowSidebarButtonTarget = { type: 'showSidebarButton'; workspaceId: string };

export type HideSidebarButtonTarget = {
  type: 'hideSidebarButton';
  workspaceId: string;
};

export type ToggleSidebarButtonTarget = {
  type: 'toggleSidebarButton';
};

export type CommentEmojiButtonTargets =
  | CommentReactionsListAddEmojiButtonTarget
  | CommentActionsEmojiButtonTarget;

export type CommentReactionsListAddEmojiButtonTarget = {
  type: 'commentReactionsListAddEmojiButton';
  workspaceId: string;
  threadId: string;
  eventId: string;
  treeId: string;
};

export type CommentActionsEmojiButtonTarget = {
  type: 'commentActionsEmojiButton';
  workspaceId: string;
  threadId: string;
  eventId: string;
  treeId: string;
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
  attachments?: Attachments | null;
};

export type FirebaseEvent = {
  type: EventType;
  body: string;
  system: 'resolve' | 'reopen' | null;
  createdAt: number | object;
  createdById: string;
  parentId: string | null;
  mentions: {
    [userId: string]: boolean;
  } | null;
  attachments: Attachments | null;
};

export type Attachments = {
  [attachmentId: string]: Attachment;
};

export type Attachment = {
  type: 'pin';
  x: number;
  y: number;
  objectId: string;
  meta: string | null;
  pending?: boolean;
};

export type FirebasePin = {
  x: number;
  y: number;
  threadId: string;
  eventId: string;
  createdById: string;
  meta: string | null;
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
  meta: string | null;
};

export type PendingPin = Pin & {
  isPending: true;
};

export type WithShowHeader<T> = T & {
  showHeader?: boolean;
};

export type EventReactions = { [emojiU: string]: { count: number; userIds: string[] } };

export type WithID<T> = T & {
  id: string;
};

export type MentionableUsers = readonly Mention[] | 'allWorkspace';

export interface Mention {
  avatar?: string | null;
  email?: string | null;
  id: string;
  name?: string | null;
}

export interface MentionWithColor extends Mention {
  color: Color;
}

export interface Profile {
  avatar?: string | null;
  color: Color;
  email?: string | null;
  id: string;
  isDeleted?: boolean;
  name?: string | null;
  isBot?: boolean;
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
  attachments: Attachments;
  hasText: boolean;
}

// move pins to a timeline event as an attachment,
// break apart thread info

export interface Workspace {
  profiles: { [userId: string]: boolean };
  name: string;
  pendingThreadInfo: { [threadId: string]: ThreadInfo };
  inbox: { [threadId: string]: WithID<Event> };
  timeline: { [threadId: string]: Timeline };
  composers: { [threadId: string]: { [eventId: string]: Composer } };
  seen: { [threadId: string]: string }; // lastSeenEventId
  threadInfo: { [threadId: string]: ThreadInfo };
  threadProfiles: { [threadId: string]: { [userId: string]: boolean } };
  openPins: { [objectId: string]: { [pinId: string]: Pin } };
  eventPins: { [eventId: string]: Pin };
  isResolved: { [threadId: string]: boolean };
  isOpen: { [threadId: string]: boolean };
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
  sync: null | SyncAdapter;
  isFigmaStyle: boolean;
  isConnected: boolean;
  isSidebarOpen: boolean;
  user: UserProps | null;
  userId: string | null;
  workspaceId: string | null;
  selectedId: null | Target;
  reactingId: null | Target;
  focusedId: null | Target;
  hoveringId: null | Target;
  menuId: null | Target;
  viewingId: null | Target;
  previewingId: null | Target;
  editingId: null | CommentTarget;
  editingEventSnapshots: { [eventId: string]: INTERNAL_Snapshot<Event> | null };
  composerId: null | ComposerTarget;
  config: null | Config;
  avatarErrors: { [avatar: string]: boolean };
  profiles: { [profileId: string]: Profile | undefined };
  workspaces: {
    [workspaceId: string]: Workspace;
  };
  mentionableUsers: { [userId: string]: MentionWithColor };
  uiState: 'idle' | 'selecting';
  nextThreadId: null | string;
  subs: Subscriptions;
  callbacks: Callbacks;
  clientX: number;
  clientY: number;
  commentables: { [objectId: string]: CommentableObject };
  expandedThreadIds: string[];
  resolvedVisible: { [channelId: string]: boolean };
  channelScrollTop: { [channelId: string]: number };
  pinsVisible: boolean;
  dragPinObjectId: string;
  dragPinUpdate: Function[];
  visiblePinPositions: Array<[string, number, number]>;
}

export interface Store extends UnconfiguredStore {
  sync: SyncAdapter;
  config: Config;
  pins: {
    open: (Pin | PendingPin)[];
  };
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
