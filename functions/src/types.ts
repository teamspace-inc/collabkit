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
};

export type NotifiedUntilId = string | undefined | null;

export type SeenBy = {
  [userId: string]: SeenByUser;
};

export type SeenByUser = {
  seenUntilId: string;
  seenAt: number;
};

export type Event = {
  type: 'message' | 'reaction' | 'adminMessage' | 'system';
  body: string;
  createdAt: number;
  createdById: string;
  system?: 'resolve' | 'reopen';
  parentId?: string;
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
