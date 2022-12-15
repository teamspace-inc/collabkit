import { getApps, initializeApp } from 'firebase/app';
import { loadEnv } from 'vite';
import { resolve } from 'path';

export const TEST_DB = {
  apiKey: 'AIzaSyBj5LhfGbP_UrXYOTzJK5e70iZuI-itsxc',
  authDomain: 'collabkit-test.firebaseapp.com',
  databaseURL: 'https://collabkit-test-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'collabkit-test',
  storageBucket: 'collabkit-test.appspot.com',
  messagingSenderId: '847051916849',
  appId: '1:847051916849:web:417a95d387d2e3d8f57710',
};

export function setupFirebase() {
  if (getApps().length) return;
  const app = initializeApp(TEST_DB, 'CollabKit');
  initializeAuth(app);
}

// load env variables
Object.assign(process.env, {
  ...process.env,
  ...loadEnv('development', resolve(__dirname + '/../../../../env')),
});

import admin from 'firebase-admin';
import { initializeAuth } from 'firebase/auth';
admin.initializeApp({
  databaseURL: TEST_DB.databaseURL,
  // @ts-ignore
  credential: admin.credential.cert(JSON.parse(process.env.VITE_FIREBASE_TEST_SERVICE_ACCOUNT)),
});
