import './App.css';

import {
  User,
  getAuth,
  sendSignInLinkToEmail,
  onAuthStateChanged,
  setPersistence,
  indexedDBLocalPersistence,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from 'firebase/auth';

import {
  getDatabase,
  ref,
  set,
  remove,
  DataSnapshot,
  Unsubscribe,
  onValue,
  onChildAdded,
  onChildRemoved,
} from 'firebase/database';

import { getFunctions } from 'firebase/functions';

import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { useSnapshot, proxy } from 'valtio';
import { Route } from 'wouter';
import { Dashboard } from './Dashboard';

import { mauveDark, grayDark } from '@radix-ui/colors';

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

export const store = proxy<Store>({
  user: null,
  apps: {},
  subs: {},
  adminApps: {},
});

export const events = {
  onAppChanged: (snapshot: DataSnapshot) => {
    // console.log('onAppChanged');
    if (snapshot.key) {
      const app = { ...snapshot.val(), appId: snapshot.key };
      // console.log('adding app', app);
      store.apps[snapshot.key] = app;
    }
  },

  onDeleteAppButtonClick: (props: { appId: string; e: React.MouseEvent }) => {
    actions.deleteApp(props.appId);
  },

  onAdminAppAdded: (snapshot: DataSnapshot) => {
    // console.log('admin app added', snapshot.key, snapshot.val());
    if (snapshot.key) {
      store.adminApps[snapshot.key] = snapshot.val();
      store.subs[snapshot.key] = onValue(
        ref(database, `/apps/${snapshot.key}`),
        events.onAppChanged
      );
    }
  },

  onAdminAppRemoved: (snapshot: DataSnapshot) => {
    if (snapshot.key) {
      delete store.adminApps[snapshot.key];
      delete store.apps[snapshot.key];
    }
  },

  onCreateAppButtonClick: (e: React.MouseEvent) => {
    actions.createApp();
  },

  onAppNameChange: (props: { appId: string; e: React.ChangeEvent<HTMLInputElement> }) => {
    actions.changeAppName({ appId: props.appId, newName: props.e.target.value });
  },
};

const actions = {
  changeAppName: async (props: { appId: string; newName: string }) => {
    await set(ref(getDatabase(app), `/apps/${props.appId}/name`), props.newName);
  },

  deleteApp: async (appId: string) => {
    await remove(ref(getDatabase(app), `/apps/${appId}`));
  },

  createApp: async () => {
    if (!store.user) {
      return;
    }
    const idToken = await store.user.getIdToken(true);
    const response = await fetch(`/api/createApp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
    });

    if (response.ok) {
      const json = (await response.json()) as FunctionResponse<CreateApp>;
      if (json.status === 200 || json.status === 201) {
        store.apps[json.data.app.appId] = json.data.app;
        store.adminApps[json.data.app.appId] = json.data.adminApp !== null;
      }
      return;
    }

    console.error('Failed to create app', response.status, await response.text());
  },
};

const firebaseConfig = {
  apiKey: 'AIzaSyDYl8MwTEgsIzXO7EHgBlvuN5BLVJqPZ6k',
  authDomain: 'collabkit-dev.firebaseapp.com',
  databaseURL: 'https://collabkit-dev-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'collabkit-dev',
  storageBucket: 'collabkit-dev.appspot.com',
  messagingSenderId: '927079647438',
  appId: '1:927079647438:web:3535f7ba40a758167ee89f',
};

const app = initializeApp(firebaseConfig, 'CollabKitWebsite');

export const auth = getAuth(app);

const database = getDatabase(app);

getFunctions(app);

setPersistence(auth, indexedDBLocalPersistence);

async function verifyEmailLink() {
  // Confirm the link is a sign-in with email link.
  if (isSignInWithEmailLink(auth, window.location.href)) {
    // Additional state parameters can also be passed via URL.
    // This can be used to continue the user's intended action before triggering
    // the sign-in operation.
    // Get the email if available. This should be available if the user completes
    // the flow on the same device where they started it.
    let email = window.localStorage.getItem('emailForSignIn');
    if (!email) {
      // User opened the link on a different device. To prevent session fixation
      // attacks, ask the user to provide the associated email again. For example:
      email = window.prompt('Please provide your email for confirmation');
    }
    // The client SDK will parse the code from the link for you.
    await signInWithEmailLink(auth, email!, window.location.href)
      .then((result) => {
        // Clear email from storage.
        window.localStorage.removeItem('emailForSignIn');
        // You can access the new user via result.user
        // Additional user info profile not available via:
        // result.additionalUserInfo.profile == null
        // You can check if the user is new or existing:
        // result.additionalUserInfo.isNewUser
      })
      .catch((error) => {
        console.error(error);
        // Some error occurred, you can inspect the code: error.code
        // Common errors could be invalid email and invalid or expired OTPs.
      });
  }
}

async function sendVerificationEmail(email: string) {
  const actionCodeSettings = {
    url: window.location.origin + '/signedIn',
    handleCodeInApp: true,
  };

  try {
    await sendSignInLinkToEmail(auth, email, actionCodeSettings);
    window.localStorage.setItem('emailForSignIn', email);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

function SignIn() {
  const [email, setEmail] = useState(window.localStorage.getItem('emailForSignIn') || '');
  const [didSendEmail, setDidSendEmail] = useState(false);

  return (
    <div>
      <h1>Sign in to Collabkit</h1>
      <input
        type="email"
        onChange={(e) => {
          setEmail(e.target.value);
          setDidSendEmail(false);
        }}
        value={email}
      />
      <button onClick={async () => setDidSendEmail(await sendVerificationEmail(email))}>
        Submit
      </button>
      {didSendEmail && 'Check your email'}
    </div>
  );
}

function SignedIn() {
  useEffect(() => {
    verifyEmailLink();
  }, []);

  const { user } = useSnapshot(store);

  console.log({ user });

  return (
    <div>
      <h1>Signed in {user?.email}</h1>
    </div>
  );
}

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

function App() {
  const { user } = useSnapshot(store);
  return (
    <div>
      <Route path="/preview">
        <h1>Preview</h1>
      </Route>
      <Route path="/">{user !== null ? <Dashboard /> : <SignIn />}</Route>
      <Route path="/signedIn">
        <SignedIn />
      </Route>
    </div>
  );
}

export default App;
