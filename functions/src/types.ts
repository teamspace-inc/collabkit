export interface Org {
  name: string;
  admins: {
    [uid: string]: boolean;
  };
  createdAt: object | number;
}

export interface OrgApps {
  [orgId: string]: {
    [appId: string]: true;
  };
}

export type NotificationPreferences = {
  isMuted: boolean | null | undefined;
};

export type App = {
  name: string;
  admins: {
    [adminId: string]: boolean;
  };
  keys: {
    [keyId: string]: boolean;
  };
  mode: 'SECURED' | 'UNSECURED';
  isEmailDisabled?: boolean;
  logoUrl?: string;
  webhook?: string;
  accentColor?: string;
  emailBatchDelayMs?: number;
  defaultNotificationPreference?: 'allWorkspace' | 'threadOnly' | 'off';
};

export type NotifiedUntilId = string | undefined | null;

export type SeenBy = {
  [userId: string]: SeenByUser;
};

export type SeenByUser = {
  seenUntilId: string;
  seenAt: number;
};

export type Timeline = {
  [eventId: string]: Event;
};

export type TimelineWithEventId = {
  [eventId: string]: Event & { id: string };
};

export type Profile = {
  name?: string;
  avatar?: string;
  email?: string;
  color?: string;
};

export type Workspace = {
  name?: string;
  profiles: WorkspaceProfiles;
};

export type WorkspaceProfiles = {
  [userId: string]: boolean;
};

export type UserProps = {
  name?: string | null;
  email?: string | null;
  avatar?: string | null;
  color?: string | null;
};

export type WorkspaceProps = {
  name?: string | null;
};

export type ThreadInfo = {
  name?: string;
  url?: string;
};

export type EventType = 'message' | 'reaction' | 'adminMessage' | 'system' | 'delete' | 'edit';

// TODO: this should be a union of different message types
export type Event = {
  type: EventType;
  body: string;
  system?: 'resolve' | 'reopen';
  createdAt: number;
  createdById: string;
  parentId?: string;
  mentions?: {
    [userId: string]: boolean;
  };
};
