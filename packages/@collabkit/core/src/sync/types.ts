import type { Color } from '@collabkit/colors';
import type {
  Event,
  OptionalWorkspaceProps,
  Subscriptions,
  UserProps,
  ThreadInfo,
  ThreadMeta,
  WithID,
  Pin,
} from '../types';

export interface SyncAdapter {
  shouldAuthenticate(): boolean;

  serverTimestamp(): object;

  getUser(params: { userId: string; appId: string }): Promise<UserProps | null>;

  getOpenThreads({
    appId,
    workspaceId,
  }: {
    appId: string;
    workspaceId: string;
  }): Promise<{ threadId: string; info: ThreadInfo }[]>;

  getIsTyping(props: {
    appId: string;
    userId: string;
    workspaceId: string;
    threadId: string;
  }): Promise<null | { [userId: string]: boolean }>;

  saveThreadInfo(params: {
    appId: string;
    workspaceId: string;
    threadId: string;
    isOpen: boolean;
    info?: ThreadInfo;
  }): Promise<void>;

  saveWorkspace(params: {
    appId: string;
    workspaceId: string;
    workspace?: OptionalWorkspaceProps | null;
  }): Promise<void>;

  getProfile(params: {
    appId: string;
    userId: string;
  }): Promise<
    | undefined
    | null
    | { id: string; name?: string; email?: string; color?: string; avatar?: string }
  >;

  nextPinId(params: { appId: string; workspaceId: string; objectId: string }): string;

  nextEventId(params: { appId: string; workspaceId: string; threadId: string }): string;

  nextThreadId(params: { appId: string; workspaceId: string }): string;

  savePin(params: {
    appId: string;
    workspaceId: string;
    userId: string;
    pinId: string;
    pin: Pin;
  }): Promise<string>;

  deletePin(params: {
    appId: string;
    workspaceId: string;
    objectId: string;
    pinId: string;
  }): Promise<void>;

  subscribeOpenPins(params: {
    appId: string;
    workspaceId: string;
    subs: Subscriptions;
    onGet: (pins: { [objectId: string]: { [pinId: string]: { x: number; y: number } } }) => void;
    onObjectChange: (objectId: string, pins: { [pinId: string]: { x: number; y: number } }) => void;
    onObjectRemove: (objectId: string) => void;
  }): Promise<void>;

  movePin(params: {
    appId: string;
    workspaceId: string;
    pinId: string;
    x: number;
    y: number;
  }): Promise<void>;

  saveProfile(params: {
    appId: string;
    userId: string;
    workspaceId: string;
    profile: ServerProfile;
  }): Promise<void>;

  saveEvent(params: {
    appId: string;
    workspaceId: string;
    threadId: string;
    event: Event;
  }): Promise<{ id: string }>;

  markResolved(params: { appId: string; workspaceId: string; threadId: string }): Promise<void>;

  markSeen(params: {
    appId: string;
    userId: string;
    workspaceId: string;
    threadId: string;
    eventId: string;
  }): Promise<void>;

  startTyping(params: {
    appId: string;
    userId: string;
    workspaceId: string;
    threadId: string;
  }): Promise<void>;

  stopTyping(params: {
    appId: string;
    userId: string;
    workspaceId: string;
    threadId: string;
  }): Promise<void>;

  sendMessage(params: {
    appId: string;
    userId: string;
    workspaceId: string;
    threadId: string;
    body: string;
    event: Event;
    eventId: string;
  }): Promise<{ id: string }>;

  subscribeSeen(params: {
    appId: string;
    userId: string;
    workspaceId: string;
    subs: Subscriptions;
    onSeenChange: SeenEventHandler;
  }): void;

  subscribeOpenThreads(params: {
    appId: string;
    workspaceId: string;
    subs: Subscriptions;
    onThreadChange: OpenThreadEventHandler;
  }): void;

  subscribeInbox(props: {
    appId: string;
    workspaceId: string;
    subs: Subscriptions;
    onInboxChange: InboxChangeEventHandler;
  }): void;

  subscribeThread(props: {
    appId: string;
    userId?: string;
    workspaceId: string;
    threadId: string;
    subs: Subscriptions;
    onTimelineEventAdded: (event: TimelineChangeEvent) => void;
    onThreadTypingChange: (event: TypingEvent) => void;
    onThreadInfo: (props: ThreadInfoChangeEvent) => void;
    onThreadProfile: (props: ThreadProfileEvent) => void;
    onTimelineGetComplete: (props: TimelineChangeEvent[]) => void;
    onThreadProfiles: (props: ThreadProfilesEvent) => void;
  }): void;

  subscribeThreadInfo(props: {
    appId: string;
    workspaceId: string;
    threadId: string;
    subs: Subscriptions;
    onThreadInfo: (props: ThreadInfoChangeEvent) => void;
  }): void;
}

export type ServerProfile = Partial<UserProps> & { color?: Color };
export type SeenEventHandler = (event: { threadId: string; seenUntilId: string }) => void;
export type OpenThreadEventHandler = (event: {
  threadId: string;
  info: { meta: ThreadMeta } | null;
  wasRemoved?: boolean;
}) => void;

export type InboxChangeEventHandler = (props: { event: WithID<Event>; threadId: string }) => void;

export type ThreadInfoChangeEvent = {
  threadId: string;
  info: { meta: ThreadMeta } | null;
  workspaceId: string;
};

export type ThreadProfileEvent = {
  threadId: string;
  workspaceId: string;
  userId: string;
};

export type ThreadProfilesEvent = {
  threadId: string;
  workspaceId: string;
  profiles: {
    [userId: string]: true;
  };
};

export type InboxChangeEvent = {
  event: WithID<Event>;
};

export type TimelineChangeEvent = {
  threadId: string;
  workspaceId: string;
  eventId: string;
  event: WithID<Event>;
};

export type TypingEvent = {
  threadId: string;
  workspaceId: string;
  userId: string;
  isTyping: boolean;
};

export type ThreadSeenEvent = {
  workspaceId: string;
  threadId: string;
  userId: string;
  data: { seenUntilId: string; seenAt: number };
};
