export interface Org {
  name: string;
  admins: {
    [uid: string]: true;
  };
  createdAt: object | number;
}

export interface OrgApps {
  [orgId: string]: {
    [appId: string]: true;
  };
}

export interface App {
  name: string;
  keys: {
    [key: string]: true;
  };
  admins: {
    [uid: string]: true;
  };
  mode: 'UNSECURED' | 'SECURED';
}

export type UserProps = {
  name?: string | null;
  email?: string | null;
  avatar?: string | null;
  color?: string | null;
};

export type WorkspaceProps = {
  name?: string | null;
};
