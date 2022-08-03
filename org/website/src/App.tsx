import './App.css';

import { User, onAuthStateChanged } from 'firebase/auth';

import { ref, Unsubscribe, onChildAdded, onChildRemoved } from 'firebase/database';

import { Route } from 'wouter';

import { SignedIn } from './SignedIn';
import { SignIn } from './SignIn';

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

store.subs['user'] = onAuthStateChanged(auth, (user) => {
  store.user = user;
  if (user) {
    // console.log('subscribing', user.uid);
    store.subs['adminAppAdded'] = onChildAdded(
      ref(database, `/adminApps/${user.uid}`),
      events.onAdminAppAdded
    );
    store.subs['adminAppRemoved'] = onChildRemoved(
      ref(database, `/adminApps/${user.uid}`),
      events.onAdminAppRemoved
    );
  } else {
    // console.log('unsubscribing');
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
      <Route path="/"></Route>
      <Route path="/signIn">
        <SignIn />
      </Route>
      {/* <Route path="/">{user !== null ? <Dashboard /> : <SignIn />}</Route> */}
      <Route path="/signedIn">
        <SignedIn />
      </Route>
    </>
  );
}

export default App;
