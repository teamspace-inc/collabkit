import './App.css';

import { User, onAuthStateChanged } from 'firebase/auth';

import { ref, Unsubscribe, onChildAdded, onChildRemoved } from 'firebase/database';

import { Route } from 'wouter';

import * as CollabKit from '@collabkit/react';
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
  userId: 'user1',
  name: 'Namit',
  email: 'namit@useteamspace.com',
  avatar: 'namit.pic.jpg',
};

const identity2 = {
  name: 'Jessica',
  email: 'jessica@useteamspace.com',
  avatar: 'https://faces-img.xcdn.link/image-lorem-face-1309.jpg',
  userId: 'user3',
};

function App() {
  return (
    <>
      <Route path="/preview">
        <h1>Preview</h1>
      </Route>
      <Route path="/indicator">
        <div style={{ padding: 20 }}>
          <CollabKit.Provider
            apiKey={import.meta.env.VITE_COLLABKIT_TOKEN}
            appId={import.meta.env.VITE_COLLABKIT_APP_ID}
            workspace={{ id: 'acme', name: 'ACME' }}
            user={{
              userId: 'alice-1',
              name: 'Alice Levine',
              email: 'alice@example.com',
              avatar: 'https://www.uifiller.com/images/portraits/anon-4.jpg',
            }}
            mentionableUsers={[]}
          >
            <CollabKit.Pin pinId="foobarn" />
          </CollabKit.Provider>
        </div>
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
            <CollabKit.Provider
              apiKey={Object.keys(app.keys)[0]}
              appId={app.appId}
              workspace={{
                id: params.workspace_id,
              }}
              user={identity}
              mentionableUsers={mentions}
            >
              <Fullscreen>
                <CollabKit.Thread threadId={params.thread_id} />
              </Fullscreen>
            </CollabKit.Provider>
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
            <div
              style={{
                display: 'grid',
                height: '100%',
                gridTemplateColumns: '1fr 1fr',
                gridTemplateRows: '1fr',
                gridGap: '1rem',
                padding: '1rem',
              }}
            >
              <div
                style={{
                  // width: '50vw',
                  // display: 'flex',
                  // flexDirection: 'column',
                  // height: '100%',
                  padding: '2rem',
                  borderRadius: '24px',
                  background: theme.colors.websiteNeutral12.toString(),
                }}
              >
                <h3 style={{ color: 'rgba(0,0,0,0.25)', marginTop: 0 }}>CollabKit.Button</h3>
                <p style={{ color: 'rgba(0,0,0,0.4)' }}>
                  A button you can add to lists of Sales, Customers, etc. to let users comment on a
                  particular thing in a list of things.
                </p>
                <div>
                  <CollabKit.Provider
                    apiKey={Object.keys(app.keys)[0]}
                    appId={app.appId}
                    workspace={{ id: params.workspace_id }}
                    user={identity}
                    mentionableUsers={mentions}
                  >
                    <CollabKit.Button threadId={params.thread_id} defaultOpen={true} />
                  </CollabKit.Provider>
                </div>
              </div>
              <div
                style={{
                  padding: '2rem',
                  borderRadius: '24px',
                  background: theme.colors.websiteNeutral12.toString(),
                }}
              >
                <h3 style={{ color: 'rgba(0,0,0,0.25)', marginTop: 0 }}>CollabKit.Thread</h3>
                <p style={{ color: 'rgba(0,0,0,0.4)' }}>
                  An inline thread you can embed on Product, Sales, Customer and other types of
                  detail pages.
                </p>
                <CollabKit.Provider
                  apiKey={Object.keys(app.keys)[0]}
                  appId={app.appId}
                  workspace={{ id: params.workspace_id }}
                  user={identity}
                  mentionableUsers={mentions}
                >
                  <CollabKit.Thread threadId={params.thread_id} style={{ height: '440px' }} />
                </CollabKit.Provider>
              </div>
              <div
                style={{
                  padding: '2rem',
                  borderRadius: '24px',
                  background: theme.colors.websiteNeutral12.toString(),
                }}
              >
                <h3 style={{ color: 'rgba(0,0,0,0.25)', marginTop: 0 }}>CollabKit.Inbox</h3>
                <p style={{ color: 'rgba(0,0,0,0.4)' }}>
                  A list of all the threads for a workspace. Unread threads in bold.
                </p>
                <CollabKit.Provider
                  apiKey={Object.keys(app.keys)[0]}
                  appId={app.appId}
                  workspace={{ id: params.workspace_id }}
                  user={identity2}
                  mentionableUsers={mentions}
                >
                  <CollabKit.Inbox />
                </CollabKit.Provider>
              </div>
              <div
                style={{
                  padding: '2rem',
                  borderRadius: '24px',
                  background: theme.colors.websiteNeutral12.toString(),
                }}
              >
                <h3 style={{ color: 'rgba(0,0,0,0.25)', marginTop: 0 }}>CollabKit.CurrentUser</h3>
                <p style={{ color: 'rgba(0,0,0,0.4)' }}>The current user.</p>
                <CollabKit.Provider
                  apiKey={Object.keys(app.keys)[0]}
                  appId={app.appId}
                  workspace={{ id: params.workspace_id }}
                  user={identity}
                  mentionableUsers={mentions}
                >
                  <CollabKit.CurrentUser />
                </CollabKit.Provider>
              </div>
              <div
                style={{
                  padding: '2rem',
                  borderRadius: '24px',
                  background: theme.colors.websiteNeutral12.toString(),
                }}
              >
                <h3 style={{ color: 'rgba(0,0,0,0.25)', marginTop: 0 }}>
                  CollabKit.FloatingButton
                </h3>
                <p style={{ color: 'rgba(0,0,0,0.4)' }}>
                  Floating button to start commenting on something in an app. Has a fixed position.
                </p>
                <CollabKit.Provider
                  apiKey={Object.keys(app.keys)[0]}
                  appId={app.appId}
                  workspace={{ id: params.workspace_id }}
                  user={identity}
                  mentionableUsers={mentions}
                >
                  <CollabKit.Commentable>
                    <div
                      style={{
                        padding: 20,
                        background: 'rgba(255,255,255,0.5)',
                        textAlign: 'center',
                      }}
                    >
                      Comment on this
                    </div>
                    <br />
                    <img
                      style={{ maxWidth: 200 }}
                      src="https://images.unsplash.com/photo-1546240181-a6430032edb7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YXJjaGlsbGVjdHxlbnwwfHwwfHw%3D&w=1000&q=80"
                    />
                  </CollabKit.Commentable>
                  <CollabKit.FloatingButton />
                </CollabKit.Provider>
              </div>
              <div
                style={{
                  padding: '2rem',
                  borderRadius: '24px',
                  background: theme.colors.websiteNeutral12.toString(),
                }}
              >
                <h3 style={{ color: 'rgba(0,0,0,0.25)', marginTop: 0 }}>CollabKit.Indicator</h3>
                <p style={{ color: 'rgba(0,0,0,0.4)' }}>
                  An indicator that shows a comment is present <br />
                  at that location.
                </p>
                <CollabKit.Provider
                  apiKey={Object.keys(app.keys)[0]}
                  appId={app.appId}
                  workspace={{ id: params.workspace_id }}
                  user={identity}
                  mentionableUsers={mentions}
                >
                  <div style={{ display: 'flex', flexDirection: 'row', gap: '12px' }}>
                    {/* <CollabKit.Indicator letter="N"></CollabKit.Indicator> */}
                    {/* <CollabKit.Indicator letter="B"></CollabKit.Indicator> */}
                    {/* <CollabKit.Indicator letter="C"></CollabKit.Indicator> */}
                  </div>
                </CollabKit.Provider>
              </div>
            </div>
          );
        }}
      </Route>
    </>
  );
}

export default App;
