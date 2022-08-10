import { User } from 'firebase/auth';
import { Unsubscribe } from 'firebase/database';

export interface App {
  appId: string;
  keys: { [apiKey: string]: boolean };
  admins: { [adminId: string]: boolean };
  mode: 'UNSECURED' | 'SECURED';
  name: string;
}

export interface AdminApp {
  [appId: string]: true;
}

export interface Store {
  user: User | null;
  org: Org | null;
  apps: { [appId: string]: App };
  subs: { [key: string]: Unsubscribe };
  forms: {
    createOrg?: {
      name: string;
    };
    enterEmail?: {
      email: string;
    };
  };
  authState: 'blank' | 'signedOut' | 'signedIn' | 'magicLinkSent' | 'confirmEmailPrompt';
}

export interface Org {
  name: string;
  admins: {
    [uid: string]: true;
  };
  createdAt: object | number;
}

export type CreateApp = {
  app: App;
  adminApp: AdminApp;
};

export type CreateOrg = {
  app: App & { id: string };
  org: Org & { id: string };
  orgApps: { [orgId: string]: { [appId: string]: true } };
};

export type FunctionResponse<T> =
  | {
      status: 200;
      data: T;
    }
  | {
      status: 201;
      data: T;
    }
  | {
      status: 400;
      error: string;
    }
  | {
      status: 401;
      error: string;
    }
  | {
      status: 500;
      error: string;
    };
