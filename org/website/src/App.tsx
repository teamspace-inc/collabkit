import './App.css';

import { User, onAuthStateChanged } from 'firebase/auth';

import { ref, Unsubscribe, onChildAdded, onChildRemoved } from 'firebase/database';

import { Route } from 'wouter';
import { Dashboard } from './Dashboard';

import { CollabKit } from '@collabkit/react';
import { Fullscreen } from './Fullscreen';
import { SignedIn } from './SignedIn';
import { SignIn } from './SignIn';
import { AppLoader } from './AppLoader';

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
import { Popout } from './Popout';

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

function Foo() {
  return <div>Foo</div>;
}

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
        {(params) => (
          <AppLoader>
            <CollabKit.Workspace workspaceId={params.workspace_id}>
              <Fullscreen>
                <CollabKit.Thread threadId={params.thread_id} />
              </Fullscreen>
            </CollabKit.Workspace>
          </AppLoader>
        )}
      </Route>
      <Route path="/dev/:workspace_id/:thread_id">
        {(params) => (
          <AppLoader>
            <CollabKit.Workspace workspaceId={params.workspace_id}>
              {/* <HOC /> */}
              <Popout>
                <CollabKit.Button threadId={params.thread_id} defaultOpen={true} />
              </Popout>
            </CollabKit.Workspace>
          </AppLoader>
        )}
      </Route>
    </>
  );
}

export default App;
