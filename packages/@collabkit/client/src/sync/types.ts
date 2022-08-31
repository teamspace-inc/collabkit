import type { Color } from '@collabkit/colors';
import type { Event, OptionalWorkspaceProps, Pin, Subscriptions, UserProps } from '@collabkit/core';
import type { DataSnapshot } from 'firebase/database';

export interface SyncAdapter {
  shouldAuthenticate(): boolean;

  serverTimestamp(): object;

  getUser(params: { userId: string; appId: string }): Promise<DataSnapshot>;

  saveThreadInfo(params: {
    appId: string;
    workspaceId: string;
    threadId: string;
    info?: {
      name?: string;
      url?: string;
    };
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
    undefined | null | { name?: string; email?: string; color?: string; avatar?: string }
  >;

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
    preview: string;
    pin?: Pin;
    event: Event;
  }): Promise<{ id: string }>;

  subscribeSeen(
    params: {
      appId: string;
      userId: string;
      workspaceId: string;
      subs: Subscriptions;
    },
    onSeenChange: SeenEventHandler
  ): void;

  subscribePins(
    params: {
      appId: string;
      workspaceId: string;
      subs: Subscriptions;
    },
    onPinChange: PinEventHandler
  ): void;

  subscribeThread(props: {
    appId: string;
    userId?: string;
    workspaceId: string;
    threadId: string;
    subs: Subscriptions;
    onTimelineEventAdded: (event: TimelineChangeEvent) => void;
    onThreadTypingChange: (event: TypingEvent) => void;
    onThreadSeenByUser: (event: ThreadSeenEvent) => void;
  }): void;
}

export type ServerProfile = Partial<UserProps> & { color: Color };
export type SeenEventHandler = (event: { threadId: string; seenUntilId: string }) => void;
export type PinEventHandler = (event: { pinId: string; pin: Pin }) => void;

export type TimelineChangeEvent = {
  threadId: string;
  workspaceId: string;
  eventId: string;
  event: Event;
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
