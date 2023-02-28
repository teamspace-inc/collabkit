import { getApps, initializeApp } from 'firebase/app';
import { loadEnv } from 'vite';
import path from 'path';
import os from 'os';

export const TEST_DB = {
  apiKey: 'AIzaSyBj5LhfGbP_UrXYOTzJK5e70iZuI-itsxc',
  authDomain: 'collabkit-test.firebaseapp.com',
  databaseURL: 'https://collabkit-test-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'collabkit-test',
  storageBucket: 'collabkit-test.appspot.com',
  messagingSenderId: '847051916849',
  appId: '1:847051916849:web:417a95d387d2e3d8f57710',
};

// load env variables
Object.assign(process.env, {
  ...process.env,
  ...loadEnv('development', './../../../env'),
});

import admin from 'firebase-admin';
import { initializeAuth } from 'firebase/auth';

export function setupFirebase() {
  if (getApps().length) return;
  admin.initializeApp({
    databaseURL: TEST_DB.databaseURL,
    // @ts-ignore
    credential: admin.credential.cert(
      process.env.FIREBASE_TEST_SERVICE_ACCOUNT
        ? JSON.parse(process.env.FIREBASE_TEST_SERVICE_ACCOUNT)
        : path.resolve(os.homedir(), 'collabkit-test-service-account.json')
    ),
  });
  const app = initializeApp(TEST_DB, 'CollabKit');
  initializeAuth(app);
  return app;
}
