import { getAuth, setPersistence, indexedDBLocalPersistence } from 'firebase/auth';

import { getDatabase } from 'firebase/database';
import { getFunctions } from 'firebase/functions';
import { initializeApp } from 'firebase/app';

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

const auth = getAuth(app);

const database = getDatabase(app);

getFunctions(app);

setPersistence(auth, indexedDBLocalPersistence);

export { database, app, auth };
