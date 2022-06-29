import './App.css';

import { User, onAuthStateChanged } from 'firebase/auth';

import { ref, Unsubscribe, onChildAdded, onChildRemoved } from 'firebase/database';

import { Route } from 'wouter';

import { CollabKit } from '@collabkit/react';
import { Fullscreen } from './Fullscreen';
import { SignedIn } from './SignedIn';
import { SignIn } from './SignIn';

import { useSnapshot } from 'valtio';

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
  apps: { [appId: string]: App };
  subs: { [key: string]: Unsubscribe };
  adminApps: { [appId: string]: boolean };
}

export type CreateApp = {
  app: App;
  adminApp: AdminApp;
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

import { database, auth } from './database';
import { store } from './store';
import { events } from './events';
import { Home } from './Home';
import { PopoutWrapper } from './Popout';
import { theme } from './UIKit';

store.subs['user'] = onAuthStateChanged(auth, (user) => {
  store.user = user;
  if (user) {
    console.log('subscribing', user.uid);
    store.subs['adminAppAdded'] = onChildAdded(
      ref(database, `/adminApps/${user.uid}`),
      events.onAdminAppAdded
    );
    store.subs['adminAppRemoved'] = onChildRemoved(
      ref(database, `/adminApps/${user.uid}`),
      events.onAdminAppRemoved
    );
  } else {
    console.log('unsubscribing');
    store.subs['adminAppAdded']?.();
    store.subs['adminAppRemoved']?.();
  }
});

const mentions = [
  {
    name: 'Tom',
    email: 'tom@useteamspace.com',
    avatar: 'tom.pic.jpg',
    workspaceId: 'acme',
    userId: 'user1',
  },
  {
    name: 'Mike',
    email: 'mike@useteamspace.com',
    avatar: 'mike.pic.jpg',
    workspaceId: 'acme',
    userId: 'user2',
  },
  {
    name: 'Jessica',
    email: 'jessica@useteamspace.com',
    avatar: 'jess.pic.jpg',
    workspaceId: 'acme',
    userId: 'user3',
  },
];

const identity = {
  workspaceId: 'acme',
  userId: 'user1',
  workspaceName: 'ACME',
  name: 'Namit',
  email: 'namit@useteamspace.com',
  avatar: 'namit.pic.jpg',
};

const identity2 = {
  workspaceName: 'ACME',
  name: 'Jessica',
  email: 'jessica@useteamspace.com',
  avatar: 'jess.pic.jpg',
  workspaceId: 'acme',
  userId: 'user3',
};

function App() {
  // const { user } = useSnapshot(store);
  // const HOC = CollabKit.withComments(Foo, { threadId: 'foo' });

  return (
    <>
      <Route path="/preview">
        <h1>Preview</h1>
      </Route>
      <Route path="/">
        <Home></Home>
      </Route>
      <Route path="/signIn">
        <SignIn />
      </Route>
      {/* <Route path="/">{user !== null ? <Dashboard /> : <SignIn />}</Route> */}
      <Route path="/signedIn">
        <SignedIn />
      </Route>
      <Route path="/dev/:workspace_id/:thread_id/fullscreen">
        {(params) => {
          const { apps } = useSnapshot(store);

          if (apps == null) {
            console.warn('AppLoader: apps is null');
            return null;
          }

          const app = apps[Object.keys(apps)?.[0]];

          if (app == null) {
            console.warn('AppLoader: app is null');
            return null;
          }

          return (
            <CollabKit.App
              token={Object.keys(app.keys)[0]}
              appId={app.appId}
              identity={identity}
              mentions={mentions}
            >
              <CollabKit.Workspace workspaceId={params.workspace_id}>
                <Fullscreen>
                  <CollabKit.Thread threadId={params.thread_id} />
                </Fullscreen>
              </CollabKit.Workspace>
            </CollabKit.App>
          );
        }}
      </Route>
      <Route path="/dev/:workspace_id/:thread_id">
        {(params) => {
          const { apps } = useSnapshot(store);

          if (apps == null) {
            console.warn('AppLoader: apps is null');
            return null;
          }

          const app = apps[Object.keys(apps)?.[0]];

          if (app == null) {
            console.warn('AppLoader: app is null');
            return null;
          }

          return (
            <div style={{ display: 'flex', flexDirection: 'row', flex: 1, gap: 0 }}>
              <div
                style={{
                  width: '50vw',
                  padding: '2rem',
                  margin: '1rem 1rem 0',
                  borderRadius: '24px',
                  background: theme.colors.neutral12.toString(),
                }}
              >
                <h3 style={{ color: 'rgba(0,0,0,0.25)', marginTop: 0 }}>{identity.name}</h3>
                <CollabKit.App
                  token={Object.keys(app.keys)[0]}
                  appId={app.appId}
                  identity={identity}
                  mentions={mentions}
                >
                  <CollabKit.Workspace workspaceId={params.workspace_id}>
                    <PopoutWrapper>
                      <CollabKit.Button threadId={params.thread_id} defaultOpen={true} />
                    </PopoutWrapper>
                  </CollabKit.Workspace>
                </CollabKit.App>
              </div>
              <div
                style={{
                  width: '50vw',
                  padding: '2rem',
                  margin: '1rem 1rem 0',
                  borderRadius: '24px',
                  background: theme.colors.neutral12.toString(),
                }}
              >
                <h3 style={{ color: 'rgba(0,0,0,0.25)', marginTop: 0 }}>{identity2.name}</h3>
                <CollabKit.App
                  token={Object.keys(app.keys)[0]}
                  appId={app.appId}
                  identity={identity2}
                  mentions={mentions}
                >
                  <CollabKit.Workspace workspaceId={params.workspace_id}>
                    <PopoutWrapper>
                      <CollabKit.Button threadId={params.thread_id} defaultOpen={true} />
                    </PopoutWrapper>
                  </CollabKit.Workspace>
                </CollabKit.App>
              </div>
            </div>
          );
        }}
      </Route>
    </>
  );
}

export default App;
